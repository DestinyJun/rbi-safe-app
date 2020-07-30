export class TroubleApi {

  // 分页获取隐患处理列表
  static GET_HANDLE_LIST = '/hid/findDealByPage';

  // 获取列表状态
  static GET_HANDLE_STATUS= '/hid/findAdmChoose';

  // 获取整改负责人列表
  static GET_PERSON_LIST= '/hid/findCorrector';

  // 获取组织树
  static GET_ORG_LIST= '/getOrganizationTree';

  // 立即整改
  static ADD_STRAIGHTAWAY_TRO= '/hid/rectifyImmediately';

  // 上报整改
  static ADD_REPORT_TRO= '/hid/addReport2';

  // 隐患详情
  static TROUBLE_INFO_LIST= '/hid/findDealDetailByCode';
}
