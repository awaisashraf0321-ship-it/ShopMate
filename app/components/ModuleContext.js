import { t } from '../i18n';
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

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
  {
    value: 'Self Expense',
    get label() {
      return t('module.personal');
    },
    icon: 'person',
  },
  {
    value: 'Business Expense',
    get label() {
      return t('module.business');
    },
    icon: 'storefront',
  },
];

const MODULE_WORDS = {
  'Self Expense': {
    get name() {
      return t('module.personal');
    },
    get what() {
      return t('module.personalWhat');
    },
  },
  'Business Expense': {
    get name() {
      return t('module.business');
    },
    get what() {
      return t('module.businessWhat');
    },
  },
};

/**
 * Returns switchModule(value): asks before changing Personal <-> Business,
 * because after a wrong tap everything on screen changes and it looks like
 * the user's entries have gone.
 */
export const useSwitchModule = () => {
  const { selectedModule, myModule } = useModule();
  return value => {
    if (value === selectedModule) return;
    const to = MODULE_WORDS[value];
    const from = MODULE_WORDS[selectedModule];
    Alert.alert(
      t('module.switchTitle', { to: to.name }),
      t('module.switchText', { what: to.what, from: from.name }),
      [
        { text: t('module.stay', { from: from.name }), style: 'cancel' },
        {
          text: t('module.switch', { to: to.name }),
          onPress: async () => {
            await myModule(value);
            Toast.show({
              type: 'success',
              text1: t('module.now', { to: to.name }),
            });
          },
        },
      ],
      { cancelable: true },
    );
  };
};
