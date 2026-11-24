#import "RCTNativeSpeech.h"

#import <AVFoundation/AVFoundation.h>
#import <Speech/Speech.h>

@implementation RCTNativeSpeech {
  SFSpeechRecognizer *_recognizer;
  SFSpeechAudioBufferRecognitionRequest *_request;
  SFSpeechRecognitionTask *_task;
  AVAudioEngine *_engine;
  NSString *_lastText;
  BOOL _cancelled;
  BOOL _finished;
}

+ (NSString *)moduleName
{
  return @"NativeSpeech";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeSpeechSpecJSI>(params);
}

#pragma mark - Events

- (void)sendType:(NSString *)type text:(NSString *)text error:(NSString *)error level:(double)level
{
  NSDictionary *event = @{
    @"type" : type,
    @"text" : text ?: @"",
    @"error" : error ?: @"",
    @"level" : @(level),
  };
  dispatch_async(dispatch_get_main_queue(), ^{
    [self emitOnSpeechEvent:event];
  });
}

#pragma mark - API

- (void)requestPermission:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject
{
  [SFSpeechRecognizer requestAuthorization:^(SFSpeechRecognizerAuthorizationStatus status) {
    if (status != SFSpeechRecognizerAuthorizationStatusAuthorized) {
      resolve(@NO);
      return;
    }
    [[AVAudioSession sharedInstance] requestRecordPermission:^(BOOL granted) {
      resolve(@(granted));
    }];
  }];
}

- (void)isAvailable:(NSString *)locale
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject
{
  SFSpeechRecognizer *recognizer =
      [[SFSpeechRecognizer alloc] initWithLocale:[NSLocale localeWithLocaleIdentifier:locale]];
  resolve(@(recognizer != nil && recognizer.isAvailable));
}

- (void)start:(NSString *)locale
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [self teardown];
    self->_cancelled = NO;
    self->_finished = NO;
    self->_lastText = @"";

    self->_recognizer =
        [[SFSpeechRecognizer alloc] initWithLocale:[NSLocale localeWithLocaleIdentifier:locale]];
    if (self->_recognizer == nil || !self->_recognizer.isAvailable) {
      [self sendType:@"error" text:@"" error:@"Speech recognition isn't available right now." level:0];
      return;
    }

    NSError *error = nil;
    AVAudioSession *session = [AVAudioSession sharedInstance];
    [session setCategory:AVAudioSessionCategoryPlayAndRecord
                    mode:AVAudioSessionModeMeasurement
                 options:AVAudioSessionCategoryOptionDuckOthers | AVAudioSessionCategoryOptionDefaultToSpeaker
                   error:&error];
    if (!error) {
      [session setActive:YES withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation error:&error];
    }
    if (error) {
      [self sendType:@"error" text:@"" error:error.localizedDescription level:0];
      return;
    }

    self->_request = [SFSpeechAudioBufferRecognitionRequest new];
    self->_request.shouldReportPartialResults = YES;
    self->_request.addsPunctuation = NO;
    // Hint the recognizer towards numbers and money words.
    self->_request.contextualStrings = @[ @"rupees", @"cash", @"bank", @"credit", @"expense", @"business" ];

    self->_engine = [AVAudioEngine new];
    AVAudioInputNode *input = self->_engine.inputNode;
    AVAudioFormat *format = [input outputFormatForBus:0];
    if (format.sampleRate == 0 || format.channelCount == 0) {
      [self sendType:@"error" text:@"" error:@"No microphone is available." level:0];
      [self teardown];
      return;
    }

    __weak RCTNativeSpeech *weakSelf = self;
    SFSpeechAudioBufferRecognitionRequest *request = self->_request;
    [input installTapOnBus:0
                bufferSize:1024
                    format:format
                     block:^(AVAudioPCMBuffer *buffer, AVAudioTime *when) {
                       [request appendAudioPCMBuffer:buffer];
                       [weakSelf reportLevel:buffer];
                     }];

    self->_task = [self->_recognizer
        recognitionTaskWithRequest:self->_request
                     resultHandler:^(SFSpeechRecognitionResult *result, NSError *taskError) {
                       RCTNativeSpeech *strongSelf = weakSelf;
                       if (strongSelf == nil || strongSelf->_cancelled || strongSelf->_finished) {
                         return;
                       }
                       if (result != nil) {
                         strongSelf->_lastText = result.bestTranscription.formattedString;
                         if (result.isFinal) {
                           [strongSelf finishWithText:strongSelf->_lastText];
                           return;
                         }
                         [strongSelf sendType:@"partial" text:strongSelf->_lastText error:nil level:0];
                       }
                       if (taskError != nil) {
                         // "No speech detected" etc. If we already heard something, use it.
                         if (strongSelf->_lastText.length > 0) {
                           [strongSelf finishWithText:strongSelf->_lastText];
                         } else {
                           [strongSelf sendType:@"error" text:@"" error:@"I didn't catch that." level:0];
                           [strongSelf finishSilently];
                         }
                       }
                     }];

    [self->_engine prepare];
    if (![self->_engine startAndReturnError:&error]) {
      [self sendType:@"error" text:@"" error:error.localizedDescription level:0];
      [self teardown];
    }
  });
}

