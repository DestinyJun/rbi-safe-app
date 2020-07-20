/**
 * desc：  隐患排查分类列表组件
 * author：DestinyJun
 * date：  2020/7/20 0:15
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export function TroubleListComponent(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.container]}>
        <View style={[styles.top]}>
          <View style={[styles.topFlag]}>
            {props.pendingFlag?<Text style={[styles.flag,{backgroundColor: '#3B86FF',}]}>待处理</Text>:null}
            {props.issuedFlag?<Text style={[styles.flag,{backgroundColor: '#3BBCFF',}]}>下发</Text>:null}
            {props.verifyFlag?<Text style={[styles.flag,{backgroundColor: '#85B4FF',}]}>待审核</Text>:null}
          </View>
          <View style={[styles.topTitle]}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[c_styles.h5,c_styles.text_dark]}>
              {props.title}
            </Text>
          </View>
          <View style={[styles.topDate]}>
            <Text style={[{color: '#AEAEAE'}]}>{props.rightTitle}</Text>
          </View>
        </View>
        <View style={[styles.bottom]}>
          <Text style={[{color: '#8C8C8C'}]}>
            {props.subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
TroubleListComponent.defaultProps = {
  pendingFlag: false,
  issuedFlag: false,
  verifyFlag: false,
  title: '我是标题',
  rightTitle: '我是右边标题',
  subtitle: '我是副标题',
  onPress: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  topFlag: {
    flexDirection: 'row',
    minWidth: 0,
  },
  topTitle: {
    flex: 1,
    justifyContent: 'center'
  },
  topDate: {
    minWidth: 20,
    justifyContent: 'center',
    marginLeft: 5
  },
  bottom: {
    paddingTop: 20,
  },
  // 公共样式
  flag: {
    fontSize: 12,
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    color: '#fff',
    marginRight: 3
  }
});
