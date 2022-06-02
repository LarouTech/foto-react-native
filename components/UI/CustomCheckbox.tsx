import Checkbox, { CheckboxProps } from 'expo-checkbox';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../constant/colors';

interface CustomCheckboxProps {
  state: boolean;
  onChecked: (newState: boolean) => void;
  text?: string;
  checkboxProps?: CheckboxProps;
}

function CustomCheckbox(props: CustomCheckboxProps): JSX.Element {
  const onCheckedHandler = () => {
    props.onChecked(!props.state);
  };
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={props.state}
          onValueChange={onCheckedHandler}
          color={Theme.Colors.primary100}
          style={{ flex: 1 }}
        />
      </View>
      <Text onPress={onCheckedHandler} style={styles.text}>
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 30,
    flexDirection: 'row'
  },
  checkboxContainer: {
    backgroundColor: Theme.Colors.lightGrey,
    marginRight: 16
  },
  text: {
    color: Theme.Colors.lightGrey
  }
});

export default CustomCheckbox;
