import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import { Theme } from '../../constant/colors';
import FadinView from '../animation/Translate';

interface ScreenContainerProps {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

function ScreenContainer(props: ScreenContainerProps): JSX.Element {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, props.style]}
    >
      <LinearGradient
        style={styles.background}
        colors={[Theme.Colors.grey900, Theme.Colors.grey600]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.inner]}>{props.children}</View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.primary500,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  inner: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ScreenContainer;
