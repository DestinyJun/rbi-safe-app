/**
 * desc：  ProFileScreen屏幕样式
 * author：DestinyJun
 * date：  2020/3/23 22:07
 */
import {StyleSheet} from 'react-native';
export const ProFileStyles = StyleSheet.create({
  ProFile: {
    flex: 1,
  },
  baseInfo: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  baseInfoText: {
    paddingLeft: 15,
    justifyContent: 'center'
  },
  topMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  bottomMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
  }
});
