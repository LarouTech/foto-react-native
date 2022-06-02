import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';

export enum TranslationAxis {
  'X_AXIS' = 'X_AXIS',
  'Y_AXIS' = 'Y_AXIS'
}

interface TranslateProps {
  startingValue?: number;
  toValue?: number;
  duration?: number;
  axis?: TranslationAxis;
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element;
}

function Translate(props: TranslateProps) {
  const translatAnim = useRef(
    new Animated.Value(props.startingValue || 0)
  ).current; // Initial value for opacity: 0
  let axis: TranslationAxis;

  useEffect(() => {
    Animated.timing(translatAnim, {
      toValue: props.toValue || 100,
      duration: props.duration || 1000,
      easing: (number) => number * 2,
      useNativeDriver: true
    }).start();
  }, [translatAnim]);

  if (!props.axis) {
    axis = TranslationAxis.X_AXIS;
  } else {
    axis = props.axis;
  }

  return (
    <Animated.View // Special animatable View
      style={[
        styles.container,
        props.style,
        {
          transform: [
            axis === TranslationAxis.Y_AXIS
              ? { translateY: translatAnim }
              : { translateX: translatAnim }
          ]
        }
      ]}
    >
      {props.children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
  }
});

export default Translate;
