import {
  Image,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import { Theme } from '../../../constant/colors';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ProfileContext } from '../../../context/ProfileContextProvider';
import UnknowAvatar from './UnknowAvatar';
import InitialAvatar from './InitialAvatar';
import {
  MediaLibraryService,
  PictureFormat
} from '../../../services/mediaLibraryService';
import PictureAvatar from './PictureAvatar';
import AvatarModal from './AvatarModal';

interface AvatarProps {
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element;
  imageUri?: string;
}

enum AvatarType {
  'UNKNOW' = 'unknow',
  'INITIAL' = 'initial',
  'PICTURE' = 'picture'
}

function Avatar(props: AvatarProps) {
  const mediaLibrary = new MediaLibraryService();
  const profileContext = useContext(ProfileContext);
  const [avatarType, setAvatarType] = useState<AvatarType>();
  const [isModalVisible, setModalVisiblle] = useState<boolean>(null!);

  const detecAvatarState = () => {
    if (profileContext.profile.firstName || profileContext.profile.lastName) {
      setAvatarType(AvatarType.INITIAL);
    }

    if (!profileContext.profile.firstName && !profileContext.profile.lastName) {
      setAvatarType(AvatarType.UNKNOW);
    }

    if (profileContext.profile.imageUri) {
      setAvatarType(AvatarType.PICTURE);
    }
  };

  useEffect(() => {
    if (profileContext.profile.imageKeyId) {
      fetchProfilePictureHandler();
    }
  });

  useEffect(() => {
    detecAvatarState();
  }, [detecAvatarState]);

  const fetchProfilePictureHandler = async () => {
    const profile = profileContext.profile;
    const keyId = profileContext.profile.imageKeyId;
    const imagUri = await mediaLibrary.getPictureUrl(
      keyId!,
      PictureFormat.THUMBNAILS
    );
    profileContext.onAddProfilePicture(profile, imagUri!, keyId!);
  };

  const avatarSelector = () => {
    switch (avatarType) {
      case AvatarType.INITIAL:
        return <InitialAvatar></InitialAvatar>;
      case AvatarType.UNKNOW:
        return <UnknowAvatar></UnknowAvatar>;
      case AvatarType.PICTURE:
        return (
          <PictureAvatar
            imageUri={profileContext.profile.imageUri as string}
          ></PictureAvatar>
        );
      default:
        break;
    }
  };

  const onPressAvatarHandler = async () => {
    setModalVisiblle(true);
  };

  const onCloseAvatarModalHandler = () => {
    setModalVisiblle(false);
  };

  return (
    <React.Fragment>
      {isModalVisible ? (
        <AvatarModal
          onSetState={onCloseAvatarModalHandler}
          isVisible={isModalVisible}
        ></AvatarModal>
      ) : null}

      <Pressable
        onPress={onPressAvatarHandler}
        style={[styles.container, props.style]}
      >
        {avatarSelector()}
      </Pressable>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: Theme.Colors.primary200,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Avatar;
