/**
 * desc：  视频播放
 * author：DestinyJun
 * date：  2020/7/25 22:12
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import Video from "react-native-video";
import {Button, Icon, Slider} from "react-native-elements";
import Orientation from 'react-native-orientation';
import {PlayVideoStyles as styles} from './PlayVideoStyles';

const {width, height} = Dimensions.get('window');

export class PlayVideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 250,
      isLoading: true,
      isPlay: false, // 控制播放
      playTime: [], // 播放时刻表
      totalTime: [], // 总时长时刻表
      totalDuration: 0, // 视频总时长（秒）
      sliderTime: 0, // 进度条位置（百分比）
      currentTime: 0, // 当前播放位置（秒）
    };
    this.playRate = 0;
    this.video = {...props.route.params};
    this.player = React.createRef();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent={false} backgroundColor={'#000000'} barStyle={'light-content'}/>
        <View style={styles.container}>
          <View style={[styles.videoBox, {height: this.state.height}]}>
            <View style={styles.videoBoxHeader}>
              <View style={styles.videoBoxHeaderLeft}>
                <Icon
                  containerStyle={{height: '100%', justifyContent: 'center'}}
                  type='font-awesome' name={'angle-left'} color={'#fff'} size={30}
                  onPress={() => {
                    this.props.navigation.goBack()
                  }}/>
              </View>
              <View style={styles.videoBoxHeaderRight}>

              </View>
            </View>
            <Video
              // source={{uri: this.video.resourcePath}}
              source={{uri: 'http://192.168.28.67/video2.mp4'}}
              resizeMode={'cover'}
              posterResizeMode={'cover'}
              fullscreen={false}
              disableFocus={true}
              hideShutterView={true}
              paused={!this.state.isPlay}
              repeat={false}
              progressUpdateInterval={1000}
              onProgress={this._videoOnProgress.bind(this)}
              onLoad={this._videoOnLoadStart.bind(this)}
              onEnd={this._videoPlayEnd.bind(this)}
              bufferConfig={{
                minBufferMs: 15000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000
              }}
              ref={(ref) => {
                this.player = ref
              }}
              style={{flex: 1}}
            />
            <View style={[styles.videoBoxPlayControl, {height: this.state.height}]}>
              {
                this.state.isLoading ? <ActivityIndicator animating={true} size="large" color="#fff"/> :
                  this.state.isPlay ?
                    <Icon type={'font-awesome'} name={'pause-circle-o'} size={60} color={'#E7E7E7'} onPress={this._videoPause.bind(this)}/> :
                    <Icon type={'font-awesome'} name={'play-circle-o'} size={60} color={'#E7E7E7'} onPress={this._videoPlay.bind(this)}/>
              }
            </View>
            {/*<View style={[styles.videoBoxRepeatControl, {height: this.state.height}]}>
              <Icon type={'font-awesome'} name={'repeat'} size={30} color={'#E7E7E7'} onPress={this._videoPause.bind(this)}/>
              <Text style={[c_styles.h6,c_styles.text_white]}>重播</Text>
            </View>*/}
            <View style={styles.videoBoxProcessControl}>
              <View style={styles.playTime}>
                <Text style={{color: '#fff', fontSize: 16}}>
                  {this.state.playTime.length === 0 ? '00:00' : `${this.state.playTime[0]}:${this.state.playTime[1]}`}
                </Text>
              </View>
              <View style={styles.slider}>
                <Slider
                  minimumTrackTintColor={'#FB6667'}
                  maximumTrackTintColor={'rgba(208,225,225,0.3)'}
                  thumbStyle={{width: 15,height: 15,backgroundColor: '#FFFFFF'}}
                  value={this.state.sliderTime}
                />
              </View>
              <View style={styles.totalTime}>
                <Text style={{color: '#fff', fontSize: 16}}>
                  {this.state.totalTime.length === 0 ? '00:00' : `${this.state.totalTime[0]}:${this.state.totalTime[1]}`}
                </Text>
                <Icon
                  containerStyle={{flex: 1, height: '100%', justifyContent: 'center'}}
                  type='font-awesome' name={'expand'} color={'#fff'} size={20}
                  onPress={() => {

                  }}/>
              </View>
            </View>
          </View>
          <View style={styles.videoContent}>
            <Text>{this.video.resourceName}</Text>
            <Button title={'重播'} onPress={this._videoRepeatPlay.bind(this)} />
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {}

  componentWillUnmount() {}

// 视频初始化完成回调
  _videoOnLoadStart(event) {
    const duration = Math.round(event.duration);
    const minute = Math.trunc(duration / 60);
    const second = duration % 60;
    this.setState({
      isLoading: false,
      totalDuration: duration,
      totalTime: [
        minute >= 10 ? minute : minute > 1 ? `0${minute}` : '00',
        second > 9 ? second.toString() : `0${second}`
      ],
    })
  }

  // 播放事件
  _videoPlay() {
    this.setState({isPlay: true});
  }

  // 暂停事件
  _videoPause() {
    this.setState({isPlay: false})
  }

  // 重新播放
  _videoRepeatPlay() {
    this.player.seek(0); // 实现重新播放的关键
    this.playRate = 0;
    this.setState({
      playTime: [],
      sliderTime: 0
    })
  }

  // 播放进度回调
  _videoOnProgress(event) {
    this.playRate++;
    const totalDuration = Math.ceil(event.seekableDuration)+1; // 向下取整
    const minute = Math.trunc(this.playRate / 60);
    const second = this.playRate % 60;
    this.setState({
      playTime: [
        minute >= 10 ? minute : minute > 1 ? `0${minute}` : '00',
        second > 9 ? second.toString() : `0${second}`,
      ],
      sliderTime: parseFloat((this.playRate / totalDuration).toFixed(2))
    })
  }

  // 播放结束回调
  _videoPlayEnd() {
    this.playRate = 0;
    this.setState({
      playTime: [],
      sliderTime: 1
    })
  }
}
