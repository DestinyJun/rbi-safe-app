import * as React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./app/views/Login/LoginScreen";
import HomeScreen from "./app/views/Tab/HomeScreen";

// 自定义变量
const instructions = Platform.select({
  ios: `这里是iOS看到的文字`,
  android: `这里是Android看到的文字`,
});

// 自定义常量

//  路由
const Stack = createStackNavigator();
const TabStack = createBottomTabNavigator();

// 路由分级
function TabStackScreen() {
  return (
    <TabStack.Navigator initialRouteName={HomeScreen}>
      <TabStack.Screen name={'HomeScreen'} component={HomeScreen} />
      <TabStack.Screen name={'ProFileScreen'} component={ProFileScreen} />
    </TabStack.Navigator>
  )
}


// 导出App
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <NavigationContainer>
          <TabStackScreen />
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'LoginScreen'} headerMode={'none'}>
          <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
