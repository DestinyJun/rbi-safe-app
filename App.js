import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {LoginScreen} from "./app/views/Login/LoginScreen";
import {HomeScreen} from "./app/views/Tab/HomeScreen";
import {ProFileScreen} from "./app/views/Tab/ProFileScreen";
import {SafeEducationScreen} from "./app/views/Tab/SafeEducationScreen";
import {TroubleShootScreen} from "./app/views/Tab/TroubleShootScreen";
import {DoubleDutyScreen} from "./app/views/Tab/DoubleDutyScreen";
// 自定义工具
import {Store} from "./app/redux/store";

// 自定义组件
import {TabButton} from "./app/components/TabButton";
import {FocusStatusBar} from "./app/components/FocusStatusBar";
import {EducationExamScreen} from "./app/views/Education/EducationExamScreen";
import {EducationTrainScreen} from "./app/views/Education/EducationTrainScreen";

//  路由
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// tab路由
function TabBarScreen() {
  return (
    <Tab.Navigator
      initialRouteName={'TroubleShoot'}
      backBehavior={'none'}
      lazy={true}
      tabBar={props =>{
        <FocusStatusBar backgroundColor={'#226AD5'}/>;
        return <TabButton {...props} />
      }}
    >
      <Tab.Screen name={'Home'} options={{title: '首页'}} component={HomeScreen} />
      <Tab.Screen name={'SafeEducation'} options={{title: '安全教育'}} component={SafeEducationScreen}  />
      <Tab.Screen name={'TroubleShoot'} options={{title: '隐患排查'}} component={TroubleShootScreen}  />
      <Tab.Screen name={'DoubleDuty'} options={{title: '一岗双责'}} component={DoubleDutyScreen}  />
      <Tab.Screen name={'ProFile'} options={{title: '我的'}} component={ProFileScreen}  />
    </Tab.Navigator>
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
          <Stack.Navigator initialRouteName={'TabBarScreen'}>
            <Stack.Screen name={'TabBarScreen'} component={TabBarScreen} options={{headerShown: false}} />
            <Stack.Screen name={'EducationExamScreen'} component={EducationExamScreen} />
            <Stack.Screen name={'EducationTrainScreen'} component={EducationTrainScreen} />
          </Stack.Navigator>
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
