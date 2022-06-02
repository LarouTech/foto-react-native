import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../../constant/colors';

interface ErrorInputFieldProps {
  state: boolean;
  children: string;
}

function ErrorInputField(props: ErrorInputFieldProps) {
  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '80%'
      }}
    >
      <Text
        style={[
          {
            width: '100%',
            paddingVertical: 10,
            paddingLeft: 5,
            color: Theme.Colors.red100,
            fontSize: 14,
            fontWeight: 'bold',
            letterSpacing: 0
          },
          !props.state ? { marginBottom: 20 } : null
        ]}
      >
        {props.children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ErrorInputField;
