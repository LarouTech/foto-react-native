import { useState } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { Theme } from '../../constant/colors';

interface CustomBtnProps {
  name: string;
  onPress: () => void;
  isDisbaled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  btnTextStyle?: StyleProp<TextStyle>;
}

function CustomBtn(props: CustomBtnProps): JSX.Element {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Pressable
        disabled={props.isDisbaled ? props.isDisbaled : false}
        onPress={props.onPress}
        android_ripple={{ color: Theme.Colors.primary500 }}
        style={({ pressed }) => {
          if (!pressed) {
            if (props.isDisbaled) {
              return [
                styles.notPressedDisbaled,
                props.btnStyle,
                { backgroundColor: Theme.Colors.grey }
              ];
            }
            return [styles.notPressed, props.btnStyle];
          }

          if (pressed && !props.isDisbaled) {
            return (
              pressed && [
                styles.pressed,
                props.btnStyle,
                { backgroundColor: Theme.Colors.grey }
              ]
            );
          }
        }}
      >
        <View style={[styles.inner]}>
          <Text
            style={[
              styles.text,
              props.btnTextStyle,
              props.isDisbaled ? styles.textDisbaled : null
            ]}
          >
            {props.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    width: '100%'
  },
  container: {
    width: '100%',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  textDisbaled: {
    opacity: 0.3
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: Theme.Colors.primary100,
    width: '100%',
    padding: 12,
    borderRadius: 50
  },
  notPressed: {
    backgroundColor: Theme.Colors.primary100,
    width: '100%',
    padding: 12,
    borderRadius: 50
  },
  notPressedDisbaled: {
    backgroundColor: Theme.Colors.grey,
    width: '100%',
    padding: 12,
    borderRadius: 50
  }
});

export default CustomBtn;
