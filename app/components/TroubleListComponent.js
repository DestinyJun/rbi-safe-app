/**
 * desc：  隐患排查分类列表组件
 * author：DestinyJun
 * date：  2020/7/20 0:15
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export function TroubleListComponent(props) {
  return (
    <TouchableOpacity>
      <View style={[styles.container]}>
        <View style={[styles.top]}>
          <View style={[styles.topFlag]}>
            <Text>待处理</Text>
            <Text>下发</Text>
          </View>
          <View style={[styles.topTitle]}>
            <Text>TroubleListComponent</Text>
          </View>
          <View style={[styles.topDate]}>

          </View>
        </View>
        <View style={[styles.bottom]}>

        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  top: {

  },
  topFlag: {},
  topTitle: {},
  topDate: {},
  bottom: {

  },
});
