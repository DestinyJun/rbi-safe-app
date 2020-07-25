/**
 * desc：  视频播放
 * author：DestinyJun
 * date：  2020/7/25 22:12
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Video from "react-native-video";

export class PlayVideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.video = {...props.route.params};
    this.player = React.createRef();
  }

  render() {
    console.log(this.video);
    return (
      <View style={{flex: 1}}>
        <Video
          source={{uri: this.video.resourcePath}}
          ref={(ref) => {this.player = ref}}
          style={styles.backgroundVideo}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
