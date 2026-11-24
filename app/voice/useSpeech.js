import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import NativeSpeech from '../../specs/NativeSpeech';

/**
 * Speech-to-text hook over the app's NativeSpeech module.
 *
 *   const { start, stop, cancel, listening, text, level, error } = useSpeech();
 *
 * `text` updates live while listening; `onFinal(text)` fires once when the
 * recognizer settles on what was said.
 */
export function useSpeech({ locale = 'en-US', onFinal } = {}) {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');
  const [level, setLevel] = useState(0);
  const [error, setError] = useState(null);
  const onFinalRef = useRef(onFinal);
  onFinalRef.current = onFinal;

  useEffect(() => {
    if (!NativeSpeech) return undefined;
    const sub = NativeSpeech.onSpeechEvent(event => {
      switch (event.type) {
        case 'partial':
          setText(event.text);
          break;
        case 'final':
          setText(event.text);
          onFinalRef.current?.(event.text);
          break;
        case 'volume':
          setLevel(event.level);
          break;
        case 'error':
          setError(event.error);
          break;
        case 'end':
          setListening(false);
          setLevel(0);
          break;
      }
    });
    return () => {
      sub.remove();
      NativeSpeech.cancel();
    };
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setText('');
    if (!NativeSpeech) {
      setError('Voice input needs the latest app build.');
      return;
    }
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (result !== PermissionsAndroid.RESULTS.GRANTED) {
        setError('Allow microphone access to add expenses by voice.');
        return;
      }
    }
    const granted = await NativeSpeech.requestPermission();
    if (!granted) {
      setError('Allow microphone and speech access in Settings.');
      return;
    }
    setListening(true);
    NativeSpeech.start(locale);
  }, [locale]);

  const stop = useCallback(() => NativeSpeech?.stop(), []);
  const cancel = useCallback(() => {
    NativeSpeech?.cancel();
    setListening(false);
    setLevel(0);
  }, []);

  return { start, stop, cancel, listening, text, setText, level, error };
}

export default useSpeech;
