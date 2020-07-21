/**
 * desc：  头部返回提醒组件
 * author：DestinyJun
 * date：  2020/7/21 11:47
 */
import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {useBackHandler} from "@react-native-community/hooks";
import {HeaderLeftComponent} from "./HeaderLeftComponent";

export function HeaderLeftBackComponent(props) {
  const headerLeftOnPress = () => {
    Alert.alert(
      props.title,props.message,
      [
        {
          text: '取消',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: () => {props.navigation.goBack();}
        }
      ]);
  };
  useBackHandler(() => {
    headerLeftOnPress();
    return true;
  });
  return(
    <HeaderLeftComponent headerLeftOnPress={headerLeftOnPress} />
  )
}
HeaderLeftBackComponent.defaultProps = {
  title: '',
  message: '',
};

const styles = StyleSheet.create({});
