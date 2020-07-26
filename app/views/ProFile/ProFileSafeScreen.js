/**
 * desc：  账号与安全
 * author：DestinyJun
 * date：  2020/7/3 21:44
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {ProFileSafeStyles as styles} from "./ProFileSafeStyles";
import {Header, Icon, ListItem, Button} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {Store} from "../../redux/store";
import {isLogin} from "../../redux/actions";
import {ISLOGIN} from "../../redux/actionTypes";

export class ProFileSafeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalPassword: null,
      latestPassword: null,
      surePassword: null
    };
  }

  render() {
    return (
      <View style={styles.Safe}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `账号与安全`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          <View style={[styles.title]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>修改密码</Text>
          </View>
          <View style={styles.inputs}>
            <ListItem
              containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
              title={'原密码'}
              input={{
                placeholder: '请输入原密码',
                inputStyle: {fontSize: 16},
                value: this.state.originalPassword,
                onChangeText: (text) => {
                this.setState({
                  originalPassword: text
                });
                }}}
              bottomDivider={true}
            />
            <ListItem
              containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
              title={'新密码'}
              input={{
                placeholder: '请输入新密码',
                inputStyle: {fontSize: 16},
                value: this.state.latestPassword,
                onChangeText: (text) => {
                  this.setState({
                    latestPassword: text
                  });
                }}}
              bottomDivider={true}
            />
            <ListItem
              containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
              title={'确定新密码'}
              input={{
                placeholder: '请再次请输入新密码',
                inputStyle: {fontSize: 16},
                value: this.state.surePassword,
                onChangeText: (text) => {
                  this.setState({
                    surePassword: text
                  });
                }}}
            />
          </View>
          <Button buttonStyle={c_styles.button} title={'确认修改'} onPress={this.updatePassword.bind(this)} />
        </View>
      </View>
    );
  }

  // 密码修改操作
  updatePassword() {
    if (this.state.latestPassword !== this.state.surePassword) {
      Alert.alert('错误提醒','两次输入得密码不一致！', [
        {text: "请重新输入", onPress: () =>{
            this.setState({
              latestPassword: null,
              surePassword: null
            })
          }, style: "cancel"},
      ], {cancelable: false});
      return;
    }
    showLoading();
    post(ProFileApi.UPDATE_MY_PASSWORD,{
      originalPassword: this.state.originalPassword,
      latestPassword: this.state.latestPassword,
    })
      .then((res) => {
        hiddenLoading();
        Alert.alert('成功提醒',res.message, [
          {text: "请重新登录", onPress: () =>{Store.dispatch(isLogin({type: ISLOGIN, isLogin: false}))}, style: "cancel"},
        ], {cancelable: false});
      })
      .catch(err => {
        hiddenLoading();
        Alert.alert('错误提醒',err.message, [
          {text: "请重新输入", onPress: () =>{
            this.setState({
              originalPassword: null,
              latestPassword: null,
              surePassword: null
            })
            }, style: "cancel"},
        ], {cancelable: false});
      })
  }
}
