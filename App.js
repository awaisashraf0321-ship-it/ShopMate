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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './app/theme';
const queryClient = new QueryClient();
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

            <NavigationContainer>
              <ModuleProvider>
                <RootStack />
              </ModuleProvider>
            </NavigationContainer>

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
