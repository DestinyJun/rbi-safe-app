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
    PushNotification.localNotification({
      /* Android Only Properties */
      ticker: "My Notification Ticker", // (optional)
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: "some_tag", // (optional) add tag to message
      group: "group", // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      importance: "high", // (optional) set notification importance, default: high
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
      shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      channelId: "your-custom-channel-id", // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

      actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      /* iOS only properties */
      alertAction: "view", // (optional) default: view
      category: "", // (optional) default: empty string

      /* iOS and Android properties */
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
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
