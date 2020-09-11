/**
 * desc：  视频播放
 * author：DestinyJun
 * date：  2020/7/25 22:12
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import Video from "react-native-video";
import {Icon} from "react-native-elements";
import Orientation from 'react-native-orientation';
import {PlayVideoStyles as styles} from './PlayVideoStyles';
const {width, height} = Dimensions.get('window');

export class PlayVideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      height: 250,
      isLoading: true
    };
    this.video = {...props.route.params};
    this.player = React.createRef();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent={ false } backgroundColor={'#000000'} barStyle={'light-content'} />
        <View style={styles.container}>
          <View style={[styles.videoBox, {height: this.state.height}]}>
            <View style={styles.videoBoxHeader}>
              <View style={styles.videoBoxHeaderLeft}>
                <Icon
                  containerStyle={{height: '100%',justifyContent: 'center'}}
                  type='font-awesome' name={'angle-left'} color={'#fff'} size={30}
                  onPress={() =>{
                    this.props.navigation.goBack()
                  }}/>
              </View>
              <View style={styles.videoBoxHeaderRight}>

              </View>
            </View>
            <Video
              source={{uri: this.video.resourcePath}}
              resizeMode={'cover'}
              posterResizeMode={'cover'}
              fullscreen={false}
              disableFocus={true}
              hideShutterView={true}
              paused={!this.state.isPlay}
              repeat={true}
              onProgress={this._videoOnProgress.bind(this)}
              onLoad={this.videoOnLoadStart.bind(this)}
              bufferConfig={{
                minBufferMs: 15000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000
              }}
              ref={(ref) => {this.player = ref}}
              style={{flex: 1}}
            />
            <View style={[styles.videoBoxPlayControl,{height: this.state.height}]}>
              {
                this.state.isLoading?<ActivityIndicator animating={true} size="large" color="#fff" />:
                  this.state.isPlay?<Icon type={'font-awesome'} name={'pause-circle-o'} size={60} color={'#E7E7E7'} onPress={() =>{this.setState({isPlay: false})}} />:
                    <Icon type={'font-awesome'} name={'play-circle-o'} size={60} color={'#E7E7E7'} onPress={() =>{this.setState({isPlay: true})}}/>
              }
            </View>
            <View style={styles.videoBoxProcessControl}>
              <View style={styles.timer}>

              </View>
              <View style={styles.slider}>

            </View>
              <View style={styles.totalTime}>

              </View>
            </View>
          </View>
          <View style={styles.videoContent}>
            <Text>{this.video.resourceName}</Text>
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {
    // Orientation.lockToLandscape();
    const initial = Orientation.getInitialOrientation();
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    // Orientation.lockToPortrait();
    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  videoOnLoadStart(event) {
    console.log(event);
    this.setState({
      isLoading: false,
    },() => {
      console.log(this.state.height);
      console.log(width);
    })
  }

  _videoOnProgress(event) {
  }

  _orientationDidChange(orientation) {
    console.log('我执行了');
    console.log(orientation);
  }
}
