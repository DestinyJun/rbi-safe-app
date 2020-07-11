/**
 * desc：  全屏加载组件
 * author：DestinyJun
 * date：  2020/7/10 20:54
 */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-translucent-modal';

export function FullScreenLoading(props) {
  const [modalShow, setModalShow] = useState(true);
  return (
   <Modal visible={modalShow}  onRequestClose={() => {
     console.log(123);
   }}>
      <View style={styles.container}>
         <Text>刚刚</Text>
      </View>
   </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
});
