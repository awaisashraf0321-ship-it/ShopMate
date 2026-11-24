import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import CustomToast from '../shopMate/app/components/CustomToast';
import RootStack from '../shopMate/app/navigation/RootStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModuleProvider } from '../shopMate/app/components/ModuleContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const toastConfig = {
  success: props => <CustomToast {...props} />,
};
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

          <NavigationContainer>
            <ModuleProvider>
              <RootStack />
            </ModuleProvider>
          </NavigationContainer>

          <Toast config={toastConfig} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
