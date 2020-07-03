/**
 * desc：  一岗双责清单制定
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {DoubleInventoryMakeStyles as styles} from "./DoubleInventoryMakeStyles";

export class DoubleInventoryMakeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.DoubleInventory}>
        <Text>一岗双责清单制定</Text>
      </View>
    );
  }
}
