/**
 * desc：  账号与安全
 * author：DestinyJun
 * date：  2020/7/3 21:44
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ProFileSafeStyles as styles} from "./ProFileSafeStyles";

export class ProFileSafeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Safe}>
        <Text>账号与安全</Text>
      </View>
    );
  }
}
