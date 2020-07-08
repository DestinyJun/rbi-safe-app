import React, {Component} from 'react';
import {ImageBackground, Text, TouchableOpacity, View,} from 'react-native';
import {LoginStyles as styles} from './LoginStyles';
// reducer
import {Store} from "../../redux/store";
import {isLoading} from "../../redux/actions";
import {ISLOADING} from "../../redux/actionTypes";
// 常量
import {IMAGE_FILE_LIST} from "../../util/Constant";
import {Button, Icon, Input} from "react-native-elements";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return (
      <View style={[styles.login, c_styles.w_100, c_styles.dim_height]}>
        <ImageBackground style={[styles.imageBgc]} source={IMAGE_FILE_LIST} resizeMode={'cover'}>
          <View style={[styles.header]}>
            <Text style={[c_styles.h2,c_styles.mb_3]}>欢迎登陆</Text>
            <Text style={[c_styles.h4,]} allowFontScaling={true}>安全生产信息化平台</Text>
          </View>
          <View style={[styles.forms]}>
            <Input
              placeholder={'请输入账号'}
              placeholderTextColor={'#BCBCBC'}
              inputContainerStyle={{paddingBottom: 5,borderColor: '#DEDEDE'}}
              leftIcon={<Icon type={'ionicon'} name={'ios-person'} color={'#BCBCBC'} size={20} />}
              leftIconContainerStyle={{paddingRight: 10,paddingLeft: 4}}
            />
            <Input
              placeholder={'请输入密码'}
              secureTextEntry={true}
              placeholderTextColor={'#BCBCBC'}
              inputContainerStyle={{paddingBottom: 5,borderColor: '#DEDEDE'}}
              leftIcon={<Icon type={'material'} name={'lock'} color={'#BCBCBC'} size={20} />}
              leftIconContainerStyle={{paddingRight: 10}}
              rightIcon={<Icon type={'ionicon'} name={'ios-eye-off'} color={'#BCBCBC'} size={20} />}
            />
          </View>
          <View style={[styles.button]}>
            <Button
              onPress={this.login.bind(this)}
              buttonStyle={{backgroundColor: '#337DF1',borderRadius: 30,paddingTop: 15,paddingBottom: 15}}
              title="登录"/>
          </View>
        </ImageBackground>
      </View>
    );
  }
  login() {
    Store.dispatch(isLoading({type: ISLOADING, isLoading: true}))
  }
}


