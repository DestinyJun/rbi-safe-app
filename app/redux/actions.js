/*
* 改变状态值的操作函数，相当于改变事件的发起函数
* */
import AsyncStorage from '@react-native-community/async-storage';
import {ISLOADING, ISLOGIN} from "./actionTypes";


// 是否登陆
export const isLogin = (value) => ({type: ISLOGIN, value: value});

// 是否在加载中
export const isLoading = (value) => ({type: ISLOADING, value});

// 初始化登录状态
export function initIsLoginState() {
  return (dispatch) => {
    AsyncStorage.getItem('accessToken')
      .then((res) => {
        if (res) {
          const action = isLogin({isLogin: true});
          dispatch(action);
        } else {
          const action = isLogin({ isLogin: false});
          dispatch(action);
        }
      })
      .catch(() => {
        const action = isLogin({isLogin: false});
        dispatch(action);
      });
  };
}


