import type { TurboModule, CodegenTypes } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

/**
 * One event from the recognizer.
 * type: 'partial' | 'final' | 'end' | 'error' | 'volume'
 */
export type SpeechEvent = {
  type: string;
  text: string;
  error: string;
  level: number;
};

/**
 * App-local speech-to-text module on top of the OS recognizers
 * (SFSpeechRecognizer on iOS, android.speech.SpeechRecognizer on Android).
 */
export interface Spec extends TurboModule {
  /** Asks for microphone + speech permission. Resolves true when granted. */
  requestPermission(): Promise<boolean>;
  /** True when the device has a recognizer for this locale. */
  isAvailable(locale: string): Promise<boolean>;
  start(locale: string): void;
  /** Stop listening and deliver the final result. */
  stop(): void;
  /** Stop listening and drop the result. */
  cancel(): void;
  readonly onSpeechEvent: CodegenTypes.EventEmitter<SpeechEvent>;
}

export default TurboModuleRegistry.get<Spec>('NativeSpeech');
