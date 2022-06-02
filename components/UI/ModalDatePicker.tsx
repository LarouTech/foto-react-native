import { Modal, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constant/colors';
import DatePicker from './DatePicker';
import CustomBtn from './CustomBtn';
import { useRef, useState } from 'react';

interface ModalDatePickerProps {
  state: boolean;
  onCancel: () => void;
  getDate: (value: Date) => void;
}

function ModalDatePicker(props: ModalDatePickerProps) {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  const [date, setDate] = useState<Date>(today);

  const onCancelHanlder = () => {
    props.onCancel();
  };

  const onChangeSateHanlder = (value: Date) => {
    setDate(value);
  };

  const onSaveDateHandler = () => {
    props.getDate(date);
  };

  return (
    <Modal animationType="slide" style={styles.modal} visible={props.state}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            style={{ marginBottom: 20 }}
            name="party-popper"
            size={72}
            color={Theme.Colors.lightGrey}
          />
          <Text style={styles.birthdate}>birthdate</Text>
        </View>

        <DatePicker
          onChangeDate={onChangeSateHanlder}
          isPickerShow={true}
        ></DatePicker>

        <CustomBtn
          containerStyle={{ marginBottom: 20 }}
          name="select date"
          onPress={onSaveDateHandler}
        ></CustomBtn>

        <CustomBtn
          btnStyle={{ backgroundColor: Theme.Colors.red100 }}
          btnTextStyle={{ color: Theme.Colors.lightGrey }}
          name="cancel"
          onPress={onCancelHanlder}
        ></CustomBtn>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  birthdate: {
    color: Theme.Colors.lightGrey,
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 30,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  modalContainer: {
    paddingVertical: 145,
    paddingHorizontal: 20,
    backgroundColor: Theme.Colors.grey800
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Colors.grey800
  }
});

export default ModalDatePicker;
