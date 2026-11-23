import React, {
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { theme } from '../theme';

// ---------------------------------------------------------------------------
// Why this isn't a <Modal>
//
// The spinner used to be a native iOS Modal. Native modals that are closed
// while still opening (or opened while another modal is closing — e.g. the
// module picker) can leave an invisible window on top of the app that
// swallows every touch: the app looked frozen after switching module.
//
// Now each <Loader visible /> only registers itself in a tiny store, and one
// <LoaderHost /> at the app root draws a plain full-screen overlay while any
// loader on a *focused* screen is active. No native modal, nothing to get
// stuck, and screens in background tabs can't block the one you're on.
// ---------------------------------------------------------------------------

// Only show the spinner when loading lasts longer than this, so quick loads
// don't flash.
const SHOW_DELAY_MS = 250;

let activeCount = 0;
const listeners = new Set();
const emit = () => listeners.forEach(listener => listener());
const subscribe = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getActive = () => activeCount > 0;

/** True while the screen this component lives in is focused (or if it isn't in a navigator). */
function useScreenFocused() {
  const navigation = useContext(NavigationContext);
  const [focused, setFocused] = useState(() =>
    navigation ? navigation.isFocused() : true,
  );
  useEffect(() => {
    if (!navigation) return undefined;
    setFocused(navigation.isFocused());
    const offFocus = navigation.addListener('focus', () => setFocused(true));
    const offBlur = navigation.addListener('blur', () => setFocused(false));
    return () => {
      offFocus();
      offBlur();
    };
  }, [navigation]);
  return focused;
}

/** Drop-in spinner: `<Loader visible={isLoading} />` anywhere in a screen. */
const Loader = ({ visible }) => {
  const focused = useScreenFocused();
  const active = Boolean(visible) && focused;

  useEffect(() => {
    if (!active) return undefined;
    activeCount += 1;
    emit();
    return () => {
      activeCount -= 1;
      emit();
    };
  }, [active]);

  return null;
};

/** Render once at the app root, above the navigator. */
export const LoaderHost = () => {
  const active = useSyncExternalStore(subscribe, getActive, getActive);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!active) {
      setShown(false);
      return undefined;
    }
    const timer = setTimeout(() => setShown(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [active]);

  if (!shown) return null;

  return (
    <View
      style={styles.overlay}
      accessibilityViewIsModal
      accessibilityLabel="Loading"
    >
      <View style={styles.card}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    elevation: 1000,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 80,
    height: 80,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
});
