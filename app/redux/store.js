/**
 * desc：redux最核心的管理对象store
 * author：DestinyJun
 * date：  2020/6/30 16:57
 */
import {applyMiddleware, createStore} from "redux";
import {Reducer} from "./reducer";
import thunk from "redux-thunk";

export const Store = createStore(Reducer, applyMiddleware(thunk));
