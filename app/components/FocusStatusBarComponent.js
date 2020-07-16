/**
 * desc：  根据屏幕焦点显示不同的状态栏
 * author：DestinyJun
 * date：  2020/7/1 11:42
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export function FocusStatusBarComponent(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}
FocusStatusBarComponent.defaultProps = {
  barStyle: 'light-content',
  backgroundColor: '#6a51ae'
};
