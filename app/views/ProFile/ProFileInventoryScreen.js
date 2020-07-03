/**
 * desc：  一岗双责检查清单
 * author：DestinyJun
 * date：  2020/7/3 17:56
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ProFileInventoryStyles as styles} from "./ProFileInventoryStyles";

export class ProFileInventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Inventory}>
        <Text>一岗双责检查清单</Text>
      </View>
    );
  }
}

