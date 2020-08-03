/**
 * desc：  视频播放
 * author：DestinyJun
 * date：  2020/7/25 22:12
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Video from "react-native-video";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {Header} from "react-native-elements";

export class PlayVideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.video = {...props.route.params};
    this.player = React.createRef();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `${this.video.resourceName}`,style: {fontSize: 20,color: '#fff'}}}
        />
        <View style={styles.container}>
          <View style={styles.videoControl} />
          <Video
            source={{uri: this.video.resourcePath}}
            controls={true}
            disableFocus={true}
            hideShutterView={true}
            paused={true}
            repeat={true}
            onProgress={this.videoOnProgress.bind(this)}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000
            }}
            ref={(ref) => {this.player = ref}}
            style={styles.videoBgc}
          />
        </View>
      </View>
    );
  }
  videoOnProgress(event) {
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row'
  },
  videoBgc: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoControl: {}
});
