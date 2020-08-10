/**
 * desc：  个人信息详情样式
 * author：DestinyJun
 * date：  2020/7/3 18:00
 */
import {StyleSheet} from 'react-native';

export const ProFileInfoStyles = StyleSheet.create({
  Info: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'relative'
  },
  contentBack: {
    backgroundColor: '#226AD5',
    height: 50,
    ...c_styles.w_100,
    position: 'absolute',
    top: -1,
    zIndex: 1
  },
  contentList: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 1
  },
  baseInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  baseInfoPerson: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center'
  },
  baseInfoList: {
    flexDirection: 'row',
    width: '48%',
  },
  baseList: {
    flex: 1,
  },
  baseListCenter: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  dialogContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1
  }
});
