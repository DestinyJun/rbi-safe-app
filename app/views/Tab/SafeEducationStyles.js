/**
 * desc：  安全教育样式
 * author：DestinyJun
 * date：  2020/6/17 17:29
 */
import {StyleSheet} from 'react-native';

export const SafeEducationStyles = StyleSheet.create({
  SafeEducation: {
    flex: 1,
  },
  remind: {
    height: 22,
    ...c_styles.w_100,
    backgroundColor: '#FBCF92',
    position: 'absolute',
    top: 80,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 9
  }
});
