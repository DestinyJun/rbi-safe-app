/**
 * desc：  HomeScreen的样式
 * author：DestinyJun
 * date：  2020/3/23 9:16
 */
import {StyleSheet} from 'react-native';

export const HomeStyle = StyleSheet.create({
  home: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 20
  },
  imgBox: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    marginTop: 10,
  },
  imgBoxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  imgBoxList: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
