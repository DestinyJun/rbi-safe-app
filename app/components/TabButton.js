/**
 * desc：  tab显示按钮组件
 * author：DestinyJun
 * date：  2020/6/30 22:01
 */
import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export function TabButton({state, descriptors, navigation}) {
  // 设置tab切换栏是否可见
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={{flexDirection: 'row',height: 60,backgroundColor: 'red'}}>
      {state.routes.map((route, index) => {
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
          console.log(event);
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

        // 返回tabBar的element元素
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}
          >
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
