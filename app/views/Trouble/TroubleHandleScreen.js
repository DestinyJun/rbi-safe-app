/**
 * desc：  隐患排查处理
 * author：DestinyJun
 * date：  2020/7/3 11:09
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {TroubleHandleStyles as styles} from "./TroubleHandleStyles";

export class TroubleHandleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.TroubleHandle}>
        <Text>隐患排查处理</Text>
      </View>
    );
  }
}

