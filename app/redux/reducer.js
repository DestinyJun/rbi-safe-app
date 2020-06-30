/**
 * desc：reducer函数：根据旧的state和指定的action处理返回新的state
 * author：DestinyJun
 * date：  2020/6/30 17:03
 */
import { ISLOADING } from "./actionTypes";

const defaultState = {
  isLoading: false
};

export function Reducer(state = defaultState, action) {
  switch (action.type) {
    case ISLOADING:
      state.isLoading = action.value.isLoading;
      return state;
    default:
      return state;
  }
}
