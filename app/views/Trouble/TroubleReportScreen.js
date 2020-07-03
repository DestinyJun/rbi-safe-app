/**
 * desc：  上报整改
 * author：DestinyJun
 * date：  2020/7/3 11:03
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {TroubleReportStyles as styles} from "./TroubleReportStyles";

export class TroubleReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.TroubleReport}>
        <Text>上报整改</Text>
      </View>
    );
  }
}

