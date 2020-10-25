/**
 * desc：  在线查看生产运行日报
 * author：DestinyJun
 * date：  2020/8/5 16:01
 */
import React, {Component} from 'react';
import {View, StyleSheet,} from 'react-native';
import {Header} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import WebView from "react-native-webview";
import {SERVER_ADDRESS_TEST} from "../../util/Constant";

export class ViewOperationDailyScreen extends Component {
  constructor(props) {
    super(props);
    this.url = `${SERVER_ADDRESS_TEST}/#/operation-reporting?accessToken=${this.accessToken}`;
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
          centerComponent={{text: `生产运营日报`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.fileInfo}>
          <WebView
            scalesPageToFit={false}
            startInLoadingState={true}
            source={{uri: this.url}}
          />
        </View>
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {

  }
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
