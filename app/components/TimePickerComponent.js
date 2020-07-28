/**
 * desc：  时间选择组件
 * author：DestinyJun
 * date：  2020/7/28 15:52
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';

export function TimePickerComponent(props) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View>
      <Button
        buttonStyle={props.buttonStyle}
        title={'点击选择'}
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
