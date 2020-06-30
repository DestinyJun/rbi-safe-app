import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import LoginScreen from "./app/views/Login/LoginScreen";
import HomeScreen from "./app/views/Tab/HomeScreen";
import ProFileScreen from "./app/views/Tab/ProFileScreen";

// 自定义工具
import {Store} from "./app/redux/store";
import {SafeEducationScreen} from "./app/views/Tab/SafeEducationScreen";
import {TroubleShootScreen} from "./app/views/Tab/TroubleShootScreen";
import {DoubleDutyScreen} from "./app/views/Tab/DoubleDutyScreen";

// 自定义组件
import {TabButton} from "./app/components/TabButton";

//  路由
const Stack = createStackNavigator();
const TabStack = createBottomTabNavigator();

// 路由分级
function TabStackScreen() {
  return (
    <TabStack.Navigator
      initialRouteName={'Home'}
      backBehavior={'none'}
      lazy={true}
      tabBar={props => <TabButton {...props} />}
    >
      <TabStack.Screen name={'Home'} component={HomeScreen} />
      <TabStack.Screen name={'SafeEducation'} component={SafeEducationScreen} />
      <TabStack.Screen name={'TroubleShoot'} component={TroubleShootScreen} />
      <TabStack.Screen name={'DoubleDuty'} component={DoubleDutyScreen} />
      <TabStack.Screen name={'ProFile'} component={ProFileScreen} />
    </TabStack.Navigator>
  )
}


// 导出App
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: Store.getState().isLoading
    };
    Store.subscribe(() => {
      this.setState({
        isLoading: Store.getState().isLoading
      })
    })
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
        <Stack.Navigator initialRouteName={'Login'} headerMode={'none'}>
          <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
