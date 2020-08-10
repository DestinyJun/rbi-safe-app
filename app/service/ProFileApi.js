export class ProFileApi {

  // 获取我的个人信息
  static GET_MY_INFO = '/findById';

  // 密码修改
  static UPDATE_MY_PASSWORD = '/modifyPwd';

  // 分页获取隐患排查档案
  static GET_RECORD_LIST = '/hid/findFinishByPage';

  // 获取隐患排查详情
  static GET_RECORD_DETAIL = 'hid/findFinishDetailByCode';

  // 分页获取培训档案
  static GET_TRAIN_LIST = '/getPersonalTrainingFiles';

  // 获取资格证书
  static GET_MY_PROOF = '/training/findCertificate';

  // 获取四级教育卡
  static GET_FOUR_EDU = '/safeFourLevel/findSafeFourLevelByOperatingStaff';

  // APP检查更新
  static UPDATE_APP_MOBILE = '/loadApp';
}
