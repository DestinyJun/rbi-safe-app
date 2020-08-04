/**
 * desc：  版本更新
 * author：DestinyJun
 * date：  2020/8/3 17:29
 */
import React, {Component} from 'react';
import {View,StyleSheet, PermissionsAndroid} from 'react-native';
import {Button, Header} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {singleRemind} from "../../util/ToolFunction";
import {
  upgrade,
  versionName,
  versionCode,
  openAPPStore,
  checkUpdate,
  checkIOSUpdate,
  addDownLoadListener,
} from 'rn-app-upgrade';

export class UpdateVersionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _message: null
    };
    this.url = `http://192.168.28.67/app-debug.apk`;
    // 直接使用即可
    console.log(versionName);
    console.log(versionCode);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          ViewComponent={View}
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1,borderWidth: 0}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `版本更新`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.logContent}>
          <Button title={'默认更新'} buttonStyle={c_styles.button} />
          <Button title={'后台更新'} buttonStyle={c_styles.button} />
          <Button title={'强制更新'} buttonStyle={c_styles.button} />
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.requestPermission();
  }

 // 获取文件读写权限
  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      } else {
        singleRemind('权限提醒','您已拒接获取系统读写权限，应用可能无法升级！')
      }
    } catch (err) {
      singleRemind('权限提醒','系统读写权限获取异常，应用可能无法升级！')
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logContent: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
