/**
 * desc：  CheckBoxes列表组
 * author：DestinyJun
 * date：  2020/7/21 16:17
 */
import React, {useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {CheckBox} from "react-native-elements";

export function CheckBoxGroupsComponent(props) {
  let arr = [false,false,false];
  const arrAnswer = ['人','物','管理'];
  const [checked,setChecked] = useState(arr);
  const checkOnPress = (index) => {
    arr = [false,false,false];
    arr[index] = true;
    setChecked(arr);
  };
  return (
    <View style={[styles.container]}>
      {
        checked.map((item,index) => (
          <CheckBox
            key={`checkBox${index}`}
            title={arrAnswer[index]}
            titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
            size={20}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={checkOnPress.bind(this,index)}
            checked={item}
          />
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
