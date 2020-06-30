/*
* 改变状态值的操作函数，相当于改变事件的发起函数
* */
import {ISLOADING} from "./actionTypes";

// 是否登陆
export const isLoading = (value) => ({type: ISLOADING,value});

