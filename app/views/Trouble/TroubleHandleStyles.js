/**
 * desc：  隐患排查处理样式
 * author：DestinyJun
 * date：  2020/7/3 11:10
 */
import {StyleSheet} from 'react-native';

export const TroubleHandleStyles = StyleSheet.create({
  TroubleHandle: {
    flex: 1
  },
  infoList:{
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  siteBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'flex-start',
    padding: 10
  },
  siteBoxTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  // 公共样式
  button: {
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#3B86FF',
    marginRight: 30,
    marginLeft: 30
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10
  },
  borderBottom: {
    borderBottomColor: '#E6E6E8',
    borderBottomWidth: 1
  },
});
