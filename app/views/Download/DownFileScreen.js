/**
 * desc：  学习文件下载
 * author：DestinyJun
 * date：  2020/8/5 16:01
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
  ActivityIndicator,
  Linking, Alert
} from 'react-native';
import {Button, Header, Icon} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {errorRemind, singleRemind} from "../../util/ToolFunction";
import RNFS from 'react-native-fs';
import AsyncStorage from "@react-native-community/async-storage";
import WPSOffice from 'react-native-wps-office';
import {FILE_TYPE} from "../../util/Constant";

export class DownFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downLoading: false,
      downComplete: false,
      downloadDest: null,
    };
    this.file = {...props.route.params};
    // 文件类型判断

  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5', zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {
            this.props.navigation.goBack()
          }}/>}
          centerComponent={{text: `文件下载`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.fileInfo}>
          <View style={styles.fileInfoTop}>
            <Icon type={'font-awesome'} name={'file'} color={'#207347'} size={50}/>
            <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18}}>{this.file.resourceName}</Text>
          </View>
          <Button
            icon={this.state.downLoading ? <ActivityIndicator size="small" color="#fff"/> : null}
            buttonStyle={[c_styles.button, {backgroundColor: this.state.downComplete ? '#227346' : '#3A86FF'}]}
            title={this.state.downLoading ? null : (this.state.downComplete ? '点击打开' : '点击下载')}
            onPress={this.downOnPress.bind(this, this.state.downComplete ? '点击打开' : '点击下载')}
          />
        </View>
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {
    this.requestPermission();
  }

  // 点击下载
  async downOnPress(name) {
    if (name === '点击打开') {
      const fileArr = this.file.resourcePath.split('.');
      const fileType = fileArr[fileArr.length-1];
      // 判断文件类型
      if (FILE_TYPE[`.${fileType}`]) {
        // 在调起其他app或者本机应用前先检查是否已经安装
        Linking.canOpenURL('KingsoftOfficeApp://')
          .then(async supported => {
            if (!supported) {
              singleRemind('异常提醒','您当前为安装wps Office，请您去应用商店安装此程序后再查看！');
            } else {
              WPSOffice.open(this.state.downloadDest)
                .then(res => {})
                .catch(err => {
                  singleRemind('异常提醒','打开文件异常，请稍后重试！');
                })
            }})
          .catch(err => {
            singleRemind('异常提醒','打开文件异常，请稍后重试！');
          });
      } else {
        singleRemind('异常提醒','当前文件类型不支持查看，请上传正确的文件类型！')
      }
    } else {
      const timestamp = (new Date()).getTime();//获取当前时间错
      const random = String(((Math.random() * 1000000) | 0));//六位随机数
      let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalStorageDirectoryPath;
      //外部文件，共享目录的绝对路径（仅限android）
      const downloadDest = `${dirs}/${timestamp + random}-${this.file.resourceName}`;
      //下载地址
      const formUrl = this.file.resourcePath;
      const options = {
        fromUrl: formUrl,
        toFile: downloadDest,
        headers: {
          'accessToken': await AsyncStorage.getItem('accessToken')
        },
        background: true,
        progressInterval: 100,
        begin: (res) => {
          this.setState({
            downLoading: true
          });
          ToastAndroid.show('开始下载', ToastAndroid.SHORT);
        },
      };
      try {
        const ret = RNFS.downloadFile(options);
        ret.promise
          .then(res => {
            this.setState({
              downLoading: false,
              downComplete: true,
              downloadDest: `${downloadDest}`,
            }, () => {
              console.log(this.state.downloadDest);
            });
            ToastAndroid.show('下载成功', ToastAndroid.SHORT);
          })
          .catch(err => {
            errorRemind('下载异常出错，请稍后重试！', this.props.navigation, '返回');
            this.setState({
              downLoading: false,
              downComplete: false,
            });
          });
      } catch (e) {
        errorRemind('下载异常出错，请稍后重试！', this.props.navigation, '返回');
        this.setState({
          downLoading: false,
          downComplete: false,
        });
      }
    }
  }

  // 通知下载 (jobId)文件下载是提供的一个ID值
  stopDownOnPress(jobId) {
    try {
      const ret = RNFS.stopDownload(jobId);
      ret.promise
        .then(res => {
          console.log('success', res);
          console.log('file://' + downloadDest);
        })
        .catch(err => {
          console.log('err', err);
        });
    } catch (e) {
      ToastAndroid.show('下载失败', ToastAndroid.SHORT);
      console.log(error);
    }
  }

  // 获取文件读写权限
  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      } else {
        singleRemind('权限提醒', '您已拒接获取系统读写权限，文件可能无法下载！')
      }
    } catch (err) {
      singleRemind('权限提醒', '您已拒接获取系统读写权限，文件可能无法下载！')
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  fileInfo: {
    flex: 1,
    justifyContent: 'space-around'
  }
});
