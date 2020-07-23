/**
 * desc：  带有输入的小卡片一
 * author：DestinyJun
 * date：  2020/7/23 10:15
 */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export function CardInputComponent(props) {
  const [number,setNumber] = useState(props.number);
  return (
    <View style={[styles.container]}>
      <View style={[styles.left]}>
        <Text style={[{fontSize: 16, color: '#478DFF', fontWeight: 'bold'}]}>{props.index > 9?props.index:`0${props.index + 1}`}</Text>
      </View>
      <View style={[styles.right]}>
        <View style={[styles.rightTop]}>
          <Text style={[c_styles.h6, {color: '#6C6C6C'}]}>{props.title}</Text>
        </View>
        <View style={[styles.rightBottom]}>
          <View style={{flex: 5}}>
            <Text style={[c_styles.h6, {color: '#67A1FF'}]}>自评</Text>
          </View>
          <View style={{flex: 3}}>
            <TextInput placeholder={'请输入分数'} style={[c_styles.h6, {textAlign: 'right', color: '#6D6D6D'}]} onChangeText={(text => setNumber(text))} value={number}/>
          </View>
        </View>
      </View>
    </View>
  );
}

CardInputComponent.defaultProps = {
  title: '',
  number: '',
  index: 0
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 10
  },
  left: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    flex: 8,
    paddingRight: 10,
  },
  rightTop: {
    borderBottomColor: '#FBFBFB',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  rightBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  }
});
