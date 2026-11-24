import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import CustomToast from './app/components/CustomToast';
import { LoaderHost } from './app/components/Loader';
import RootStack from './app/navigation/RootStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModuleProvider } from './app/components/ModuleContext';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider } from './app/theme';
import { LanguageProvider, t } from './app/i18n';
// When loading data fails because the phone is offline, say so once,
// instead of leaving empty screens with no explanation.
let lastOfflineToast = 0;
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      const offline =
        error?.message === 'NO_INTERNET' ||
        /network request failed/i.test(error?.message ?? '');
      if (!offline || Date.now() - lastOfflineToast < 10000) return;
      lastOfflineToast = Date.now();
      Toast.show({
        type: 'error',
        text1: t('common.noInternetTitle'),
        text2: t('common.noInternetPull'),
      });
    },
  }),
});
const toastConfig = {
  success: props => <CustomToast {...props} />,
  error: props => <CustomToast {...props} tone="error" />,
};
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />

            <LanguageProvider>
              <NavigationContainer>
                <ModuleProvider>
                  <RootStack />
                </ModuleProvider>
              </NavigationContainer>
            </LanguageProvider>

            {/* Full-screen spinner driven by <Loader visible /> in screens */}
            <LoaderHost />

            <Toast config={toastConfig} />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
