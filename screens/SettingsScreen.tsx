import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ScreenContainer from '../components/UI/ScreenContainer';
import CustomBtn from '../components/UI/CustomBtn';
import { ProfileService } from '../services/profileService';
import { AuthContext } from '../context/AuthContextProvider';
import { AuthService } from '../services/authServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileContext } from '../context/ProfileContextProvider';
import {
  MediaLibraryService,
  PictureFormat
} from '../services/mediaLibraryService';
import FadinView, { TranslationAxis } from '../components/animation/Translate';
import Translate from '../components/animation/Translate';

interface SettingsScreenProps {}

const authService = new AuthService();
const profileService = new ProfileService();
const mediaService = new MediaLibraryService();

function SettingsScreen(props: SettingsScreenProps) {
  const profileContext = useContext(ProfileContext);

  const getPictureHandler = async () => {};

  const toValue = Dimensions.get('screen').width;

  return (
    <ScreenContainer>
      <React.Fragment>
        <Translate duration={3000} startingValue={0} toValue={toValue}>
          <Text style={{ color: '#fff', width: '100%' }}>Yanick Larouche</Text>
        </Translate>

        <CustomBtn
          name="touch"
          onPress={getPictureHandler}
          containerStyle={{ width: '80%' }}
        ></CustomBtn>
      </React.Fragment>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});

export default SettingsScreen;
