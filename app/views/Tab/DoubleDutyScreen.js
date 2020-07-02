/**
 * desc：  一岗双责
 * author：DestinyJun
 * date：  2020/6/17 17:37
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {DoubleDutyStyles as styles} from "./DoubleDutyStyles";
import {TabHeader} from "../../components/TabHeader";

export class DoubleDutyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.DoubleDuty}>
        <TabHeader />
        <Text>DoubleDuty</Text>
      </View>
    );
  }
}
