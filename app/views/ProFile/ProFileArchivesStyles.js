/**
 * desc：  我的培训档案样式
 * author：DestinyJun
 * date：  2020/7/3 17:54
 */
import {StyleSheet} from 'react-native';

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
  }
});
