/**
 * desc：  视频播放
 * author：DestinyJun
 * date：  2020/7/25 22:12
 */
import React, {Component} from 'react';
import {Dimensions, StatusBar, Text, View} from 'react-native';
import {Icon} from "react-native-elements";
import {PlayVideoStyles as styles} from './PlayVideoStyles';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

const {width, height} = Dimensions.get('window');

export class PlayVideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 250,
      width: width,
      isLoading: true, // 视频是否加载中
      isPlay: true, // 控制播放
      isPlayEnd: false, // 视频是否播放结束
      resizeMode: 'contain',
      hiddenStatus: false,
    };
    this.video = {...props.route.params};
    this.player = React.createRef();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={this.state.hiddenStatus} translucent={false} backgroundColor={'#000000'} barStyle={'light-content'}/>
        <View style={styles.container}>
          <View style={[styles.videoBox, {width: this.state.width,height: this.state.height}]}>
            <VideoPlayer
              ref={(ref) => {this.player = ref}}
              source={{uri: 'http://192.168.28.185/video2.mp4'}}
              navigator={this.props.navigation}
              paused={this.state.isPlay}
              resizeMode={this.state.resizeMode}
              toggleResizeModeOnFullscreen={false}
              controlAnimationTiming={500}
              controlTimeout={5000}
              showOnStart={true}
              videoStyle={{flex: 1}}
              seekColor={'#fff'}
              style={{flex: 1}}
              isFullscreen={false}
              onEnterFullscreen={() => {
                // 强制横屏
                Orientation.lockToLandscape();
                this.setState({
                  width: height,
                  height: width,
                  resizeMode: 'cover',
                  hiddenStatus: true,
                  isPlay: false
                })
              }}
              onExitFullscreen={() => {
                // 强制竖屏
                Orientation.lockToPortrait();
                this.setState({
                  width: width,
                  height: 250,
                  resizeMode: 'contain',
                  hiddenStatus: false,
                  isPlay: false
                });
              }}
              onEnd={this._videoPlayEnd.bind(this)}
            />
            {
              this.state.isPlayEnd?
              <View style={[styles.videoBoxRepeatControl, {height: this.state.height}]}>
                <Icon type={'font-awesome'} name={'repeat'} size={30} color={'#E7E7E7'} onPress={this._videoRepeatPlay.bind(this)}/>
                <Text style={[c_styles.h6,c_styles.text_white]}>重播</Text>
              </View>: null
            }
          </View>
          <View style={styles.videoContent}>
            <Text style={[c_styles.p_2,c_styles.h5]}>{this.video.resourceName}</Text>
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  // 重新播放
  _videoRepeatPlay() {
    this.setState({
      isPlayEnd: false,
      isPlay: false
    },() => {
      this.player.player.ref.seek(0); // 实现重新播放的关键
    })
  }

  // 播放结束回调
  _videoPlayEnd() {
    this.setState({
      isPlayEnd: true
    })
  }
}
