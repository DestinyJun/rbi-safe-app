/**
 * desc：  一岗双责清单制定样式
 * author：DestinyJun
 * date：  2020/7/3 11:20
 */
import {StyleSheet} from 'react-native';

export const DoubleInventoryMakeStyles = StyleSheet.create({
  DoubleInventory: {
    flex: 1
  },
  top: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  list: {
    flex: 1,
    padding: 10
  },
  bottom: {
    padding: 10
  },
  bottomInputs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'space-between'
  },
  // 公共样式
  button: {
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#3B86FF',
    marginRight: 30,
    marginLeft: 30
  },
});
