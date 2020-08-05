/**
 * desc：reducer函数：根据旧的state和指定的action处理返回新的state
 * author：DestinyJun
 * date：  2020/6/30 17:03
 */
import {ISLOADING, ISLOGIN, ISUPDATEAPP} from "./actionTypes";

const defaultState = {
  isLogin: false,
  isLoading: false,
  isUpdateApp: false,
};

export function Reducer(state = defaultState, action) {
  switch (action.type) {
    case ISLOGIN:
      state.isLogin = action.value.isLogin;
      return state;
    case ISLOADING:
      state.isLoading = action.value.isLoading;
      return state;
    case ISUPDATEAPP:
      state.isUpdateApp = action.value.isUpdateApp;
      return state;
    default:
      return state;
  }
}
