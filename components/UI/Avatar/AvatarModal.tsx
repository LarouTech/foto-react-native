import React, { useContext, useLayoutEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { ProfileContext } from '../../../context/ProfileContextProvider';
import CustomBtn from '../CustomBtn';
import ScreenContainer from '../ScreenContainer';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import { v4 as uuidv4 } from 'uuid';

import { Theme } from '../../../constant/colors';
import {
  MediaLibraryService,
  PictureFormat
} from '../../../services/mediaLibraryService';
import StatusSpinner, { DownloadCompletedStatus } from '../StatusSpinner';
import FadeIn from '../../animation/FadeIn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface AvatarModalProps {
  isVisible: boolean;
  onSetState: (state: boolean) => void;
}

function AvatarModal(props: AvatarModalProps) {
  const profileContext = useContext(ProfileContext);
  const mediaService = new MediaLibraryService();

  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [downloadStatusMessage, setDownloadStatusMessage] = useState<string>(
    null!
  );

  const [deleteProgress, setDeleetProgress] = useState<number>(0);

  const onUploadPictureHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.Automatic
    });
    setDownloadStatusMessage('initiate download');
    setLoadingProgress(3);

    if (!result.cancelled) {
      const thumbnailResult = await manipulateAsync(result.uri, [
        { resize: { height: 200, width: 200 } }
      ]);
      setDownloadStatusMessage('download image');
      setLoadingProgress(40);
      const blob = await mediaService.convertURitoBlob(result.uri);
      const thumbnailBlob = await mediaService.convertURitoBlob(
        thumbnailResult.uri
      );
      const id = uuidv4();
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(thumbnailBlob);
      fileReaderInstance.onload = () => {
        const base64data = fileReaderInstance.result;
        profileContext.onAddProfilePicture(
          profileContext.profile,
          base64data as string,
          id
        );
        setDownloadStatusMessage('download in progress');
        setLoadingProgress(60);
      };
      try {
        setDownloadStatusMessage('download in progress');
        setLoadingProgress(75);
        const response = await mediaService.uploadPicture(
          blob,
          id,
          PictureFormat.ORIGINAL
        );
        await mediaService.uploadPicture(
          thumbnailBlob,
          id,
          PictureFormat.THUMBNAILS
        );
      } catch (error) {
        console.log(error);
      }
    }
    setLoadingProgress(95);
  };

  const onCancelHandler = () => {
    if (loadingProgress === 100) {
      setTimeout(() => {
        props.onSetState(false);
      }, 300);
      return;
    }

    setLoadingProgress(0);
    props.onSetState(false);
  };

  const onConfirmDeletePicture = () => {
    setLoadingProgress(0);
    setDeleetProgress(3);
    setDownloadStatusMessage('deleting image');
    mediaService
      .deleteProfilePictures(profileContext.profile.imageKeyId!)
      .then(() => {
        const updatedProfile = profileContext.profile;
        updatedProfile.imageKeyId = '';
        updatedProfile.imageUri = null!;

        profileContext.onUpdateProfile(updatedProfile);
      });
  };

  const onDeletePictures = () => {
    Alert.alert(
      'Delete Profile Picture',
      'Are you sure you want to delete your profile picture',
      [{ text: 'yes', onPress: onConfirmDeletePicture }, { text: 'no' }]
    );
  };

  const onDownloadCompleted = (state: DownloadCompletedStatus) => {
    if (state === DownloadCompletedStatus.DOWNLOAD_COMPLETED) {
      if (loadingProgress > 0) {
        setLoadingProgress(100);
        setDownloadStatusMessage('download completed');
      }

      if (deleteProgress > 0) {
        setDeleetProgress(100);
        setDownloadStatusMessage('delete successfully');
      }
    }

    if (state === DownloadCompletedStatus.ON_PRESS) {
      props.onSetState(false);
    }
  };

  return (
    <Modal
      visible={props.isVisible}
      animationType="fade"
      style={styles.modalContainer}
    >
      <ScreenContainer>
        <React.Fragment>
          {deleteProgress <= 0 && loadingProgress <= 0 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MaterialCommunityIcons
                name="account-edit"
                size={175}
                color={Theme.Colors.lightGrey}
              />

              <Text style={styles.message}>edit profile picture</Text>
            </View>
          ) : null}

          {deleteProgress > 0 ? (
            <FadeIn
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <StatusSpinner
                completed={onDownloadCompleted}
                bgColor={Theme.Colors.lightGrey}
                pgColor={Theme.Colors.red100}
                progressPercent={deleteProgress}
                size={175}
                strokeWidth={25}
                text="progress"
                textColor={Theme.Colors.lightGrey}
                textSize={36}
                statusMessage={downloadStatusMessage}
              ></StatusSpinner>
            </FadeIn>
          ) : null}

          {loadingProgress > 0 ? (
            <FadeIn
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <StatusSpinner
                completed={onDownloadCompleted}
                bgColor={Theme.Colors.lightGrey}
                pgColor={Theme.Colors.green500}
                progressPercent={loadingProgress}
                size={175}
                strokeWidth={20}
                text="progress"
                textColor={Theme.Colors.lightGrey}
                textSize={36}
                statusMessage={downloadStatusMessage}
              ></StatusSpinner>
            </FadeIn>
          ) : null}

          <View style={styles.screenContainer}>
            <CustomBtn
              name={
                profileContext.profile.imageUri
                  ? 'change picture'
                  : 'add picture'
              }
              onPress={onUploadPictureHandler}
              containerStyle={{ width: '100%', marginBottom: 30 }}
              isDisbaled={loadingProgress === 100 || deleteProgress === 100}
              btnStyle={{ backgroundColor: Theme.Colors.green500 }}
              btnTextStyle={
                loadingProgress === 100 || deleteProgress === 100
                  ? { color: Theme.Colors.grey900 }
                  : { color: Theme.Colors.lightGrey }
              }
            ></CustomBtn>
            <CustomBtn
              name="delete picture"
              onPress={onDeletePictures}
              containerStyle={{ width: '100%', marginBottom: 30 }}
              btnStyle={{ backgroundColor: Theme.Colors.red100 }}
              btnTextStyle={
                loadingProgress === 100 ||
                deleteProgress === 100 ||
                !profileContext.profile.imageUri
                  ? { color: Theme.Colors.grey900 }
                  : { color: Theme.Colors.lightGrey }
              }
              isDisbaled={
                loadingProgress === 100 ||
                deleteProgress === 100 ||
                !profileContext.profile.imageUri
              }
            ></CustomBtn>
            <CustomBtn
              name={
                loadingProgress === 100 || deleteProgress === 100
                  ? 'close'
                  : 'cancel'
              }
              onPress={onCancelHandler}
              containerStyle={{ width: '100%' }}
              btnStyle={{
                backgroundColor:
                  loadingProgress === 100 || deleteProgress === 100
                    ? Theme.Colors.primary100
                    : Theme.Colors.primary100
              }}
            ></CustomBtn>
          </View>
        </React.Fragment>
      </ScreenContainer>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    marginTop: 50,
    width: '80%'
  },
  modalContainer: {
    margin: 0,
    backgroundColor: 'pink'
  },
  message: {
    fontSize: 22,
    color: Theme.Colors.lightGrey,
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 2,
    textTransform: 'capitalize'
  }
});

export default AvatarModal;
