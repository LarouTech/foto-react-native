import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';

interface FadinViewProps {
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element;
}

function FadeIn(props: FadinViewProps) {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1250,
      useNativeDriver: true
    }).start();
  }, [fadeIn]);

  return (
    <Animated.View
      style={[
        props.style,
        {
          opacity: fadeIn
        }
      ]}
    >
      {props.children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({});

export default FadeIn;
