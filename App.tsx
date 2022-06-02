import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AuthContextProvider from './context/AuthContextProvider';
import ConfigContextProvider from './context/ConfigContextProvider';
import ProfileContextProvider from './context/ProfileContextProvider';
import NavigationProvider from './navigations/NavigationProvider';

export default function App() {
  const onLoadHandler = () => {};

  return (
    <ConfigContextProvider>
      <React.Fragment>
        <StatusBar style="light"></StatusBar>

        <AuthContextProvider>
          <ProfileContextProvider>
            <ActionSheetProvider>
              <NavigationProvider />
            </ActionSheetProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
      </React.Fragment>
    </ConfigContextProvider>
  );
}
