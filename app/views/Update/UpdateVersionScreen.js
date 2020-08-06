/**
 * desc：  版本更新
 * author：DestinyJun
 * date：  2020/8/3 17:29
 */
import React, {Component} from 'react';
import {View, StyleSheet, PermissionsAndroid, Text, ActivityIndicator, Linking} from 'react-native';
import {Button, Header} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {hiddenLoading, showLoading, singleRemind} from "../../util/ToolFunction";
import {
  upgrade,
  versionName,
  addDownLoadListener,
} from 'rn-app-upgrade';
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";

export class UpdateVersionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateContent: null,
      showTitle: true,
      btnDisable: false,
    };
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
          <View>
            <Text style={[c_styles.h4]}>发现新版本:   <Text style={[c_styles.h5,c_styles.text_darkinfo]}>{this.state.updateContent?.version}</Text></Text>
            <Text style={[c_styles.h4]}>当前版本:   <Text style={[c_styles.h5,c_styles.text_darkinfo]}>{versionName}</Text></Text>
          </View>
          <View style={[c_styles.mt_2]}>
            <Text style={[c_styles.h4]}>更新日志：</Text>
            <Text style={[c_styles.h5,c_styles.text_danger]}>
              {this.state.updateContent?.updateContent}
            </Text>
          </View>
          <Button
            disabled={this.state.btnDisable}
            disabledTitleStyle={{color: '#fff'}}
            disabledStyle={{backgroundColor: '#3A86FF'}}
            title={this.state.showTitle?'立即升级': null}
            icon={!this.state.showTitle?<ActivityIndicator size="small" color="#fff" />: null}
            buttonStyle={c_styles.button} onPress={this.updateOnPress.bind(this)} />
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.requestPermission();
    addDownLoadListener((progress) => {
      if (progress === 100 ) {
        this.setState({
          showTitle: true
        });
        this.props.navigation.goBack;
      }
    });
    this.verifyUpdate();
  }

 // 获取文件读写权限
  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        singleRemind('权限提醒','您已拒接获取系统读写权限，应用可能无法升级！')
      } else {
        Linking.openSettings();
      }
    } catch (err) {
      singleRemind('权限提醒','系统读写权限获取异常，应用可能无法升级！')
    }
  };

  // 检查更新
  verifyUpdate() {
    showLoading();
    let fileds = new FormData();
    fileds.append('version',versionName);
    post(ProFileApi.UPDATE_APP_MOBILE,fileds)
      .then(res => {
        hiddenLoading();
        this.setState({
          updateContent: {...res.data.updateContent}
        });
      })
      .catch(err => {
        hiddenLoading();
      })
  }

  // 立即更新
  updateOnPress() {
    this.setState({
      btnDisable: true,
      showTitle: false,
    });
    upgrade(this.state.updateContent.appPath);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logContent: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10
  }
});
