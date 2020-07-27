/**
 * desc：  TabHome
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {View, BackHandler, ToastAndroid, Platform, ScrollView, Text} from 'react-native';
import {HomeStyle as styles} from "./HomeStyle";
import {Header,Image} from "react-native-elements";
import {IMAGE_HOME_ONE, IMAGE_HOME_THREE, IMAGE_HOME_TWO} from "../../util/Constant";

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.home]}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
          }}
          centerComponent={{text: '安全生产信息化', style: {color: '#fff', fontSize: 18}}}
        />
        <View style={styles.content}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.imgBox}>
              <Image source={IMAGE_HOME_ONE} style={{height: 220}} />
            </View>
            <View style={styles.imgBox}>
              <Image source={IMAGE_HOME_TWO} style={{height: 300}} />
            </View>
            <View style={styles.imgBox}>
              <Image source={IMAGE_HOME_THREE} style={{height: 300}} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  // 生命周期
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  // 二次返回退出App
  onBackAndroid = () => {
    //判断该页面是否处于聚焦状态
    if (this.props.navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        // return true;
        BackHandler.exitApp();//直接退出APP
      } else {
        this.lastBackPressed = Date.now();
        //退出提示
        ToastAndroid.show('再按一次退出应用', 1000);
        return true;
      }
    }
  }
}
