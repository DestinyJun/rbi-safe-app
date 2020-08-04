/**
 * desc：  列表选择器组件
 * author：DestinyJun
 * date：  2020/7/27 20:49
 */
import React, {useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Picker} from "@react-native-community/picker";
export function PickerListComponent(props) {
  const [value,setValue]=useState('点击选择');
  return (
    <View>
      <Picker
        style={{width:200, height:50}}
        selectedValue={value}
        onValueChange={(lang) => {
          setValue(lang);
          props.onSelectData(lang);
        }}>
        <Picker.Item label="点击选择" value="0" />
        {
          props.pickerData.map((item,index) => (
            <Picker.Item key={index} label={item.settingName} value={item.settingCode} />
          ))
        }
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({});
