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
    width: width,
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
  videoBoxProcessControl: {
    position: 'absolute',
    height: 50,
    width: '100%',
    backgroundColor: 'yellow',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red',
  },
  slider: {
    flex: 5,
    backgroundColor: 'orange',
    height: '100%',
  },
  totalTime: {
    flex: 1,
    backgroundColor: 'green',
    height: '100%',
  },
  videoContent: {
    flex: 1,
  },
});
