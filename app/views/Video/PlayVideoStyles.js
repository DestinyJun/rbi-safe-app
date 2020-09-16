/**
 * desc：  PlayVideoScreen样式
 * author：DestinyJun
 * date：  2020/9/8 13:21
 */
import {StyleSheet} from 'react-native';
import {Dimensions} from "react-native";
const {width, height} = Dimensions.get('window');

export const PlayVideoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E3E3',
  },
  videoBox: {
    backgroundColor: '#000',
    justifyContent: 'center',
    position: 'relative',
  },
  videoBoxHeader: {
    width: width,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    flexDirection: 'row'
  },
  videoBoxHeaderLeft: {
    flex: 1,
  },
  videoBoxHeaderRight: {
    flex: 6,
  },
  videoBoxPlayControl: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBoxRepeatControl: {
    position: 'absolute',
    backgroundColor: 'rgba(9,12,21,0.8)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBoxProcessControl: {
    position: 'absolute',
    height: 50,
    width: '100%',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  playTime: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5
  },
  slider: {
    flex: 5,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  totalTime: {
    flex: 2,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  videoContent: {
    flex: 1,
  },
});
