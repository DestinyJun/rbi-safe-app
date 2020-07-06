/**
 * desc：静态内容动态化及常量
 * author：DestinyJun
 * date：  2020/3/23 22:33
 */

// 加载图片
export const IMAGE_FILE_LIST = require('../assets/images/login_bg.png');

// 加载头像
export const HEADER_IMAGE = {
  img: require('../assets/images/秀智1.jpg'),
};

// 个人信息导航菜单
export const PROFILE_TOP_MENU_LIST = [
  {
    title: '隐患排查记录',
    icon: 'av-timer',
    routerName: 'ProFileRecordScreen'
  },
  {
    title: '我的培训档案',
    icon: 'flight-takeoff',
    routerName: 'ProFileArchivesScreen'
  },
  {
    title: '一岗双责检查清单',
    icon: 'flight-takeoff',
    routerName: 'ProFileInventoryScreen'
  },
];
export const PROFILE_BOTTOM_MENU_LIST = [
  {
    title: '我的信息',
    icon: 'av-timer',
    routerName: 'ProFileInfoScreen'
  },
  {
    title: '账号与安全',
    icon: 'flight-takeoff',
    routerName: 'ProFileSafeScreen'
  },
];

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

