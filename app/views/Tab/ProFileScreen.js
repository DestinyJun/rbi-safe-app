/**
 * desc：  个人信息
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// 自定义工具
import {Store} from "../../redux/store";
import {isLoading} from "../../redux/actions";
import {ISLOADING} from "../../redux/actionTypes";
import {FocusStatusBar} from "../../components/FocusStatusBar";

export class ProFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[c_styles.pt_3,c_styles.cell]}>
        <FocusStatusBar backgroundColor={'blue'}/>
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
