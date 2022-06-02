import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../constant/colors';
import { useEffect, useRef } from 'react';

interface FotoLogoProps {
  icon?: any;
  containerStyle?: StyleProp<ViewStyle>;
  text?: string;
}

function FotoLogo(props: FotoLogoProps) {
  const defaultIcon = 'ios-camera-sharp';
  const defaultText = 'FOTO';
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Ionicons
        name={props.icon ? props.icon : defaultIcon}
        size={150}
        color={Theme.Colors.primary100}
      ></Ionicons>

      <View>
        <Text style={styles.title}>
          {props.text ? props.text.toUpperCase() : defaultText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
    marginBottom: 20
  },
  title: {
    color: Theme.Colors.lightGrey,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 12
    // paddingLeft: 12
  }
});

export default FotoLogo;
