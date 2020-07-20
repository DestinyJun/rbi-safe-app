/**
 * desc：  ListItem组件title属性重写组件
 * author：DestinyJun
 * date：  2020/7/20 14:10
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function ListItemTitleComponent(props) {
  return (
    <View style={[styles.container]}>
      <Text style={[{
        backgroundColor: '#3C87FF',borderRadius: 15,fontSize: 14},
        c_styles.text_light,c_styles.pl_1,c_styles.pr_1,c_styles.mr_1]}>待审核</Text>
      <Text style={[c_styles.h5,c_styles.text_dark]}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
