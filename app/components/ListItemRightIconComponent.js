/**
 * desc：  ListItem组件rightIcon属性重写组件
 * author：DestinyJun
 * date：  2020/7/19 19:52
 */
import React from 'react';
import {View,StyleSheet} from 'react-native';
import {Icon} from "react-native-elements";

export function ListItemRightIconComponent(props) {
  return (
    <View style={styles.container}>
      <Icon type={'font-awesome'} name={'angle-right'} color ={'#3B86FF'} size={18} containerStyle={styles.icon}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  }
});
