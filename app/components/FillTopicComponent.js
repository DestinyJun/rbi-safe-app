/**
 * desc：  填空题组件
 * author：DestinyJun
 * date：  2020/7/16 16:15
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input} from "react-native-elements";
export function FillTopicComponent(props) {
  let arr = ['01','02'];
  return (
    <View style={[styles.container,c_styles.p_4]}>
      <View style={styles.title}>
        <View style={[styles.titleTag]}>
          <Text style={[styles.titleTagText,c_styles.h5,c_styles.text_white]}>填空</Text>
        </View>
        <View style={[styles.titleContent,c_styles.pl_3]} >
          <Text style={[c_styles.h6]}>
            02.题目名称 题目名称 题目名称_01_ 题目名称 题目名称_02_题目名称
          </Text>
        </View>
      </View>
      <View style={[styles.choose]}>
        {
          arr.map((item,index) => (
            <Input
              key={`fill${index}`}
              placeholder={`请输入${arr[index]}答案`}
              placeholderTextColor={'#C9C9C9'}
              inputContainerStyle={{borderColor: '#F5F5F5'}}
            />
          ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  title: {
    flexDirection: 'row'
  },
  titleTag: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTagText: {
    backgroundColor: '#FB6955',
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleContent: {
    flex: 5,
  },
  choose:{}
});
