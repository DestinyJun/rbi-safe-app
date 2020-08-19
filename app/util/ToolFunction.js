/**
 * desc：工具类函数
 * author：DestinyJun
 * date：  2020/7/6 19:58
 */

import {Alert} from "react-native";
import {Store} from "../redux/store";
import {isLoading, isLogin} from "../redux/actions";
import {ISLOADING, ISLOGIN} from "../redux/actionTypes";

/**
 * 动态加载echarts函数
 * @param props
 * @param option
 * @returns {string}
 */
export const renderChart1 = (props,option) => {
  return `
      (function() {
        window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data)
        }
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(${JSON.stringify(option)});
         setTimeout(() => {
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,  // 显示第几个series
            dataIndex: 6, // 显示第几个数据
          });
        },100);
       })();
        window.addEventListener("resize", function () {
          myChart.resize();
         });
    `;
};

/**
 * JSON数据字符串序列化与反序列化
 * @param obj 需要序列化的对象
 * @returns {string}
 */
export const JsonToString = (obj) => {
  let result = JSON.stringify(obj, function (key, val) {
    // 对function进行特殊处理
    if (typeof val === 'function') {
      return `~ha~${val}~ha~`;
    }
    return val;
  });
  // 再进行还原
  do {
    result = result.replace('\"~ha~', '').replace('~ha~\"', '').replace(/\\n/g, '').replace(/\\"/g, "\"");//最后一个replace将release模式中莫名生成的\"转换成"
  } while (result.indexOf('~ha~') >= 0);
  return result;
};

/**
 * 判断当前字符串是否为空
 * @param str 需要判断的字符串
 * @returns {boolean}
 */
export function StrIsEmpty(str) {
  return str === null || str === "" || str === undefined;
}

/**
 * 退出登录提醒
 * @param message 错误提醒信息
 */
export function loginOut(message) {
  Alert.alert('消息提醒',message, [
    {text: "重新登录", onPress: () =>{Store.dispatch(isLogin({type: ISLOGIN, isLogin: false}));}, style: "cancel"},
  ], {cancelable: false});
}

/**
 * 成功提醒
 */
export function successRemind(message, navigation,buttonTitle='请重试') {
  Alert.alert('成功提醒',message, [
    {text: buttonTitle, onPress: () =>{navigation.goBack()}, style: "cancel"},
  ], {cancelable: false});
}

/**
 * 失败提醒
 */
export function errorRemind(message, navigation,buttonTitle='请重试') {
  Alert.alert('错误提醒',message, [
    {text: buttonTitle, onPress: () =>{navigation.goBack()}, style: "cancel"},
  ], {cancelable: false});
}

/**
 * dialog
 */
export function dialogRemind(title,message, routerFun,cancelTitle='取消',confirmTitle='确定') {
  Alert.alert(title,message, [
    {text: cancelTitle, onPress: () =>{}, style: "cancel"},
    {text: confirmTitle, onPress: () =>{
      routerFun()
    }},
  ], {cancelable: false});
}

/**
 * dialog
 */
export function singleRemind(title,message,cancelTitle='关闭') {
  Alert.alert(title,message, [
    {text: cancelTitle, onPress: () =>{}, style: "cancel"},
  ], {cancelable: false});
}

/**
 * 显示loading
 */
export function showLoading() {
  Store.dispatch(isLoading({type: ISLOADING, isLoading: true}));
}

/**
 * 隐藏loading
 */
export function hiddenLoading() {
  Store.dispatch(isLoading({type: ISLOADING, isLoading: false}));
}

/**
 * 将设计尺寸转换为dp单位
 */
export function rpx (num) {
  const width = Dimensions.get('window').width;
  const designWidth = 750;
  return num * width / designWidth
}

/**
 * 组织树结构初始化函数
 */
export const treeInit = (data,flag) => {
  const oneChild = [];
  for (const item of data) {
    let childnode: any = {};
    if (flag === 'person') {
      childnode = Object.assign({},{id: item.id,name: item.name,parentId: null});
    } else if (flag === 'question') {
      childnode = Object.assign({},{id: item.safeSubject.id,name: item.safeSubject.subject,parentId: null});
    }
    else {
      childnode = Object.assign({},{id: item.id,name: item.organizationName,parentId: item.parentId});
    }
    if (item.chiled != null && item.chiled.length !== 0) {
      childnode.children = treeInit(item.chiled);
    }
    else {
      childnode.children = [];
    }
    oneChild.push(childnode);
  }
  return oneChild;
};

/**
 * 将base64转换为文件
 * @param dataurl 需要传入的base64码
 * @param filename 需要转成的文件名
 * @returns {File} 返回一个file
 */
export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * 将base64转换为blob
 * @param dataurl 需要传入的base64码
 * @returns {Blob} 返回一个Blob
 */
export  function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 将blob转换为file
 * @param theBlob 传入blob数据
 * @param fileName 传入文件名
 * @returns theBlob 返回一个file
 */
export function blobToFile(theBlob, fileName){
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

/**
 * 保留两位小数换算
 * @param divisor
 * @param dividend
 * @returns {number}
 */
export function percentage(divisor,dividend) {
  const num = parseFloat((parseFloat(divisor) / parseFloat(dividend)).toFixed(2));
  if (num >= 1) {
    return 1
  } else {
    return num;
  }
}

export function openTree(tree) {
  let arr= [];
  const expanded = datas => {
    if (datas&& datas.length > 0){
      datas.forEach(e => {
        arr.push(e);
        expanded(e.sysPermissionList);
      })
    }
  };
  expanded(tree);
  return arr;
}

/**
 * echart参数序列化函数
 * @param props
 * @param option
 * @returns {string}
 */
export function renderChart(props,option){
  return `
      (function() {
        window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data)
        }
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(${JSON.stringify(option)});
         setTimeout(() => {
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,  // 显示第几个series
            dataIndex: 6, // 显示第几个数据
          });
        },100);
       })();
        window.addEventListener("resize", function () {
          myChart.resize();
         });
    `;
}
