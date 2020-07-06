/**
 * desc：  个人信息
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ProFileStyles as styles} from "./ProFileStyles";

// 自定义工具
import {Store} from "../../redux/store";
import {isLoading} from "../../redux/actions";
import {ISLOADING} from "../../redux/actionTypes";
import {Header, ListItem} from "react-native-elements";
import {PROFILE_TOP_MENU_LIST, PROFILE_BOTTOM_MENU_LIST} from "../../util/Constant";

export class ProFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.ProFile}>
        <Header
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
          }}
          centerComponent={{ text: '个人中心', style: { color: '#fff', fontSize: 18 } }}
        />
        <Text style={[c_styles.text_info]}>我是个人中心</Text>
        <View>
          {
            PROFILE_TOP_MENU_LIST.map((item, i) => (
              <ListItem
                onPress={this.routerOnPress.bind(this,item)}
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
              />
            ))
          }
        </View>
        <View style={[c_styles.mt_2]}>
          {
            PROFILE_BOTTOM_MENU_LIST.map((item, i) => (
              <ListItem
                onPress={this.routerOnPress.bind(this,item)}
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
              />
            ))
          }
        </View>
        <TouchableOpacity onPress={this.loginOut.bind(this)}>
          <Text>点击退出登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
  routerOnPress (item) {
    this.props.navigation.navigate(item.routerName)
  }
  loginOut() {
    Store.dispatch(isLoading({type: ISLOADING, isLoading: false}))
  }
}
