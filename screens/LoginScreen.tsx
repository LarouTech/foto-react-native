import React, { useContext, useEffect, useState } from 'react';
import ScreenContainer from '../components/UI/ScreenContainer';
import FotoLogo from '../components/UI/FotoLogo';
import InputField from '../components/UI/InputField/InputField';
import CustomBtn from '../components/UI/CustomBtn';
import validator from 'validator';
import { AuthService } from '../services/authServices';
import { AuthContext } from '../context/AuthContextProvider';
import { ProfileContext } from '../context/ProfileContextProvider';
import {
  Alert,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputTextInputEventData,
  View
} from 'react-native';
import { Theme } from '../constant/colors';
import { useNavigation } from '@react-navigation/native';

interface LoginScreenProps {}

function LoginScreen(props: LoginScreenProps) {
  const authService = new AuthService();

  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDisabled, setDisabledState] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (validator.isEmail(email) && validator.isStrongPassword(password)) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }

    return () => {};
  }, [email, password, setDisabledState]);

  const onLoginHandler = async () => {
    try {
      const response = await authService.onLoginHandler(
        email,
        password,
        authContext,
        profileContext
      );
    } catch (error: any) {
      Alert.alert('Login Error', error.message, [{ text: 'OK' }]);
    }
  };

  const [isValidEmail, setIsValidEmail] = useState<boolean>(undefined!);
  const setEmailState = (text: string) => {
    if (text === '') {
      return;
    }

    setTimeout(() => {
      setIsValidEmail(validator.isEmail(text));
    }, 0);
  };

  const [isValidPassword, setIsValidPassword] = useState<boolean>(undefined!);
  const setPasswordState = (text: string) => {
    if (text === '') {
      return;
    }

    setTimeout(() => {
      setIsValidPassword(validator.isStrongPassword(text));
    }, 1000);
  };

  const onEmailChangeHandler = (text: string): void => {
    setEmail(text);
    setEmailState(text);
  };

  const onPasswordChangeHandler = (text: string): void => {
    setPassword(text);
    setPasswordState(text);
  };

  const onLoadEmailHandler = (
    event: NativeSyntheticEvent<TextInputTextInputEventData>
  ) => {
    setEmail(event.nativeEvent.text);
    setEmailState(event.nativeEvent.text);
  };

  const onLoadPasswordHandler = (
    event: NativeSyntheticEvent<TextInputTextInputEventData>
  ) => {
    setPassword(event.nativeEvent.text);
    setPasswordState(event.nativeEvent.text);
  };

  const onForgotPasswordHandler = () => {
    navigation.navigate('ForgotPasswordScreen' as never);
  };

  return (
    <React.Fragment>
      <ScreenContainer>
        <React.Fragment>
          <FotoLogo text="login"></FotoLogo>

          <InputField
            textInputProps={{
              keyboardType: 'email-address',
              onChangeText: onEmailChangeHandler,
              onTextInput: onLoadEmailHandler
            }}
            label="email"
            value={email.toLowerCase()}
            errorMessage="Please enter a valid email address"
            state={isValidEmail}
          ></InputField>

          <InputField
            textInputProps={{
              keyboardType: 'default',
              secureTextEntry: true,
              onChangeText: onPasswordChangeHandler,
              onTextInput: onLoadPasswordHandler
            }}
            label="password"
            styles={{ container: { marginBottom: 40 } }}
            state={isValidPassword}
            errorMessage="Please enter a strong password"
          ></InputField>

          <CustomBtn
            containerStyle={{ width: '60%', marginBottom: 20 }}
            isDisbaled={isDisabled}
            onPress={onLoginHandler}
            name="login"
          ></CustomBtn>

          <Pressable onPress={onForgotPasswordHandler}>
            <Text style={styles.forgotText}>Forget Password?</Text>
          </Pressable>
        </React.Fragment>
      </ScreenContainer>
    </React.Fragment>
  );
}

export const styles = StyleSheet.create({
  forgotText: {
    color: Theme.Colors.lightGrey
  }
});

export default LoginScreen;
