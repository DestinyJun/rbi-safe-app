/**
 * desc：  个人信息详情
 * author：DestinyJun
 * date：  2020/7/3 17:59
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ProFileInfoStyles as styles} from "./ProFileInfoStyles";

export class ProFileInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Info}>
        <Text>个人信息详情</Text>
      </View>
    );
  }
}
