/**
 * desc：  一岗双责样式
 * author：DestinyJun
 * date：  2020/6/17 17:38
 */
import {StyleSheet} from 'react-native';

export const DoubleDutyStyles = StyleSheet.create({
  DoubleDuty: {
    flex: 1,
  },
  mine: {},
  mineTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },
  pending: {
    flex: 1,
  },
  pendingTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },
});
