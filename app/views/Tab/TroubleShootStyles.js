/**
 * desc：  隐患排查样式
 * author：DestinyJun
 * date：  2020/6/17 17:36
 */
import {StyleSheet} from 'react-native';

export const TroubleShootStyles = StyleSheet.create({
  TroubleShoot: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttons_touch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  // 公共样式
  borderLeft: {
    borderLeftColor: '#F0F0F0',
    borderLeftWidth: 1
  }
});
