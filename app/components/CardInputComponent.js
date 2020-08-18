/**
 * desc：  带有输入的小卡片一
 * author：DestinyJun
 * date：  2020/7/23 10:15
 */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export function CardInputComponent(props) {
  // 自评内容
  const [selfEvaluation,setSelfEvaluation] = useState(props.selfEvaluation?props.selfEvaluation: '请输入自评内容');
  // 自评分数
  const [selfFraction,setSelfFraction] = useState(props.selfFraction?props.selfFraction: '请输入自评分数');
  // 检查内容
  const [checkEvaluation,setCheckEvaluation] = useState(props.checkEvaluation?props.checkEvaluation: '检查内容');
  // 检查分数
  const [checkNumber,setCheckNumber] = useState(props.checkNumber?props.checkNumber: '检查分数');
  return (
    <View style={[styles.container]}>
      <View style={[styles.left]}>
        <Text style={[{fontSize: 16, color: '#478DFF', fontWeight: 'bold'}]}>{props.index > 9?props.index:`0${props.index + 1}`}</Text>
      </View>
      <View style={[styles.right]}>
        <View style={[styles.rightTop]}>
          <Text style={[c_styles.h6, {color: '#6C6C6C'}]}>{`（${props.fraction}分） ${props.content}`}</Text>
        </View>
        <View style={[styles.rightBottom]}>
          {/*自评内容*/}
          <View style={{flex: 5,flexDirection: 'row',alignItems: 'center'}}>
            <Text style={[c_styles.h6, {color: '#67A1FF'}]}>自评： </Text>
            <TextInput editable={props.type === '1'}  placeholder={selfEvaluation} style={[c_styles.h6, {textAlign: 'left', color: '#6D6D6D'}]} onChangeText={(text => {
              props.onChangeSelfEvaluation(text);
            })} />
          </View>
          {/*自评分数*/}
          <View style={{flex: 5}}>
            <TextInput editable={props.type === '1'} placeholder={selfFraction.toString()} style={[c_styles.h6, {textAlign: 'right', color: '#6D6D6D'}]} onChangeText={(text => {
              props.onChangeSelfFraction(text);
            })} />
          </View>
        </View>
        {
          props.type === '4' && <View style={[styles.rightBottom]}>
            {/*检查内容*/}
            <View style={{flex: 5,flexDirection: 'row',alignItems: 'center'}}>
              <Text style={[c_styles.h6, {color: '#67A1FF'}]}>检查内容： </Text>
              <TextInput placeholder={checkEvaluation} style={[c_styles.h6, {textAlign: 'left', color: '#6D6D6D'}]} onChangeText={(text => {
                props.onChangeSelfEvaluation(text);
              })} />
            </View>
            {/*检查分数*/}
            <View style={{flex: 5}}>
              <TextInput placeholder={checkNumber.toString()} style={[c_styles.h6, {textAlign: 'right', color: '#6D6D6D'}]} onChangeText={(text => {
                props.onChangeSelfFraction(text);
              })} />
            </View>
          </View>
        }
        {
          props.type === '3' && <View style={[styles.rightBottom]}>
            {/*检查内容*/}
            <View style={{flex: 5,flexDirection: 'row',alignItems: 'center'}}>
              <Text style={[c_styles.h6, {color: '#67A1FF'}]}>检查内容： </Text>
              <TextInput editable={false} placeholder={props.checkResult} style={[c_styles.h6, {textAlign: 'left', color: '#6D6D6D'}]}/>
            </View>
            {/*检查分数*/}
            <View style={{flex: 5}}>
              <TextInput editable={false} placeholder={props.checkFraction.toString()} style={[c_styles.h6, {textAlign: 'right', color: '#6D6D6D'}]}/>
            </View>
          </View>
        }
      </View>
    </View>
  );
}
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
