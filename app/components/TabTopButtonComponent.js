/**
 * desc：  tab显示按钮组件
 * author：DestinyJun
 * date：  2020/6/30 22:01
 */
import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from "react-native-elements";

export function TabTopButtonComponent({state, descriptors, navigation}) {
  // 设置tab切换栏是否可见
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={{flexDirection: 'row',height: 60}}>
      {state.routes.map((route, index) => {
        // 颜色面板定义
        // const colors = ['red','blue','pink','orange','skyblue'];
        // 获取tab按钮标签文字
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        // tab栏点击事件
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        // tab栏长按事件
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // 字体颜色
        const textColor = isFocused ? '#3B86FF' : '#BABABA';
        // 字体图标
        const icons = [
          {
            type: 'ionic',
            name: 'home'
          },
          {
            type: 'ionic',
            name: 'tv'
          },
          {
            type: 'ionic',
            name: 'pageview'
          },
          {
            type: 'ionic',
            name: 'dns'
          },
          {
            type: 'ionic',
            name: 'person'
          },
        ];
        // 返回tabBar的element元素
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{flex: 1}}
          >
            <View style={[styles.tabBar]}>
              {/*<Icon name={icons[index].name} size={20} color={textColor} />*/}
              <Text style={{color: textColor,fontSize: 14}}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6,
    paddingTop: 6,
    backgroundColor: '#FFFFFF'
  }
});
