import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Theme } from '../constant/colors';
import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CameraScreen from '../screens/CameraScreen';
import { FontAwesome } from '@expo/vector-icons';
import FotoScreen from '../screens/FotoScreen';
import * as ImagePicker from 'expo-image-picker';
import DummyScreen from '../screens/DummyScreen';
import { MediaLibraryService } from '../services/mediaLibraryService';

interface LobbyBottomNavigatorProps {}

const BottomTab = createBottomTabNavigator();

function LobbyBottomNavigator(this: any, props: LobbyBottomNavigatorProps) {
  const mediaLibraryService = new MediaLibraryService();
  const navigation = useNavigation();
  const [tabName, setTabName] = useState<string>('Foto');
  // const [image, setImage] = useState<Blob>(null!);
  const [fromTabScreen, setFromTabScreen] = useState<string>('Camera');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: tabName.charAt(0).toUpperCase() + tabName.slice(1)
    });
    return () => {};
  }, [navigation, tabName]);

  // const fetchResourceFromURI = async (uri: string) => {
  //   const response = await fetch(uri);
  //   console.log('res');
  //   const blob = await response.blob();
  //   return blob as Blob;
  // };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      // try {
      //   const blob = await fetchResourceFromURI(result.uri);
      //   setImage(blob);
      //   // await mediaLibraryService.uploadPicture(blob);
      // } catch (error: any) {
      //   console.log(error['message']);
      // }
    }

    if (result.cancelled) {
      navigation.navigate(fromTabScreen as never);
    }
  };

  const onPressCameraTab = (name: string) => {
    setFromTabScreen('Camera');
    setTabName(name);
  };

  const onPressRollTab = (name: string) => {
    pickImage();
    setTabName(name);
  };

  const onPressFotoTab = (name: string) => {
    setFromTabScreen('Foto');
    setTabName(name);
  };

  const setColor = (index: number) => {
    if (
      !navigation.getState().routes[index].state &&
      navigation.getState().routes[0].name === 'LobbyScreens'
    ) {
      return Theme.Colors.primary100;
    }

    return navigation.getState().routes[index].state?.index === 0
      ? Theme.Colors.primary100
      : Theme.Colors.lightGrey;
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Theme.Colors.grey600,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: Theme.Colors.primary100
      }}
    >
      <BottomTab.Screen
        listeners={{ tabPress: onPressFotoTab.bind(this, 'Foto') }}
        name="Foto"
        component={FotoScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="menu" size={28} color={setColor(0)}></Ionicons>
          ),
          tabBarLabel: 'Foto'
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Camera"
        component={CameraScreen}
        listeners={{ tabPress: onPressCameraTab.bind(this, 'camera') }}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="camera"
              size={28}
              color={
                navigation.getState().routes[0].state?.index === 1
                  ? Theme.Colors.primary100
                  : Theme.Colors.lightGrey
              }
            ></Ionicons>
          ),
          tabBarLabel: 'Camera'
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="CameraRoll"
        component={DummyScreen}
        listeners={{ tabPress: onPressRollTab.bind(this, 'Camera Roll') }}
        options={{
          tabBarIcon: () => (
            <FontAwesome
              name="picture-o"
              size={28}
              color={Theme.Colors.lightGrey}
            ></FontAwesome>
          ),
          tabBarLabel: 'Camera Roll',
          tabBarActiveTintColor: Theme.Colors.lightGrey
        }}
      ></BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

export default LobbyBottomNavigator;
