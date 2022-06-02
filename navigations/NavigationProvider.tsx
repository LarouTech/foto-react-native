import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Theme } from '../constant/colors';
import ValidationScreen from '../screens/ValidationScreen';
import { AuthContext } from '../context/AuthContextProvider';
import LobbyScreen from '../screens/CameraScreen';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthBottomNavigator from './AuthBottomNavigator';
import LobbyBottomNavigator from './LobbyBottomNavigator';
import { AuthService } from '../services/authServices';
import LibraryScreen from '../screens/LibraryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { expand, from, lastValueFrom, map, mergeMap, of } from 'rxjs';
import { ProfileContext } from '../context/ProfileContextProvider';
import { ProfileService } from '../services/profileService';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

interface NavigationProviderProps {}

const Stack = createNativeStackNavigator();

const authService = new AuthService();
const profileService = new ProfileService();

function NavigationProvider(props: NavigationProviderProps) {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);

  useEffect(() => {
    isAuthticated();
    return () => {};
  }, []);

  useEffect(() => {
    profileService.getProfileAtStartup(profileContext);

    return () => {};
  }, []);

  const isAuthticated = () => {
    const response$ = from(AsyncStorage.getItem('AccessToken')).pipe(
      mergeMap((token) => {
        return of(authService.isAuthenticated(token!)).pipe(
          map((isAuth) => {
            if (isAuth) {
              authContext.onLogin(token!);
            }

            return token;
          })
        );
      })
    );

    return lastValueFrom(response$);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthScreens" screenOptions={{}}>
        {authContext.payload.isAuth ? (
          <React.Fragment>
            <Stack.Screen
              name="LobbyScreens"
              component={LobbyBottomNavigator}
              options={{
                presentation: 'card',
                headerShown: true,
                headerStyle: { backgroundColor: Theme.Colors.grey900 },
                headerTintColor: Theme.Colors.lightGrey
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerStyle: { backgroundColor: Theme.Colors.grey900 },
                headerTintColor: Theme.Colors.lightGrey,
                headerBackVisible: true,
                headerBackTitleVisible: true
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Library"
              component={LibraryScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerStyle: { backgroundColor: Theme.Colors.grey900 },
                headerTintColor: Theme.Colors.lightGrey,
                headerBackVisible: true,
                headerBackTitleVisible: true
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerStyle: { backgroundColor: Theme.Colors.grey900 },
                headerTintColor: Theme.Colors.lightGrey,
                headerBackVisible: true,
                headerBackTitleVisible: true
              }}
            ></Stack.Screen>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen
              name="AuthScreens"
              component={AuthBottomNavigator}
              options={{ presentation: 'modal', headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="ValidationScreen"
              component={ValidationScreen}
              options={{
                headerShown: false,
                headerBackVisible: true,
                headerTintColor: Theme.Colors.lightGrey,
                headerStyle: { backgroundColor: Theme.Colors.primary700 }
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{
                headerShown: false,
                headerBackVisible: true,
                headerTintColor: Theme.Colors.lightGrey,
                headerStyle: { backgroundColor: Theme.Colors.primary700 }
              }}
            ></Stack.Screen>
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationProvider;
