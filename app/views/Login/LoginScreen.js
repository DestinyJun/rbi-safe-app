import React, {Component} from 'react';
import {ImageBackground, Text, View, Keyboard, KeyboardAvoidingView, Platform, Alert, StatusBar} from 'react-native';
import {LoginStyles as styles} from './LoginStyles';
import AsyncStorage from '@react-native-community/async-storage';
// reducer
import {Store} from "../../redux/store";
import {isLoading, isLogin} from "../../redux/actions";
import {ISLOADING, ISLOGIN} from "../../redux/actionTypes";
// 常量
import {IMAGE_FILE_LIST} from "../../util/Constant";
import {Button, Icon, Input} from "react-native-elements";
import {post} from "../../service/Interceptor";
import {Api} from "../../service/Api";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.myUsernameRef = React.createRef();
    this.myPasswordRef = React.createRef();
    this.state = {
      showPassword: false,
      username: null,
      password: null,
    };
  }

  render() {
    return (
      <View style={[styles.login, c_styles.w_100, c_styles.dim_height]}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
          <ImageBackground style={[styles.imageBgc]} source={IMAGE_FILE_LIST} resizeMode={'cover'}>
            <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
            <View style={[styles.header]}>
              <Text style={[c_styles.h2, c_styles.mb_3]}>
                欢迎登陆
              </Text>
              <Text style={[c_styles.h4,]} allowFontScaling={true}>安全生产信息化平台</Text>
            </View>
            <View style={[styles.forms]}>
              <Input
                ref={this.myUsernameRef}
                keyboardType={'email-address'}
                placeholder={'请输入账号'}
                placeholderTextColor={'#BCBCBC'}
                onChangeText={(text) => {
                  this.setState({username: text});
                }}
                inputContainerStyle={{paddingBottom: 5, borderColor: '#DEDEDE'}}
                leftIcon={<Icon type={'ionicon'} name={'ios-person'} color={'#BCBCBC'} size={20}/>}
                leftIconContainerStyle={{paddingRight: 10, paddingLeft: 4}}
                rightIcon={this.state.username ?
                  <Icon type={'ionicon'} name={'ios-close'} color={'#BCBCBC'} size={26} onPress={() => {
                    this.myUsernameRef.current.clear();
                    this.setState({username: null})
                  }}/> : null}
                rightIconContainerStyle={{paddingLeft: 16, paddingRight: 8}}
              />
              <Input
                ref={this.myPasswordRef}
                placeholder={'请输入密码'}
                onChangeText={(text) => {
                  this.setState({password: text})
                }}
                keyboardType={this.state.showPassword ? 'email-address' : 'default'}
                secureTextEntry={!this.state.showPassword}
                placeholderTextColor={'#BCBCBC'}
                inputContainerStyle={{paddingBottom: 5, borderColor: '#DEDEDE'}}
                leftIcon={<Icon type={'material'} name={'lock'} color={'#BCBCBC'} size={20}/>}
                leftIconContainerStyle={{paddingRight: 10}}
                rightIcon={
                  <Icon
                    type={'ionicon'}
                    name={'ios-eye-off'}
                    color={this.state.showPassword ? '#3782F8' : '#BCBCBC'}
                    size={20}
                    onPress={this.loginShowPasswordPress.bind(this)}/>
                }
              />
            </View>
            <View style={[styles.button]}>
              <Button
                disabled={(!this.state.username || !this.state.password)}
                disabledStyle={{backgroundColor: '#8EB9F5'}}
                disabledTitleStyle={{color: '#ffffff'}}
                onPress={this.login.bind(this)}
                buttonStyle={{backgroundColor: '#337DF1', borderRadius: 30, paddingTop: 15, paddingBottom: 15}}
                title="登录"
                titleStyle={{letterSpacing: 5, fontSize: 18}}
              />
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    );
  }

  // 组件挂载前执行
  componentDidMount() {
    // 监听键盘隐藏
    Keyboard.addListener('keyboardDidHide', (event) => {
      this.login();
    });
  }

  // 登录操作
  login() {
    showLoading();
    Keyboard.dismiss();
    post(Api.LOGIN_URL, {username: this.state.username, password: this.state.password})
      .then( async (res) => {
        await AsyncStorage.setItem('accessToken', res.token);
        hiddenLoading();
        Store.dispatch(isLogin({type: ISLOGIN, isLogin: true}));
      })
      .catch(err => {
        hiddenLoading();
        Alert.alert('', err.message, [
          {text: "关闭", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
          {
            text: "重新输入", onPress: () => {
              this.myUsernameRef.current.clear();
              this.myPasswordRef.current.clear();
              this.myUsernameRef.current.focus();
              this.setState({
                username: null,
                password: null
              })
            }
          }
        ], {cancelable: false});
      });
  }

  // 密码显示隐藏切换事件
  loginShowPasswordPress() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  // 组件销毁时生命周期
  componentWillUnmount(): void {
    // 组件销毁时移除键盘监听事件
    Keyboard.removeAllListeners('keyboardDidHide');
  }
}


