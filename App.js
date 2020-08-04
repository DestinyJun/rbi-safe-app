import * as React from 'react';
import {PermissionsAndroid} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SplashScreen from 'react-native-splash-screen'

// 路由屏幕
import {LoginScreen} from "./app/views/Login/LoginScreen";
import {HomeScreen} from "./app/views/Tab/HomeScreen";
import {ProFileScreen} from "./app/views/Tab/ProFileScreen";
import {SafeEducationScreen} from "./app/views/Tab/SafeEducationScreen";
import {TroubleShootScreen} from "./app/views/Tab/TroubleShootScreen";
import {DoubleDutyScreen} from "./app/views/Tab/DoubleDutyScreen";
import {EducationExamScreen} from "./app/views/Education/EducationExamScreen";
import {EducationTrainScreen} from "./app/views/Education/EducationTrainScreen";
import {TroubleShortlyScreen} from "./app/views/Trouble/TroubleShortlyScreen";
import {TroubleReportScreen} from "./app/views/Trouble/TroubleReportScreen";
import {TroubleHandleScreen} from "./app/views/Trouble/TroubleHandleScreen";
import {DoubleInventoryMakeScreen} from "./app/views/Double/DoubleInventoryMakeScreen";
import {DoubleInventoryFillScreen} from "./app/views/Double/DoubleInventoryFillScreen";
import {DoubleInventoryCheckScreen} from "./app/views/Double/DoubleInventoryCheckScreen";
import {ProFileRecordScreen} from "./app/views/ProFile/ProFileRecordScreen";
import {ProFileArchivesScreen} from "./app/views/ProFile/ProFileArchivesScreen";
import {ProFileInventoryScreen} from "./app/views/ProFile/ProFileInventoryScreen";
import {ProFileInfoScreen} from "./app/views/ProFile/ProFileInfoScreen";
import {ProFileSafeScreen} from "./app/views/ProFile/ProFileSafeScreen";
import {PlayVideoScreen} from "./app/views/Video/PlayVideoScreen";
import {DownloadScreen} from "./app/views/Download/DownloadScreen";

// 自定义工具
import {Store} from "./app/redux/store";
import {initIsLoginState} from "./app/redux/actions";

// 自定义组件
import {TabButtonComponent} from "./app/components/TabButtonComponent";
import {FocusStatusBarComponent} from "./app/components/FocusStatusBarComponent";
import {FullScreenLoadingComponent} from "./app/components/FullScreenLoadingComponent";
import {EducationErrorScreen} from "./app/views/Education/EducationErrorScreen";
import {HomeInformationScreen} from "./app/views/Home/HomeInformationScreen";
import {DoubleInventoryDetailScreen} from "./app/views/Double/DoubleInventoryDetailScreen";
import {UpdateVersionScreen} from "./app/views/Update/UpdateVersionScreen";
import {singleRemind} from "./app/util/ToolFunction";

// 创建路由对象
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// tab路由
function TabBarScreen() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      backBehavior={'none'}
      lazy={true}
      tabBar={props => {
        <FocusStatusBarComponent backgroundColor={'#226AD5'}/>;
        return <TabButtonComponent {...props} />
      }}
    >
      <Tab.Screen name={'Home'} options={{title: '首页'}} component={HomeScreen}/>
      <Tab.Screen name={'SafeEducation'} options={{title: '安全教育'}} component={SafeEducationScreen}/>
      <Tab.Screen name={'TroubleShoot'} options={{title: '隐患排查'}} component={TroubleShootScreen}/>
      <Tab.Screen name={'DoubleDuty'} options={{title: '一岗双责'}} component={DoubleDutyScreen}/>
      <Tab.Screen name={'ProFile'} options={{title: '我的'}} component={ProFileScreen}/>
    </Tab.Navigator>
  )
}

// 导出App
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: Store.getState().isLogin
    };
    const isLogin = initIsLoginState();
    Store.dispatch(isLogin);
    this.subscription = Store.subscribe(() => {
      this.setState({
        isLogin: Store.getState().isLogin
      })
    });
  }

  render() {
    return (
      <NavigationContainer>
        <FullScreenLoadingComponent/>
        {
          this.state.isLogin?
            <Stack.Navigator initialRouteName={'TabBarScreen'} headerMode={'none'}>
              <Stack.Screen name={'TabBarScreen'} component={TabBarScreen}/>
              <Stack.Screen name={'EducationExamScreen'} component={EducationExamScreen}/>
              <Stack.Screen name={'EducationTrainScreen'} component={EducationTrainScreen}/>
              <Stack.Screen name={'EducationErrorScreen'} component={EducationErrorScreen}/>
              <Stack.Screen name={'TroubleShortlyScreen'} component={TroubleShortlyScreen}/>
              <Stack.Screen name={'TroubleReportScreen'} component={TroubleReportScreen}/>
              <Stack.Screen name={'TroubleHandleScreen'} component={TroubleHandleScreen}/>
              <Stack.Screen name={'DoubleInventoryMakeScreen'} component={DoubleInventoryMakeScreen}/>
              <Stack.Screen name={'DoubleInventoryFillScreen'} component={DoubleInventoryFillScreen}/>
              <Stack.Screen name={'DoubleInventoryCheckScreen'} component={DoubleInventoryCheckScreen}/>
              <Stack.Screen name={'DoubleInventoryDetailScreen'} component={DoubleInventoryDetailScreen}/>
              <Stack.Screen name={'ProFileRecordScreen'} component={ProFileRecordScreen}/>
              <Stack.Screen name={'ProFileArchivesScreen'} component={ProFileArchivesScreen}/>
              <Stack.Screen name={'ProFileInventoryScreen'} component={ProFileInventoryScreen}/>
              <Stack.Screen name={'ProFileInfoScreen'} component={ProFileInfoScreen}/>
              <Stack.Screen name={'ProFileSafeScreen'} component={ProFileSafeScreen}/>
              <Stack.Screen name={'PlayVideoScreen'} component={PlayVideoScreen}/>
              <Stack.Screen name={'DownloadScreen'} component={DownloadScreen}/>
              <Stack.Screen name={'HomeInformationScreen'} component={HomeInformationScreen}/>
              <Stack.Screen name={'UpdateVersionScreen'} component={UpdateVersionScreen}/>
            </Stack.Navigator>:
            <Stack.Navigator initialRouteName={'Login'} headerMode={'none'}>
              <Stack.Screen name="Login" component={LoginScreen}/>
            </Stack.Navigator>
        }
      </NavigationContainer>
    );
  }

  componentDidMount() {
    this.requestPermission();
    SplashScreen.hide();//关闭启动屏幕
  }

  componentWillUnmount() {
    this.subscription();
  }

  // 权限获取
  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]
      );
      if (granted["android.permission.CAMERA"] !== 'granted' || granted["android.permission.WRITE_EXTERNAL_STORAGE"] !== 'granted') {
        singleRemind('权限获取','权限获取异常，某些功能可能无法使用！')
      }
    } catch (err) {
      singleRemind('权限获取','权限获取异常，某些功能可能无法使用！')
    }
  };
}
