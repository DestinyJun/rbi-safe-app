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
import {TabHeader} from "../../components/TabHeader";

export class ProFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.ProFile}>
        <TabHeader />
        <Text style={[c_styles.text_info]}>我是个人中心</Text>
        <TouchableOpacity onPress={this.loginOut}>
          <Text>点击退出登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
  loginOut = () => {
    Store.dispatch(isLoading({type: ISLOADING, isLoading: false}))
  }
}