- (void)reportLevel:(AVAudioPCMBuffer *)buffer
{
  float *samples = buffer.floatChannelData ? buffer.floatChannelData[0] : NULL;
  if (samples == NULL || buffer.frameLength == 0) {
    return;
  }
  float sum = 0;
  for (AVAudioFrameCount i = 0; i < buffer.frameLength; i += 4) {
    sum += samples[i] * samples[i];
  }
  float rms = sqrtf(sum / (buffer.frameLength / 4.0f));
  // Map roughly -50 dB..0 dB to 0..1.
  float db = 20 * log10f(MAX(rms, 0.000001f));
  double level = MIN(1.0, MAX(0.0, (db + 50) / 50.0));
  [self sendType:@"volume" text:@"" error:nil level:level];
}

- (void)finishWithText:(NSString *)text
{
  _finished = YES;
  [self sendType:@"final" text:text error:nil level:0];
  [self sendType:@"end" text:@"" error:nil level:0];
  dispatch_async(dispatch_get_main_queue(), ^{
    [self teardown];
  });
}

- (void)finishSilently
{
  _finished = YES;
  [self sendType:@"end" text:@"" error:nil level:0];
  dispatch_async(dispatch_get_main_queue(), ^{
    [self teardown];
  });
}

- (void)stop
{
  dispatch_async(dispatch_get_main_queue(), ^{
    if (self->_engine == nil) {
      return;
    }
    [self->_engine stop];
    [self->_engine.inputNode removeTapOnBus:0];
    [self->_request endAudio];
    // The task now delivers a final result, which calls finishWithText:.
    // Fall back to the last partial if it doesn't within 1.5 s.
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      if (!self->_finished && !self->_cancelled && self->_task != nil) {
        if (self->_lastText.length > 0) {
          [self finishWithText:self->_lastText];
        } else {
          [self finishSilently];
        }
      }
    });
  });
}

- (void)cancel
{
  dispatch_async(dispatch_get_main_queue(), ^{
    self->_cancelled = YES;
    [self teardown];
  });
}

- (void)teardown
{
  if (_engine != nil) {
    [_engine stop];
    [_engine.inputNode removeTapOnBus:0];
    _engine = nil;
  }
  [_request endAudio];
  _request = nil;
  [_task cancel];
  _task = nil;
  _recognizer = nil;
  [[AVAudioSession sharedInstance] setActive:NO
                                 withOptions:AVAudioSessionSetActiveOptionNotifyOthersOnDeactivation
                                       error:nil];
}

- (void)invalidate
{
  _cancelled = YES;
  [self teardown];
}

@end
