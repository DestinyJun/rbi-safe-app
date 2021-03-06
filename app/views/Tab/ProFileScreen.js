/**
 * desc：  个人信息
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Header, Icon, ListItem, Button } from "react-native-elements";
import {ProFileStyles as styles} from "./ProFileStyles";

// 自定义工具
import {Store} from "../../redux/store";
import {isLogin, isUpdateApp} from "../../redux/actions";
import {ISLOGIN, ISUPDATEAPP} from "../../redux/actionTypes";
import {PROFILE_TOP_MENU_LIST, PROFILE_BOTTOM_MENU_LIST} from "../../util/Constant";
import {hiddenLoading, showLoading, singleRemind} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";
import {versionName} from "rn-app-upgrade";
import AsyncStorage from "@react-native-community/async-storage";

export class ProFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proFileInfo: null,
      updateState: Store.getState().isUpdateApp,
      daily: false
    };
    this.unfocus = null;
  }

  render() {
    return (
      <View style={styles.ProFile}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
          }}
          centerComponent={{ text: '个人中心', style: { color: '#fff', fontSize: 18 } }}
        />
        <View style={[c_styles.pl_3,c_styles.pr_3,{flex: 1,paddingBottom: 20}]}>
          <ScrollView style={{flex: 1}}>
            <View style={[styles.baseInfo]}>
              <Avatar
                size={'large'}
                icon={{name: 'account-circle',type: 'material',color: '#2289DC',size: 76}}
                iconStyle={{backgroundColor: '#fff'}}
                rounded={true}/>
              <View style={[styles.baseInfoText]}>
                <Text style={[c_styles.h5,{color:'#353535'}]}>{this.state.proFileInfo&&this.state.proFileInfo.name}</Text>
                <View style={[c_styles.mt_2,{flexDirection: 'row', alignItems:'center'}]}>
                  <Icon type={'material'} name={'people'} size={16} color={'#226AD5'} />
                  <Text style={[c_styles.ml_1,{color:'#A5A5A5', fontSize: 14}]}>
                    {this.state.proFileInfo&&this.state.proFileInfo.position}： {this.state.proFileInfo&&this.state.proFileInfo.employeeNumber}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.topMenu]}>
              { this.state.daily?<ListItem
                Component={TouchableOpacity}
                containerStyle={{backgroundColor: 'unset'}}
                onPress={this.routerOnPress.bind(this,{routerName: 'ViewOperationDailyScreen'})}
                title={'生产运行日报'}
                leftIcon={{ name: 'window-maximize',type: 'font-awesome',size: 18}}
                bottomDivider={true}
              />: null}
              {
                PROFILE_TOP_MENU_LIST.map((item, i) => (
                  <ListItem
                    Component={TouchableOpacity}
                    containerStyle={{backgroundColor: 'unset'}}
                    onPress={this.routerOnPress.bind(this,item)}
                    key={i}
                    title={item.title}
                    leftIcon={{ name: item.icon,type: item.type,size: 18}}
                    bottomDivider={!(i === (PROFILE_TOP_MENU_LIST.length - 1))}
                  />
                ))
              }
            </View>
            <View style={[styles.bottomMenu]}>
              {
                PROFILE_BOTTOM_MENU_LIST.map((item, i) => (
                  <ListItem
                    onPress={this.routerOnPress.bind(this,item)}
                    key={i}
                    title={item.title}
                    leftIcon={{ name: item.icon,type: item.type,size: item.type === 'material'?22:18}}
                    bottomDivider={true}
                  />
                ))
              }
              <ListItem
                onPress={() => {
                  if (!this.state.updateState) {
                    singleRemind('更新提示','当前已是最新版本，无需更新！')
                  } else {
                    this.props.navigation.navigate('UpdateVersionScreen');
                  }
                }}
                title={'版本更新'}
                leftIcon={{ name: 'cloud-upload',type: 'font-awesome',size: 22}}
                badge={this.state.updateState?{status: 'error',badgeStyle: {height: 10,width: 10,borderRadius: 10}}: null}
              />
            </View>
            <Button
              containerStyle={[{borderRadius: 30}]}
              buttonStyle={{paddingTop: 10,paddingBottom: 10}}
              title={'退出登录'}
              onPress={this.loginOut.bind(this)}/>
          </ScrollView>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期函
  async componentDidMount() {
    this.subscription = Store.subscribe(() => {
      this.setState({
        updateState: Store.getState().isUpdateApp
      })
    });
    this.unfocus = this.props.navigation.addListener('focus',() => {
      showLoading();
      post(ProFileApi.GET_MY_INFO,{})
        .then((res) => {
          hiddenLoading();
          this.setState({
            proFileInfo: {...res.data}
          });
        })
        .catch(err => {
          hiddenLoading();
        })
    });
    this.checkAppUpdate();
    const arr = JSON.parse(await AsyncStorage.getItem('limits')).filter((item) => item.name === 'daily');
    this.setState({
      daily: arr[0].limit
    });
  }

  // 组件卸载
  componentWillUnmount() {
    this.unfocus();
    this.subscription();
  }

  // 检查APP更新
  checkAppUpdate() {
    let fileds = new FormData();
    fileds.append('version',versionName);
    post(ProFileApi.UPDATE_APP_MOBILE,fileds)
      .then(res => {
        if (res.data.ifUpdate === 1) {
          Store.dispatch(isUpdateApp({type: ISUPDATEAPP, isUpdateApp: true}))
        }
      })
      .catch(err => {
        singleRemind('错误提醒',`${err.message}，请联系管理员`)
      })
  }

  // 功能路由跳转
  routerOnPress (item) {
    if (item.routerName === 'ProFileInfoScreen') {
      this.props.navigation.navigate(item.routerName,this.state.proFileInfo);
      return;
    }
    this.props.navigation.navigate(item.routerName);
  }

  // 退出登录
  async loginOut() {
    await AsyncStorage.clear();
    Store.dispatch(isLogin({type: ISLOGIN, isLogin: false}))
  }
}
