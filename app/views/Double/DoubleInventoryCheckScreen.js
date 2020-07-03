/**
 * desc：  一岗双责清单制定
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {DoubleInventoryCheckStyles as styles} from "./DoubleInventoryCheckStyles";

export class DoubleInventoryCheckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.InventoryCheck}>
        <Text>一岗双责清单检查</Text>
      </View>
    );
  }
}
