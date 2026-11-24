package com.shopmate.speech

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.shopmate.specs.NativeSpeechSpec

/**
 * Speech-to-text TurboModule ('NativeSpeech') on top of
 * android.speech.SpeechRecognizer. The microphone permission itself is
 * requested from JS with PermissionsAndroid.
 */
class NativeSpeechModule(reactContext: ReactApplicationContext) :
    NativeSpeechSpec(reactContext) {

  private val main = Handler(Looper.getMainLooper())
  private var recognizer: SpeechRecognizer? = null
  private var lastText = ""
  private var finished = false

  override fun getName() = NAME

  private fun send(type: String, text: String = "", error: String = "", level: Double = 0.0) {
    val event = Arguments.createMap().apply {
      putString("type", type)
      putString("text", text)
      putString("error", error)
      putDouble("level", level)
    }
    emitOnSpeechEvent(event)
  }

  override fun requestPermission(promise: Promise) {
    val granted = reactApplicationContext.checkSelfPermission(
        Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED
    promise.resolve(granted)
  }

  override fun isAvailable(locale: String, promise: Promise) {
    promise.resolve(SpeechRecognizer.isRecognitionAvailable(reactApplicationContext))
  }

  override fun start(locale: String) {
    main.post {
      destroy()
      finished = false
      lastText = ""
      if (!SpeechRecognizer.isRecognitionAvailable(reactApplicationContext)) {
        send("error", error = "Speech recognition isn't available on this phone.")
        return@post
      }
      val sr = SpeechRecognizer.createSpeechRecognizer(reactApplicationContext)
      recognizer = sr
      sr.setRecognitionListener(listener)
      val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
        putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
        putExtra(RecognizerIntent.EXTRA_LANGUAGE, locale)
        putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
        // Give people a moment to think of the amount before it cuts off.
        putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 2000L)
        putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 2000L)
      }
      sr.startListening(intent)
    }
  }

  override fun stop() {
    main.post { recognizer?.stopListening() }
  }

  override fun cancel() {
    main.post {
      finished = true
      destroy()
    }
  }

  override fun invalidate() {
    main.post { destroy() }
    super.invalidate()
  }

  private fun destroy() {
    recognizer?.cancel()
    recognizer?.destroy()
    recognizer = null
  }

  private fun finish(text: String?) {
    if (finished) return
    finished = true
    if (!text.isNullOrBlank()) send("final", text = text)
    send("end")
    main.post { destroy() }
  }

  private val listener = object : RecognitionListener {
    override fun onReadyForSpeech(params: Bundle?) {}
    override fun onBeginningOfSpeech() {}
    override fun onBufferReceived(buffer: ByteArray?) {}
    override fun onEvent(eventType: Int, params: Bundle?) {}
    override fun onEndOfSpeech() {}

    override fun onRmsChanged(rmsdB: Float) {
      // Roughly -2..10 dB -> 0..1
      send("volume", level = ((rmsdB + 2f) / 12f).coerceIn(0f, 1f).toDouble())
    }

    override fun onPartialResults(partialResults: Bundle?) {
      val text = partialResults
          ?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
          ?.firstOrNull()
      if (!text.isNullOrBlank() && !finished) {
        lastText = text
        send("partial", text = text)
      }
    }

    override fun onResults(results: Bundle?) {
      val text = results
          ?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
          ?.firstOrNull()
      finish(if (text.isNullOrBlank()) lastText else text)
    }

    override fun onError(error: Int) {
      if (finished) return
      if (lastText.isNotBlank()) {
        finish(lastText)
        return
      }
      val message = when (error) {
        SpeechRecognizer.ERROR_NO_MATCH,
        SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "I didn't catch that."
        SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "Microphone permission is off."
        SpeechRecognizer.ERROR_NETWORK,
        SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "No internet connection for speech recognition."
        else -> "Speech recognition failed ($error)."
      }
      send("error", error = message)
      finish(null)
    }
  }

  companion object {
    const val NAME = "NativeSpeech"
  }
}
