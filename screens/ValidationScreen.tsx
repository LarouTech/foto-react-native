import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import CustomBtn from '../components/UI/CustomBtn';
import FotoLogo from '../components/UI/FotoLogo';
import InputField from '../components/UI/InputField/InputField';
import ScreenContainer from '../components/UI/ScreenContainer';
import validator from 'validator';
import { ConfirmSignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { AuthService } from '../services/authServices';
import { AuthContext } from '../context/AuthContextProvider';
import { Theme } from '../constant/colors';
import { ProfileService } from '../services/profileService';
import { v4 as uuidv4 } from 'uuid';
import { ProfileContext } from '../context/ProfileContextProvider';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputTextInputEventData
} from 'react-native';

interface ValidationScreenProps {
  route: RouteProp<{ params: { email: string; password: string } }>;
}

const authService = new AuthService();
const profileService = new ProfileService();

function ValidationScreen(props: ValidationScreenProps) {
  const navigation = useNavigation();
  const password = props.route.params.password as string;
  const [code, setCode] = useState<string>('');
  const [isDisabled, setDisabledState] = useState<boolean>(true);
  const email = props.route.params.email;
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);

  useEffect(() => {
    if (
      validator.isEmail(email) &&
      validator.isNumeric(code.toString()!) &&
      validator.isLength(code.toString()!, { min: 6, max: 6 })
    ) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }

    return () => {};
  }, [email, code, setDisabledState]);

  const onValidateHandler = async () => {
    try {
      await authService.confirmSignup(email, code);
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

  const conCancelHandler = (): void => {
    navigation.navigate('SignupScreen' as never);
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

  console.log(isValidCode);

  return (
    <React.Fragment>
      <ScreenContainer>
        <React.Fragment>
          <FotoLogo></FotoLogo>

          <InputField
            textInputProps={{
              keyboardType: 'email-address',
              editable: false
            }}
            label="email"
            value={email.toLowerCase()}
          ></InputField>

          <InputField
            textInputProps={{
              keyboardType: 'number-pad',
              onChangeText: onCodeChangeHandler,
              maxLength: 6
            }}
            label="code"
            state={isValidCode}
            errorMessage="Please enter your 6 digits code"
          ></InputField>

          <CustomBtn
            containerStyle={{ width: '60%', marginBottom: 30 }}
            isDisbaled={isDisabled}
            onPress={onValidateHandler}
            name="validate"
          ></CustomBtn>
          <CustomBtn
            btnStyle={{ backgroundColor: Theme.Colors.red100 }}
            btnTextStyle={{ color: Theme.Colors.lightGrey }}
            containerStyle={{ width: '30%' }}
            onPress={conCancelHandler}
            name="cancel"
          ></CustomBtn>
        </React.Fragment>
      </ScreenContainer>
    </React.Fragment>
  );
}

export default ValidationScreen;
