/**
 * desc：  立即整改
 * author：DestinyJun
 * date：  2020/7/2 21:26
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TroubleShootStyles as styles} from "../Tab/TroubleShootStyles";

export class TroubleShortlyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.TroubleShoot}>
        <Text>立即整改</Text>
      </View>
    );
  }
}
