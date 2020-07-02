/**
 * desc：  tab切换栏页面头部
 * author：DestinyJun
 * date：  2020/7/2 10:32
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Dimensions} from 'react-native';

export class TabHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.TabHeader}>
        <Text>TabHeader</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  TabHeader: {
    height: 50,
    backgroundColor: '#226AD5',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: Platform.OS === "web" ? '100%' : Dimensions.get('window').width,
  }
});
