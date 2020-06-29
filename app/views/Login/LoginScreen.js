import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';
import {LoginStyles as styles} from './LoginStyles';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  render() {
    return (
      <View style={[styles.login, c_styles.w_100, c_styles.dim_height]}>
        <Text>我是登陆</Text>
      </View>
    );
  }
  componentDidMount(){}
  componentWillUnmount(){}
}


