import * as React from 'react';
import {PermissionsAndroid} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SplashScreen from 'react-native-splash-screen'
import {Button} from 'react-native-elements'

// 通知栏通知配置
import PushNotification from 'react-native-push-notification';

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
import {DoubleInventoryFillScreen} from "./app/views/Double/DoubleInventoryFillScreen";
import {DoubleInventoryCheckScreen} from "./app/views/Double/DoubleInventoryCheckScreen";
import {ProFileRecordScreen} from "./app/views/ProFile/ProFileRecordScreen";
import {ProFileArchivesScreen} from "./app/views/ProFile/ProFileArchivesScreen";
import {ProFileInventoryScreen} from "./app/views/ProFile/ProFileInventoryScreen";
import {ProFileInfoScreen} from "./app/views/ProFile/ProFileInfoScreen";
import {ProFileSafeScreen} from "./app/views/ProFile/ProFileSafeScreen";
import {PlayVideoScreen} from "./app/views/Video/PlayVideoScreen";

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
import {DownFileScreen} from "./app/views/Download/DownFileScreen";
import {ProFileFourEduScreen} from "./app/views/ProFile/ProFileFourEduScreen";
import {ViewPDFScreen} from "./app/views/WebView/ViewPDFScreen";
import {EducationIssueScreen} from "./app/views/Education/EducationIssueScreen";
import {ViewOperationDailyScreen} from "./app/views/WebView/ViewOperationDailyScreen";
import {EducationContentScreen} from "./app/views/EducationTopTab/EducationContentScreen";

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
              <Stack.Screen name={'EducationIssueScreen'} component={EducationIssueScreen}/>
              <Stack.Screen name={'EducationContentScreen'} component={EducationContentScreen}/>
              <Stack.Screen name={'TroubleShortlyScreen'} component={TroubleShortlyScreen}/>
              <Stack.Screen name={'TroubleReportScreen'} component={TroubleReportScreen}/>
              <Stack.Screen name={'TroubleHandleScreen'} component={TroubleHandleScreen}/>
              <Stack.Screen name={'DoubleInventoryCheckScreen'} component={DoubleInventoryCheckScreen}/>
              <Stack.Screen name={'DoubleInventoryFillScreen'} component={DoubleInventoryFillScreen}/>
              <Stack.Screen name={'DoubleInventoryDetailScreen'} component={DoubleInventoryDetailScreen}/>
              <Stack.Screen name={'ProFileRecordScreen'} component={ProFileRecordScreen}/>
              <Stack.Screen name={'ProFileArchivesScreen'} component={ProFileArchivesScreen}/>
              <Stack.Screen name={'ProFileInventoryScreen'} component={ProFileInventoryScreen}/>
              <Stack.Screen name={'ProFileInfoScreen'} component={ProFileInfoScreen}/>
              <Stack.Screen name={'ProFileSafeScreen'} component={ProFileSafeScreen}/>
              <Stack.Screen name={'PlayVideoScreen'} component={PlayVideoScreen}/>
              <Stack.Screen name={'ProFileFourEduScreen'} component={ProFileFourEduScreen}/>
              <Stack.Screen name={'HomeInformationScreen'} component={HomeInformationScreen}/>
              <Stack.Screen name={'UpdateVersionScreen'} component={UpdateVersionScreen}/>
              <Stack.Screen name={'DownFileScreen'} component={DownFileScreen}/>
              <Stack.Screen name={'ViewPDFScreen'} component={ViewPDFScreen}/>
              <Stack.Screen name={'ViewOperationDailyScreen'} component={ViewOperationDailyScreen}/>
            </Stack.Navigator>:
            <Stack.Navigator initialRouteName={'Login'} headerMode={'none'}>
              <Stack.Screen name="Login" component={LoginScreen}/>
            </Stack.Navigator>
        }
        <Button title={'通知测试'} onPress={this.test.bind(this)} />
      </NavigationContainer>
    );
  }
  test() {
    console.log('我执行了');
    PushNotification.localNotification({
      /* iOS and Android properties */
      id: 0,
      title: "我就是想推送",
      message: "京东六一八大放送",
      userInfo: {name: '文君'},
      playSound: true,
      soundName: "default",
      number: 100,
      repeatType: "month",

      /* Android Only Properties */
      ticker: "我的通知",
      showWhen: false,
      autoCancel: true,
      largeIcon: "ic_launcher",
      largeIconUrl: "",
      smallIcon: "ic_notification",
      bigText: "自己单独设置",
      subText: "这是我自己设置内容",
      bigPictureUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600445498227&di=f5c7870e7378152fecd9ebfa56f64846&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D25f1b4664634970a47731027a5cbd1c0%2F8992aa3df8dcd10037838468758b4710b9122f35.jpg",
      color: "red",
      vibrate: true,
      vibration: 300,
      tag: "some_tag",
      group: "我是组",
      groupSummary: false,
      ongoing: false,
      priority: "high",
      visibility: "private",
      importance: "high",
      ignoreInForeground: false,
      shortcutId: "shortcut-id",
      channelId: "your-custom-channel-id",
      onlyAlertOnce: false,

      when: '2020-09-21 15:53',
      usesChronometer: false,
      timeoutAfter: null,

      messageId: "google:message_id",

      invokeApp: true,

      /* iOS only properties */
      alertAction: "view",
      category: "",

    });
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
