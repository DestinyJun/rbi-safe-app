/**
 * desc：  列表选择器组件
 * author：DestinyJun
 * date：  2020/7/27 20:49
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Modal, TouchableWithoutFeedback} from 'react-native';
import {Button} from "react-native-elements";
const {width, height} = Dimensions.get('window');
export function PickerComponent(props) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View>
      <Button
        buttonStyle={props.buttonStyle}
        title={'点击选择'}
        titleStyle={props.titleStyle} onPress={() => {
        setIsVisible(true)
      }}/>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}>
        {/*弹窗容器*/}
        <View style={styles.container}>
          {/*START 遮罩层*/}
          <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
            <View  style={styles.maskLayer}/>
          </TouchableWithoutFeedback>
          {/*END 遮罩层*/}
          <View style={styles.content}>
            <Text>Hello from Overlay!</Text>
          </View>
        </View>
      </Modal>
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
    backgroundColor: 'red',
    bottom: 0
  }
});
