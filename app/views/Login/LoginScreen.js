import React, {Component} from 'react';
import {ImageBackground, Text, TouchableOpacity, View,} from 'react-native';
import {LoginStyles as styles} from './LoginStyles';
// reducer
import {Store} from "../../redux/store";
import {isLoading} from "../../redux/actions";
import {ISLOADING} from "../../redux/actionTypes";
// 常量
import {IMAGE_FILE_LIST} from "../../util/Constant";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.login, c_styles.w_100, c_styles.dim_height]}>
        <ImageBackground style={[styles.imageBgc]} source={IMAGE_FILE_LIST}>
          <View style={[styles.header]}>
            <Text>欢迎登陆</Text>
          </View>
          <View style={[styles.forms]}>

          </View>
          <View style={[styles.button]}>
            <TouchableOpacity onPress={this.login}>
              <Text>点击登录</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
  login = () => {
    Store.dispatch(isLoading({type: ISLOADING, isLoading: true}))
  }
}


