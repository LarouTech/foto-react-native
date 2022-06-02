import { Platform, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerResult
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Theme } from '../../constant/colors';
import { lastValueFrom, map, of, tap } from 'rxjs';

interface DatePickerProps {
  isPickerShow: boolean;
  onChangeDate: (value: Date) => void;
}

function DatePicker(props: DatePickerProps) {
  const [isPickerShow, setIsPickerShow] = useState(false);

  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);

  const [date, setDate] = useState(today);

  const onChange = (event: Event | any, value: Date | any) => {
    setDate(value);

    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }

    props.onChangeDate(value);
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        is24Hour={true}
        value={date}
        mode={'date'}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.Colors.lightGrey,
    tintColor: Theme.Colors.lightGrey,
    borderRadius: 10,
    marginBottom: 30
  }
});

export default DatePicker;
