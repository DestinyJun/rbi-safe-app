/**
 * desc：  字体图标使用案例
 * author：DestinyJun
 * date：  2020/6/25 15:26
 */
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export function IconScreen(props) {
  return (
    <View>
      <Icon name={'music'} color={'red'} size={30}/>
    </View>
  );
}
