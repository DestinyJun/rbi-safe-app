/**
 * axios拦截器
 */
import axios from 'axios';
import {Alert} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {loginOut} from "../util/ToolFunction";

// 无需验证的请求地址
const skipUrl = [
  `/login`,
];

// url跳过验证
function isSkipUrl(url) {
  return skipUrl.includes(url);
}

// 设置全局请求的地址
// axios.defaults.baseURL = 'http://139.9.153.27:8090/security-platform';
axios.defaults.baseURL = 'http://120.77.171.73:8090/security-platform';
// axios.defaults.baseURL = 'http://192.168.28.5:8090/security-platform';

//设置的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// 全局设置超时时间
axios.defaults.timeout = 3000;

// 请求拦截
axios.interceptors.request.use(
  async function (config) {
    console.log(config);
    // 配置请求头参数,判断那些接口需要添加token，那些接口需要添加请求类型，判断APPKEY是否存在
    if (!(isSkipUrl(config.url))) {
      config.headers['accessToken'] = await AsyncStorage.getItem('accessToken');
    }
    // console.log(config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  function (response) {
    console.log(response);
    // console.log(response);
    // 处理200响应数据错误,处理后端各种状态码信息
    if (response.status === 200) {
      if (response.data.status === '1000') {
        return Promise.resolve(response.data);
      } else {
        // 不是1000状态码，一律抛出异常
        switch (response.data.status) {
          case '1002':
            loginOut('当前登录已过期，请重新登录！');
            break;
          case '1005':
            loginOut(response.data.message);
            break;
          case '1009':
            loginOut(response.data.message);
            break;
          default:
            break;
        }
        return Promise.reject(response.data);
      }
    }
    else {
      return Promise.reject(response.data);
    }
  },
  function (error) {
    // console.log(error);
    const str = error.message;
    if (error.status) {
      // 请求超时处理,判断请求异常信息中是否含有超时timeout字符串
      if (str.includes('timeout')) {
        Alert.alert('', '网络请求超时，是否重试？', [
          {
            text: '确定', onPress: () => {
              location.reload();
            }
          },
          {
            text: '取消', onPress: () => {
              location.reload();
            }
          },
        ]);
      }
      else {
        switch (error.status) {
          // 404请求不存在
          case 404:
            Alert.alert('', '网络错误，请检查网络！', [
              {text: "关闭", onPress: () =>{}, style: "cancel"},
              {text: "重新加载", onPress: () => {location.reload();}}
            ],{cancelable: false});
            break;
          // 其他错误，直接抛出错误提示
          default:
            break;
        }
      }
    }
    // 处理响应失败
   return Promise.reject(error);
  }
);

// 封装get请求
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err)
      })
  });
}

// 封装post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  });
}
