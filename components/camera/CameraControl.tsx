import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constant/colors';

export enum IconType {
  'Ionicons' = 'Ionicon',
  'Fontisto' = 'Fontisto',
  'MaterialIcons' = 'MaterialIcons'
}

interface CameraControlProps {
  onPress: (state: boolean) => void;
  truthyIcon: any;
  falsyIcon: any;
  type: IconType;
  style?: StyleProp<TextStyle>;
}

function CameraControl(props: CameraControlProps) {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    props.onPress(false);

    return () => {};
  }, []);

  const onPressHandler = () => {
    if (state === true) {
      props.onPress(false);
      setState(false);
    } else {
      props.onPress(true);
      setState(true);
    }
  };

  const defineIcon = () => {
    switch (props.type) {
      case IconType.Ionicons:
        return (
          <Ionicons
            onPress={onPressHandler}
            size={22}
            color={Theme.Colors.primary100}
            name={state ? props.truthyIcon : props.falsyIcon}
            style={props.style}
          ></Ionicons>
        );

      case IconType.Fontisto:
        return (
          <Fontisto
            onPress={onPressHandler}
            size={22}
            color={Theme.Colors.primary100}
            name={state ? props.truthyIcon : props.falsyIcon}
            style={props.style}
          ></Fontisto>
        );
      case IconType.MaterialIcons:
        return (
          <MaterialIcons
            onPress={onPressHandler}
            size={20}
            color={Theme.Colors.primary100}
            name={state ? props.truthyIcon : props.falsyIcon}
            style={props.style}
          ></MaterialIcons>
        );
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  return defineIcon();
}

const styles = StyleSheet.create({});

export default CameraControl;
