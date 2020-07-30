import {AppRegistry} from 'react-native';
import c_styles from './app/styles/c_styles'; // 该全局文件的倒入只需一次，且需要在其他文件声明之前
import App from './App';
import {name as appName} from './app.json';


/********START 开启debug请求监控**************/
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
/********END开启debug请求监控**************/

/*********START 关闭全部黄色警告 *************/
console.ignoredYellowBox = [
  'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
  'source.uri should not be an empty string',
  'Invalid props.style key',
];
console.disableYellowBox = true;
 /*********END 关闭全部黄色警告 **************/

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent(appName, () => App);
