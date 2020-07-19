/**
 * desc：  listItem组件的副标题内容自定义组件
 * author：DestinyJun
 * date：  2020/7/19 19:40
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from "react-native-elements";

export function ListItemSubtitleComponent(props) {
  return (
    <View style={[styles.container]}>
      <View>
        <Text style={{color: '#C5C5C5'}}>{props.text}</Text>
      </View>
      <View style={[styles.right]}>
        <Text style={{color:'#3A86FF', fontSize: 16}}>继续学习</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: 20
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginLeft: 20
  }
});
