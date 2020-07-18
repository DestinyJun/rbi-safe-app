/**
 * desc：  一岗双责
 * author：DestinyJun
 * date：  2020/6/17 17:37
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DoubleDutyStyles as styles} from "./DoubleDutyStyles";
import {Button, Header, Icon} from "react-native-elements";

export class DoubleDutyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.DoubleDuty}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{backgroundColor: '#226AD5', justifyContent: 'space-around',}}
          centerComponent={{ text: '一岗双责', style: { color: '#fff', fontSize: 18 } }}
        />
        <View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('DoubleInventoryMakeScreen')}}>
            <Icon name={'add'} size={18} />
            <Text>责任清单制定</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('DoubleInventoryFillScreen')}}>
            <Text>责任清单填写定</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('DoubleInventoryCheckScreen')}}>
            <Text>责任清单填检查</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
