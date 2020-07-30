/**
 * desc：  列表选择器组件
 * author：DestinyJun
 * date：  2020/7/27 20:49
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Modal, TouchableWithoutFeedback, FlatList} from 'react-native';
import {Button} from "react-native-elements";
const {width, height} = Dimensions.get('window');
import Picker from 'react-native-picker';
export function PickerListComponent(props) {
  // console.log(props);
  const [isVisible, setIsVisible] = useState(false);
  Picker.init({
    pickerData: props.pickerData.map((item) => (item.settingName)), // 需要选择的数据列表
    selectedValue: [''], // 默认选中的值
    pickerConfirmBtnText: '确定', // 确定按钮文字
    pickerCancelBtnText: '取消',// 取消按钮文字
    pickerTitleText: '请选择负责人',// 中间标题文字
    pickerConfirmBtnColor: [255,255,255,1],// 确定按钮文字颜色
    pickerCancelBtnColor: [255,255,255,1],// 取消按钮文字颜色
    pickerTitleColor: [255,255,255,1],// 中间标题文字颜色
    pickerToolBarBg: [34,106,213,1], // 标题栏背景颜色
    pickerBg: [255,255,255], // 选择栏背景颜色
    pickerToolBarFontSize: 16, // 标题栏文字大小，默认16
    pickerFontSize: 16,// 选择项文字大小设置，默认16
    pickerFontColor: [34,106,213,1],// 选择项文字选中时的颜色。默认黑色
    onPickerConfirm: data => {
      console.log(data);
    },
    onPickerCancel: data => {
      // console.log(data);
    },
    onPickerSelect: data => {
      // console.log(data);
    }
  });
  return (
    <View>
      <Button
        buttonStyle={props.buttonStyle}
        title={'点击选择'}
        titleStyle={props.titleStyle} onPress={() => {
        Picker.show();
        // Picker.select();
        // setIsVisible(true)
      }}/>
    {/*  <Modal
        animationType={"slide"}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}>
        弹窗容器
        <View style={styles.container}>
          START 遮罩层
          <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
            <View  style={styles.maskLayer}/>
          </TouchableWithoutFeedback>
          END 遮罩层
          <View style={styles.content}>
            <View style={styles.buttons}>
              <Button title={'取消'} />
              <Button title={'确定'} />
            </View>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </Modal>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'relative'
  },
  maskLayer: {
    position:'absolute',
    width,
    height,
    top:0,
    left:0,
    backgroundColor:'rgba(0,0,0,0.1)'
  },
  content: {
    position: 'absolute',
    height: '30%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    bottom: 0
  },
  buttons: {

  }
});
