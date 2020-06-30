import React, {Component} from 'react';
import {Text, TouchableOpacity, View,} from 'react-native';
import {LoginStyles as styles} from './LoginStyles';
import {Store} from "../../redux/store";
import {isLoading} from "../../redux/actions";
import {ISLOADING} from "../../redux/actionTypes";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.login, c_styles.w_100, c_styles.dim_height]}>
        <Text>我是登陆</Text>
        <TouchableOpacity onPress={this.login}>
          <Text>点击登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
  login = () => {
    Store.dispatch(isLoading({type: ISLOADING, isLoading: true}))
  }
}


