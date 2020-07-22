/**
 * desc：  CheckBoxes列表组
 * author：DestinyJun
 * date：  2020/7/21 16:17
 */
import React, {useEffect, useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {CheckBox} from "react-native-elements";

export function CheckBoxGroupsComponent(props) {
  let arr = props.options.map(() =>false);
  const [checked,setChecked] = useState(arr);
  const checkOnPress = (index) => {
    arr = props.options.map(() =>false);
    arr[index] = true;
    setChecked(arr);
  };
  return (
    <View style={[styles.container]}>
      {
        checked.map((item,index) => (
          <CheckBox
            key={`checkBox${index}`}
            title={props.options[index]}
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
CheckBoxGroupsComponent.defaultProps = {
  options: ['人','物','管理'],
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
