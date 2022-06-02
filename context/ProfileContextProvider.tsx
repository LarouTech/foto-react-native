import { createContext, useEffect, useReducer, useState } from 'react';
import { Config, ConfigService } from '../services/configService';
import { ProfileService } from '../services/profileService';

const profileService = new ProfileService();

export interface Profile {
  id: string;
  email?: string;
  creationDate: string;
  firstName: string;
  lastName: string;
  lastModified: string;
  username: string;
  cognitoSub: string;
  birthdate: string;
  imageUri?: string;
  imageKeyId?: string;
}

export interface ProfileContextProps {
  onCreateProfile: (profile: Profile) => void;
  onGetProfile: (profileId: string) => void;
  onUpdateProfile: (profile: Profile) => void;
  onAddProfilePicture: (profile: Profile, imageUri: string, id: string) => void;
  onClearProfile: () => void;
  profile: Profile;
}

const profileInitState: Profile = {
  id: null!,
  email: null!,
  cognitoSub: null!,
  creationDate: null!,
  firstName: '',
  lastName: '',
  lastModified: null!,
  username: '',
  birthdate: '',
  imageUri: null!,
  imageKeyId: null!
};

export enum ProfileActionTypes {
  'ON_CREATE_PROFILE' = 'ON_GET_PROFILE',
  'ON_GET_PROFILE' = 'ON_GET_PROFILE',
  'ON_UPDATE_PROFILE' = 'ON_UPDATE_PROFILE',
  'ON_CLEAR_PROFILE' = 'ON_CLEAR_PROFILE',
  'ADD_PROFILE_PICTURE' = 'ADD_PROFILE_PICTURE'
}

export interface ProfileActions {
  type: ProfileActionTypes;
  payload: any;
  fieldName?: string;
}

const profileReducer = (state: Profile, action: ProfileActions) => {
  switch (action.type) {
    case ProfileActionTypes.ON_CREATE_PROFILE:
      return {
        ...state,
        ...action.payload
      } as Profile;

    case ProfileActionTypes.ON_GET_PROFILE:
      return {
        ...state,
        ...action.payload
      } as Profile;

    case ProfileActionTypes.ON_UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload
      } as Profile;
    case ProfileActionTypes.ADD_PROFILE_PICTURE:
      return {
        ...state,
        imageUri: action.payload.imageUri,
        imageKeyId: action.payload.keyId
      } as Profile;

    case ProfileActionTypes.ON_CLEAR_PROFILE:
      return { ...profileInitState } as Profile;

    default:
      return state;
  }
};

export const ProfileContext = createContext<ProfileContextProps>(null!);

interface ProfileContextProviderProps {
  children: JSX.Element;
}

function ProfileContextProvider(props: ProfileContextProviderProps) {
  const [profile, dispatchProfile] = useReducer(
    profileReducer,
    profileInitState
  );

  const onCreateProfileHandler = async (profile: Profile) => {
    await profileService.createProfile(profile);

    dispatchProfile({
      type: ProfileActionTypes.ON_CREATE_PROFILE,
      payload: profile
    });
  };

  const onGetProfileHandler = async (id: string) => {
    const dynamoDbProfile = await profileService.getProfile(id);

    if (!dynamoDbProfile.Item) {
      return;
    }

    const convertedProfile: any = {};

    const converter = Object.entries(dynamoDbProfile.Item).map((item) => {
      const key = item[0];
      const value = (item[1] as any).S;

      convertedProfile[key] = value;
    });

    dispatchProfile({
      type: ProfileActionTypes.ON_GET_PROFILE,
      payload: convertedProfile
    });
  };

  const onUpdateProfile = async (profile: Profile) => {
    await profileService
      .updateProfile(profile)
      .then((data) => console.log(data));

    dispatchProfile({
      type: ProfileActionTypes.ON_UPDATE_PROFILE,
      payload: profile
    });
  };

  const onAddProfilePicture = async (
    profile: Profile,
    imageUri: string,
    imageKeyId: string
  ) => {
    await profileService.updateProfile({
      ...profile,
      imageKeyId: imageKeyId
    });

    dispatchProfile({
      type: ProfileActionTypes.ADD_PROFILE_PICTURE,
      payload: {
        imageUri: imageUri,
        imageKeyId: imageKeyId
      }
    });
  };

  const contextValue: ProfileContextProps = {
    onCreateProfile: onCreateProfileHandler,
    onGetProfile: onGetProfileHandler,
    onClearProfile: () => {},
    onUpdateProfile: onUpdateProfile,
    onAddProfilePicture: onAddProfilePicture,
    profile: profile
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {props.children}
    </ProfileContext.Provider>
  );
}

export default ProfileContextProvider;
