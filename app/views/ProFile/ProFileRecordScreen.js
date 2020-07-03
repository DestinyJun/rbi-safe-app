/**
 * desc：  我的隐患排查记录
 * author：DestinyJun
 * date：  2020/7/3 17:47
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ProFileRecordStyles as styles} from "./ProFileRecordStyles";

export class ProFileRecordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Record}>
        <Text>我的隐患排查记录</Text>
      </View>
    );
  }
}

