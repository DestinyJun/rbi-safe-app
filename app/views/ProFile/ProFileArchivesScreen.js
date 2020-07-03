/**
 * desc：  我的培训档案
 * author：DestinyJun
 * date：  2020/7/3 17:53
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ProFileArchivesStyles as styles} from "./ProFileArchivesStyles";


export class ProFileArchivesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Archives}>
        <Text>我的培训档案</Text>
      </View>
    );
  }
}
