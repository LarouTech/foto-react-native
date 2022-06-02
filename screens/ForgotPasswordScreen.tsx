import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInputTextInputEventData,
  View
} from 'react-native';
import CustomBtn from '../components/UI/CustomBtn';
import FotoLogo from '../components/UI/FotoLogo';
import InputField from '../components/UI/InputField/InputField';
import ScreenContainer from '../components/UI/ScreenContainer';
import { Theme } from '../constant/colors';
import validator from 'validator';
import { AuthService } from '../services/authServices';

interface ForgotPasswordScreenProps {}

function ForgotPasswordScreen(props: ForgotPasswordScreenProps) {
  const authService = new AuthService();
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [isCodeGenerated, setIsCodeGenerated] = useState<boolean>(false);

  const [isValidEmail, setIsValidEmail] = useState<boolean>(undefined!);
  const setEmailState = (text: string) => {
    if (text === '') {
      return;
    }

    setTimeout(() => {
      setIsValidEmail(validator.isEmail(text));
    }, 0);
  };

  const onEmailChangeHandler = (text: string): void => {
    setEmail(text);
    setEmailState(text);
  };
  const onLoadEmailHandler = (
    event: NativeSyntheticEvent<TextInputTextInputEventData>
  ) => {
    setEmail(event.nativeEvent.text);
    setEmailState(event.nativeEvent.text);
  };

  const [isValidCode, setIsValidCode] = useState<boolean>(undefined!);
  const setCodeState = (text: string) => {
    if (
      validator.isNumeric(text!) &&
      validator.isLength(text.toString()!, { min: 6, max: 6 })
    ) {
      setIsValidCode(() => {
        return true;
      });
    } else {
      setIsValidCode(() => false);
    }
  };

  const onCodeChangeHandler = (text: string): void => {
    setCode(text);
    setCodeState(text);
  };

  const [isValidPassword, setIsValidPassword] = useState<boolean>(undefined!);
  const setPasswordState = (text: string) => {
    if (text === '') {
      return;
    }

    setTimeout(() => {
      setIsValidPassword(validator.isStrongPassword(password));
    }, 0);
  };

  const onPasswordChangeHandler = (text: string): void => {
    setPassword(text);
    setPasswordState(text);
  };

  const onCancelHandler = () => {
    navigation.navigate('LoginScreen' as never);
  };

  const onGenerateCodeHandler = async () => {
    try {
      const response = await authService.forgotPassword(email);
      setIsCodeGenerated(true);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const onResetPasswordHandler = async () => {
    try {
      const response = await authService.confirmForgotPassword(
        email,
        password,
        code
      );
      navigation.navigate('LoginScreen' as never);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <ScreenContainer>
      <React.Fragment>
        <FotoLogo text="reset"></FotoLogo>

        <InputField
          textInputProps={{
            keyboardType: 'email-address',
            onChangeText: onEmailChangeHandler,
            onTextInput: onLoadEmailHandler,
            autoCompleteType: 'email'
          }}
          label="email"
          styles={{ container: { marginBottom: 0 } }}
          value={email.toLowerCase()}
          errorMessage="Please enter a valid email address"
          state={isValidEmail}
        ></InputField>

        <InputField
          textInputProps={{
            keyboardType: 'number-pad',
            onChangeText: onCodeChangeHandler,
            maxLength: 6,
            editable: isCodeGenerated === true ? isCodeGenerated : false
          }}
          label="code"
          state={isValidCode}
          styles={
            !isCodeGenerated
              ? { input: { backgroundColor: Theme.Colors.grey } }
              : { input: { backgroundColor: Theme.Colors.lightGrey } }
          }
          errorMessage="Please enter your 6 digits code"
        ></InputField>

        {!isCodeGenerated ? (
          <CustomBtn
            containerStyle={{ width: '80%', marginBottom: 30 }}
            onPress={onGenerateCodeHandler}
            name="generate code"
            isDisbaled={!isValidEmail}
          ></CustomBtn>
        ) : null}

        {isCodeGenerated ? (
          <React.Fragment>
            <InputField
              textInputProps={{
                keyboardType: 'default',
                secureTextEntry: true,
                onChangeText: onPasswordChangeHandler
              }}
              label="password"
              styles={{ container: { marginBottom: 40 } }}
              state={isValidPassword}
              errorMessage="Please enter a strong password"
            ></InputField>

            <CustomBtn
              containerStyle={{ width: '80%', marginBottom: 30 }}
              isDisbaled={!isValidPassword && !isValidCode}
              onPress={onResetPasswordHandler}
              name="reset"
            ></CustomBtn>
          </React.Fragment>
        ) : null}

        <CustomBtn
          btnStyle={{ backgroundColor: Theme.Colors.red100 }}
          btnTextStyle={{ color: Theme.Colors.lightGrey }}
          containerStyle={{ width: '80%' }}
          onPress={onCancelHandler}
          name="cancel"
        ></CustomBtn>
      </React.Fragment>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});

export default ForgotPasswordScreen;
