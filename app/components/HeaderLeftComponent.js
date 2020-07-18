/**
 * desc：  头部返回按钮
 * author：DestinyJun
 * date：  2020/7/18 22:38
 */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from "react-native-elements";

export function HeaderLeftComponent(props) {
  return (
    <TouchableOpacity style={[{paddingRight: 36},c_styles.pt_3,c_styles.pb_3]} onPress={props.headerLeftOnPress}>
      <Icon type='font-awesome' name={'angle-left'} color={'#fff'} size={30} />
    </TouchableOpacity>
  );
}
