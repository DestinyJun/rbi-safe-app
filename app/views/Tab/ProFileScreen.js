/**
 * desc：  个人信息
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ProFileStyles as styles} from "./ProFileStyles";

// 自定义工具
import {Store} from "../../redux/store";
import {isLogin} from "../../redux/actions";
import {ISLOGIN} from "../../redux/actionTypes";
import {Avatar, Header, Icon, ListItem, Button } from "react-native-elements";
import {PROFILE_TOP_MENU_LIST, PROFILE_BOTTOM_MENU_LIST} from "../../util/Constant";
import {ListItemSubtitleComponent} from "../../components/ListItemSubtitleComponent";

export class ProFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <View style={[c_styles.pl_3,c_styles.pr_3,{flex: 1}]}>
          <ScrollView style={{flex: 1}}>
            <View style={[styles.baseInfo]}>
              <Avatar
                size={"large"}
                source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
                rounded={true}/>
              <View style={[styles.baseInfoText]}>
                <Text style={[c_styles.h5,{color:'#353535'}]}>王建国</Text>
                <View style={[c_styles.mt_2,{flexDirection: 'row', alignItems:'center'}]}>
                  <Icon type={'material'} name={'people'} size={16} color={'#226AD5'} />
                  <Text style={[c_styles.ml_1,{color:'#A5A5A5', fontSize: 14}]}>班组长： 10545575</Text>
                </View>
              </View>
            </View>
            <View style={[styles.topMenu]}>
              {
                PROFILE_TOP_MENU_LIST.map((item, i) => (
                  <ListItem
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
                    bottomDivider={!(i === (PROFILE_TOP_MENU_LIST.length - 1))}
                  />
                ))
              }
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
  routerOnPress (item) {
    this.props.navigation.navigate(item.routerName)
  }
  loginOut() {
    Store.dispatch(isLogin({type: ISLOGIN, isLoading: false}))
  }
}
