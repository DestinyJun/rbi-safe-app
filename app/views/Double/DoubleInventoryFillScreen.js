/**
 * desc：  一岗双责清单填写
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {DoubleInventoryFillStyles as styles} from "./DoubleInventoryFillStyles";

export class DoubleInventoryFillScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.InventoryFill}>
        <Text>一岗双责清单填写</Text>
      </View>
    );
  }
}
