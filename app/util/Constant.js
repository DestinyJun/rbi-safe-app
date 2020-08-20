/**
 * desc：静态内容动态化及常量
 * author：DestinyJun
 * date：  2020/3/23 22:33
 */

// 加载图片
export const IMAGE_FILE_LIST = require('../assets/images/login_bg.png');
export const IMAGE_VIDEO_1= require('../assets/images/video1.png');
export const HEADER_IMAGE = require('../assets/images/秀智1.jpg');
export const IMAGE_HOME_ONE = require('../assets/images/home1.png');
export const IMAGE_HOME_TWO = require('../assets/images/home2.png');
export const IMAGE_HOME_THREE = require('../assets/images/home3.png');

// 服务器地址
export const SERVER_ADDRESS_TEST = 'http://www.gyrbi.com/safetest';
export const SERVER_ADDRESS_PROD = 'http://61.189.169.44:8090';

// 个人信息导航菜单
export const PROFILE_TOP_MENU_LIST = [
  {
    title: '隐患排查记录',
    icon: 'server',
    type: 'font-awesome',
    routerName: 'ProFileRecordScreen'
  },
  {
    title: '我的培训档案',
    icon: 'clone',
    type: 'font-awesome',
    routerName: 'ProFileArchivesScreen'
  },
  {
    title: '我的资格证书',
    icon: 'calendar-minus-o',
    type: 'font-awesome',
    routerName: 'ProFileInventoryScreen'
  },
  {
    title: '我的四级HSE教育卡',
    icon: 'address-card-o',
    type: 'font-awesome',
    routerName: 'ProFileFourEduScreen'
  }
];
export const PROFILE_BOTTOM_MENU_LIST = [
  {
    title: '我的信息',
    icon: 'person-outline',
    type: 'material',
    routerName: 'ProFileInfoScreen'
  },
  {
    title: '账号与安全',
    icon: 'lock',
    type: 'material',
    routerName: 'ProFileSafeScreen'
  },
];

// 表单填写返回提醒
export const INPUT_BACK_REMIND_MESSAGE = '您是否需要返回？若返回则填写的数据将全部清空！';

// 隐患类型数组信息
export const TROUBLE_ARR_TYPE = ['人','物','管理'];

// 隐患等级数组信息
export const TROUBLE_ARR_GRADE = ['一般','重大'];

// 整改状态
export const TROUBLE_STATUS_LIST = [
  '上报未整改',
  '责令未整改',
  '已通知待整改',
  '已整改待审核',
  '审核通过',
  '审核不通过',
];

// 常见文件后缀名及对应类型
export const FILE_TYPE = {
  '.doc': 'application/msword',
  '.docx': 'application/msword',
  '.pdf': 'application/application/pdf',
  '.pps': 'application/vnd.ms-powerpoint',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.ms-powerpoint',
  '.wps': 'application/vnd.ms-works',
  '.xlsx': 'application/vnd.ms-excel',
  '.xls': 'application/vnd.ms-excel',
};

// echarts模板
export const HTML = `
<!DOCTYPE html>
<html>
<head>
  <title>echarts</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=320, user-scalable=no">
  <script src="https://libs.cdnjs.net/echarts/4.7.0/echarts.min.js"></script>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
    }
    .line-box{
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
<div id="main" class="line-box" ></div>
</body>
</html>
`;

