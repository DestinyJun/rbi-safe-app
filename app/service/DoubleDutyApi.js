export class DoubleDutyApi {

  // 获取我的责任清单
  static GET_MINE_LIST = '/db_evaluation/findPersonelByPage';

  // 获取待审核责任清单
  static GET_MINE_PENDING = '/db_evaluation/findAuditByPage';

  // 责任区清单填写初始化
  static GET_LIST_FILL = '/db_evaluation/findTemplate';

  // 责任区清单自己填写提交
  static ADD_LIST_FILL = '/db_evaluation/write';

  // 责任区清单审核填写提交
  static ADD_LIST_CHECKED = '/db_evaluation/audit';
}
