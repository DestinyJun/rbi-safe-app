/**
 * desc：  我的培训档案样式
 * author：DestinyJun
 * date：  2020/7/3 17:54
 */
import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
export const ProFileArchivesStyles = StyleSheet.create({
  Archives: {
    flex: 1
  },
  content: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  examCard: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
    paddingLeft: 12,
    paddingRight: 15
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  progressTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    paddingBottom: 20,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonsStyles: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20
  },
  topic: {
    flex: 1
  },
  maskLayer: {
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  maskContent: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 15
  }
});
