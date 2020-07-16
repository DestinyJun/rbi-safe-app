/**
 * desc：  全屏加载组件
 * author：DestinyJun
 * date：  2020/7/10 20:54
 */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
// import Modal from 'react-native-translucent-modal';
import {Store} from "../redux/store";

export function FullScreenLoadingComponent() {
  const [modalShow, setModalShow] = useState(Store.getState().isLoading);
  useEffect(() => {
    const subscription = Store.subscribe(() => {
      setModalShow(Store.getState().isLoading)
    });
    return () => {
      subscription();
    }
  });
  return (
    <Modal
      visible={modalShow}
      transparent={true}
      onRequestClose={() => {
        setModalShow(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="#fff" />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(51,51,51,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10
  }
});
