/**
 * desc：
 * author：DestinyJun
 * date：  2020/8/2 17:53
 */
export class HomeApi {

  // 获取总综合信息
  static GET_MINE_LIST = '/notice/findByPage';

  // 获取月隐患折现统计图
  static ECHARTS_TROUBLE_MONTH = '/monitor_warning/findIndex';

  // 安全管理培训计划统计
  static ECHARTS_SAFE_MANAGER = '/monitor_warning/findPercentage';

  // 猫场铝矿监测预警
  static GET_CAT_LIST = '/accident/catFindAll';

  // 麦坝铝矿监测预警
  static GET_WHEAT_LIST = '/accident/maiBanFindAll';

  // 麦坝铝矿监测预警
  static GET_RIVER_LIST = '/accident/xiaoChangCongFindAll';
}
