import React, { useContext, useReducer, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Avatar from '../components/UI/Avatar/Avatar';
import CustomBtn from '../components/UI/CustomBtn';
import InputField from '../components/UI/InputField/InputField';
import ScreenContainer from '../components/UI/ScreenContainer';
import {
  formStateReducer,
  ProfileFormActionTypes,
  ProfileFormSchema,
  ProfileFormState
} from '../reducers/ProfileFormReducer';
import ModalDatePicker from '../components/UI/ModalDatePicker';
import { Profile, ProfileContext } from '../context/ProfileContextProvider';
import { Theme } from '../constant/colors';
import { useNavigation } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';

interface ProfileScreenProps {}

function ProfileScreen(props: ProfileScreenProps) {
  const profileContext = useContext(ProfileContext);
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();

  const initProfileFormState: ProfileFormState = {
    email: {
      value: profileContext.profile.email
    },
    firstName: {
      value: profileContext.profile.firstName
    },
    lastName: {
      value: profileContext.profile.lastName
    },
    username: {
      value: profileContext.profile.username
    },
    birthdate: {
      value: profileContext.profile.birthdate
    }
  };

  const [formState, dispatchFormState] = useReducer(
    formStateReducer,
    initProfileFormState!
  );

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onChangeInputHandler = (name: string, text: string) => {
    dispatchFormState({
      type: ProfileFormActionTypes.ON_INPUT_CHANGE,
      payload: text,
      fieldName: name
    });
  };

  const onCancelHandler = () => {
    setModalVisible(false);
  };

  const onPressInBirthdate = () => {
    if (formState.birthdate?.value != '') {
      Alert.alert('Validate', 'Do you really want to change your birthdate?', [
        { text: 'Yes', onPress: () => setModalVisible(true) },
        { text: 'Cancel', onPress: () => setModalVisible(false) }
      ]);
    } else {
      setModalVisible(true);
    }
  };

  const onGetDateHandler = (value: Date) => {
    setModalVisible(false);

    dispatchFormState({
      type: ProfileFormActionTypes.ON_INPUT_CHANGE,
      payload: value,
      fieldName: 'birthdate'
    });
  };

  const parseDate = (): string => {
    function nth(n: number) {
      return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
    }

    const integerDate = Date.parse(formState.birthdate?.value as string);
    const date = new Date(integerDate);

    const month = date.toLocaleString('default', {
      month: 'long'
    });

    const day = date.toLocaleString('default', {
      day: 'numeric'
    });

    const year = date.toLocaleString('default', {
      year: 'numeric'
    });

    if (formState.birthdate?.value === '') {
      return '';
    }

    return `${month}, ${day}${nth(+day!)}, ${year}`;
  };

  const onOpenSheet = () => {
    const options = ['Save', 'Cancel'];
    const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex, //the third button will be the 'Cancel' button
        titleTextStyle: { fontSize: 72, color: 'pink' },
        title: 'Save Profile',
        message: 'Do you want to update your profile?',
        messageTextStyle: { fontSize: 100, color: 'pink' }
      },
      (buttonIndex) => {
        // Do something here depending on the button index selected

        if (buttonIndex === 0) {
          const profile: Profile = {
            ...profileContext.profile,
            firstName:
              formState.firstName?.value! != ''
                ? formState.firstName?.value!
                : '',
            lastName:
              formState.lastName?.value! != ''
                ? formState.lastName?.value!
                : '',
            username:
              formState.username?.value! != ''
                ? formState.username?.value!
                : '',
            birthdate: formState.birthdate?.value as string,
            lastModified: new Date().toISOString()
          };

          console.log(profile);
          profileContext.onUpdateProfile(profile);
          scrollViewRef.current?.scrollTo({ x: 0, y: 0 });
          setTimeout(() => {
            navigation.goBack();
          }, 600);
        }
      }
    );
  };

  const onSaveProfileHandler = () => {
    onOpenSheet();
  };

  const onCancelProfileUpdateHandler = () => {
    navigation.goBack();
  };

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <ScreenContainer>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={[styles.list]}
      >
        <View style={styles.avatarContainer}>
          <Avatar style={{ marginVertical: 30 }}></Avatar>
        </View>

        <InputField
          key={1}
          value={profileContext.profile.email}
          textInputProps={{
            editable: false
          }}
          styles={{
            container: styles.inputContainer,
            input: {
              backgroundColor: Theme.Colors.grey200,
              color: Theme.Colors.grey800
            }
          }}
          label="email"
        ></InputField>

        <InputField
          key={2}
          value={formState.firstName?.value}
          textInputProps={{
            editable: true,
            onChangeText: onChangeInputHandler.bind(null, 'firstName')
          }}
          styles={{
            container: styles.inputContainer
          }}
          label="first Name"
        ></InputField>

        <InputField
          key={3}
          value={formState.lastName?.value}
          textInputProps={{
            editable: true,
            onChangeText: onChangeInputHandler.bind(null, 'lastName')
          }}
          styles={{
            container: styles.inputContainer
          }}
          label="last Name"
        ></InputField>

        <InputField
          key={4}
          value={formState.username?.value}
          textInputProps={{
            editable: true,
            onChangeText: onChangeInputHandler.bind(null, 'username')
          }}
          styles={{
            container: styles.inputContainer
          }}
          label="username"
        ></InputField>

        <ModalDatePicker
          getDate={onGetDateHandler}
          onCancel={onCancelHandler}
          state={modalVisible}
        ></ModalDatePicker>

        <InputField
          key={5}
          value={parseDate()}
          textInputProps={{
            editable: false,
            onPressIn: onPressInBirthdate,
            placeholder: 'Pick a date',
            placeholderTextColor: Theme.Colors.grey800
          }}
          label="birthdate"
          styles={{
            container: {
              marginBottom: 40,
              width: '100%'
            },
            input: {
              backgroundColor:
                formState.birthdate?.value === ''
                  ? Theme.Colors.primary100
                  : Theme.Colors.lightGrey!,
              color: Theme.Colors.grey900
            }
          }}
        ></InputField>

        <View style={styles.btnContainer}>
          <CustomBtn
            containerStyle={{ marginBottom: 20 }}
            name="save"
            onPress={onSaveProfileHandler}
          ></CustomBtn>

          <CustomBtn
            btnStyle={{ backgroundColor: Theme.Colors.red100 }}
            btnTextStyle={{ color: Theme.Colors.lightGrey }}
            name="cancel"
            onPress={onCancelProfileUpdateHandler}
          ></CustomBtn>
        </View>

        <View style={styles.dummy}></View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 40,
    width: '100%'
  },
  btnContainer: {
    marginTop: 10
  },
  avatarContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },

  list: {
    flex: 1,
    width: '80%'
  },
  dummy: {
    height: 100
  }
});

export default ProfileScreen;
