import ScreenContainer from '../components/UI/ScreenContainer';
import FotoLogo from '../components/UI/FotoLogo';
import React, { useEffect, useState } from 'react';
import InputField from '../components/UI/InputField/InputField';
import CustomBtn from '../components/UI/CustomBtn';
import CustomCheckbox from '../components/UI/CustomCheckbox';
import validator from 'validator';
import { AuthService } from '../services/authServices';
import { SignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputTextInputEventData
} from 'react-native';

interface SignupScreenProps {}

const authService = new AuthService();

function SignupScreen(props: SignupScreenProps): JSX.Element {
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDisabled, setDisabledState] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (
      validator.isEmail(email) &&
      validator.isStrongPassword(password) &&
      isChecked === true
    ) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }

    return () => {};
  }, [email, password, isChecked, setDisabledState]);

  const [isValidEmail, setIsValidEmail] = useState<boolean>(undefined!);
  const setEmailState = (text: string) => {
    if (text === '') {
      return;
    }

    setTimeout(() => {
      setIsValidEmail(validator.isEmail(text));
    }, 1000);
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

  const onSigninHandler = async (): Promise<
    SignUpCommandOutput | undefined
  > => {
    try {
      const signinResponse = await authService.signin(email, password);
      navigation.navigate(
        'ValidationScreen' as never,
        { email: email, password: password } as never
      );

      return signinResponse!;
    } catch (error: any) {
      Alert.alert('Signin Error', error.message, [{ text: 'OK' }]);
      return undefined;
    }
  };

  const onCheckedHandler = (newState: boolean): void => {
    setChecked(newState);
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

  return (
    <React.Fragment>
      <ScreenContainer>
        <React.Fragment>
          <FotoLogo text="signup"></FotoLogo>

          <InputField
            textInputProps={{
              keyboardType: 'email-address',
              onChangeText: onEmailChangeHandler,
              onTextInput: onLoadEmailHandler
            }}
            label="email"
            value={email.toLowerCase()}
            state={isValidEmail}
            errorMessage={'Please enter a valid email address'}
          ></InputField>

          <InputField
            textInputProps={{
              keyboardType: 'email-address',
              secureTextEntry: true,
              onChangeText: onPasswordChangeHandler,
              onTextInput: onLoadPasswordHandler
            }}
            label="password"
            state={isValidPassword}
            errorMessage={'Please eneter a strong password'}
          ></InputField>

          <CustomCheckbox
            state={isChecked}
            onChecked={onCheckedHandler}
            text="Please accept the term of services"
          ></CustomCheckbox>

          <CustomBtn
            containerStyle={{ width: '60%' }}
            isDisbaled={isDisabled}
            onPress={onSigninHandler}
            name="signin"
          ></CustomBtn>
        </React.Fragment>
      </ScreenContainer>
    </React.Fragment>
  );
}

export default SignupScreen;
