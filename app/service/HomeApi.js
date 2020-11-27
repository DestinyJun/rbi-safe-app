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
}
