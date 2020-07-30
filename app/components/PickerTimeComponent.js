/**
 * desc：  时间选择组件
 * author：DestinyJun
 * date：  2020/7/28 15:52
 */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';

export function PickerTimeComponent(props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    if (!selectedDate) {
      return;
    }
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth()>9?selectedDate.getMonth()+1:`0${selectedDate.getMonth()+1}`;
    const day = selectedDate.getDate()>9?selectedDate.getDate():`0${selectedDate.getDate()}`;
    props.onSelectDate(`${year}.${month}.${day}`);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <Button
        buttonStyle={props.buttonStyle}
        title={props.title}
        titleStyle={props.titleStyle}
        onPress={showDatepicker}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
