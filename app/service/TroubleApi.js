export class TroubleApi {

  // 分页获取隐患处理列表（测试通过）
  static GET_HANDLE_LIST = '/hid/findDealByPage';

  // 获取列表状态
  static GET_HANDLE_STATUS= '/hid/findAdmChoose';

  // 获取整改负责人列表（测试通过）
  static GET_PERSON_LIST= '/hid/findCorrector';

  // 获取组织树（测试通过）
  static GET_ORG_LIST= '/getOrganizationTree';

  // 立即整改（测试通过）
  static ADD_STRAIGHTAWAY_TRO= '/hid/rectifyImmediately';

  // 上报整改（测试通过）
  static ADD_REPORT_TRO= '/hid/addReport2';

  // 隐患详情（测试通过）
  static TROUBLE_INFO_LIST= '/hid/findDealDetailByCode';

  // 完成整改（测试通过）
  static FINISH_RECTIFY= '/hid/complete2';

  // 通知整改（测试通过）
  static NOTICE_RECTIFY= '/hid/rectification_notice';

  // 审核通过（测试通过）
  static VERIFY_SUCCESS= '/hid/audit_pass';

  // 审核不通过（测试通过）
  static VERIFY_ERROR= '/hid/audit_false';

  // 上报处理（测试通过）
  static REPORT_HANDLE= '/hid/report';

}
