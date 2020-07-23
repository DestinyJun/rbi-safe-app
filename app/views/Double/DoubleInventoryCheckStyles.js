/**
 * desc：  一岗双责清单检查样式
 * author：DestinyJun
 * date：  2020/7/3 11:27
 */
import {StyleSheet} from 'react-native';

export const DoubleInventoryCheckStyles = StyleSheet.create({
  InventoryCheck: {
    flex: 1
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
    marginBottom: 10
  },
  contentList: {
    flex: 1
  },
  // 公共样式
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    marginBottom: 10,
  },
});
