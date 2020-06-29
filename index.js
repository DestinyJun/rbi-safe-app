import { registerRootComponent } from 'expo';
import c_styles from './app/styles/c_styles'; // 该全局文件的倒入只需一次，且需要在其他文件声明之前
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
