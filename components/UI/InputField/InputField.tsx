import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { Theme } from '../../../constant/colors';
import ErrorInputField from './ErrorInputField';

interface InputFieldProps {
  styles?: {
    container?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    input?: StyleProp<TextStyle>;
  };
  textInputProps?: TextInputProps;
  label: string;
  value?: string;
  state?: boolean;
  errorMessage?: string;
}

function InputField(props: InputFieldProps): JSX.Element {
  return (
    <View
      style={[
        styles.container,
        props.styles?.container,
        props.state || props.state === undefined
          ? { marginBottom: 40 }
          : { marginBottom: 0 }
      ]}
    >
      <View>
        <Text style={[styles.label, props.styles?.label]}>{props.label}</Text>
      </View>
      <TextInput
        value={props.value}
        {...props.textInputProps}
        style={[styles.input, props.styles?.input]}
      ></TextInput>

      {!props.state && props.state != undefined ? (
        <ErrorInputField state={props.state}>
          {props.errorMessage!}
        </ErrorInputField>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%'
  },
  label: {
    color: Theme.Colors.lightGrey,
    marginBottom: 12,
    fontSize: 20,
    textTransform: 'capitalize',
    letterSpacing: 2,
    paddingLeft: 5
  },
  input: {
    color: Theme.Colors.primary500,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: Theme.Colors.lightGrey,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8
  }
});

export default InputField;
