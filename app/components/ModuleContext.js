import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModuleContext = createContext(null);

export const ModuleProvider = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState('Business Expense');
  const [moduleLoading, setModuleLoading] = useState(true);
  const myModule = async module => {
    try {
      setSelectedModule(module);
      await AsyncStorage.setItem('SelectedModule', module);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const getModule = async () => {
      try {
        const myModuledata = await AsyncStorage.getItem('SelectedModule');

        if (myModuledata) {
          setSelectedModule(myModuledata);
        }
      } catch (error) {
        console.log('Module Load Error:', error);
      } finally {
        setModuleLoading(false);
      }
    };
    getModule();
  }, []);

  return (
    <ModuleContext.Provider
      value={{
        selectedModule,
        setSelectedModule,
        moduleLoading,
        setModuleLoading,
        myModule,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

export const useModule = () => useContext(ModuleContext);

/** Options for the Personal | Business switch shown in screen headers. */
export const MODULE_OPTIONS = [
  { value: 'Self Expense', label: 'Personal', icon: 'person' },
  { value: 'Business Expense', label: 'Business', icon: 'storefront' },
];
