export class EducationApi {

  // 分页获取自身考试信息
  static GET_EXAM_INFO = '/pagingTestPaperInfo';

  // 分页获取学习计划
  static GET_LEARN_INFO = '/getLearningInformation';

  // 根据考试ID获取正式试卷信息
  static GET_EXAM_PAPER = '/getTestPaper';

  // 正式考试完成
  static COMPLETE_EXAM = '/completeTheExam';

  // 根据考试ID获取模拟试卷信息
  static GET_EXAM_SIMULATION = '/getSimulationTestPaper';

  // 模拟考试完成
  static COMPLETE_SIMULATION_EXAM = '/completeSimulationTheExam';

  // 根据培训计划id查询培训内容
  static GET_TRAIN_INFO = '/getLearningContentById';

  // 获取自身错题信息
  static GET_ERROR_TOPIC = '/findByPage';

  //  完成错题训练
  static COMPLETE_ERROR_EXAM = '/handlePersonalMistakes';

  //  添加学时
  static ADD_STUDY_TIME= '/addFinishStudyTime';

  // 分页获取公司人员信息
  static GET_PERSON_LIST = '/company_personnel/query/page';

  // 分页获取题库列表
  static GET_TOPIC_BANK = '/getAllSubjectStoreName';

  // 根据题库ID分页查询题目
  static GET_QUESTION_LIST = '/safeSubject/getSafeSubjectByPageAndSubjectStoreId';

  // 发布班主活动试卷
  static ISSUE_GRAND_EXAM = '/typeWorkTestPaper/releaseTypeWorkTestPaper';

  // 发布班主活动试卷
  static GET_GRAND_EXAM = '/typeWorkTestPaper/obtainTypeWorkTestPaper';

  // 发布班主活动试卷
  static GET_GRAND_TRAIN = '/typeWorkTestPaper/getTypeWorkTestPaper';

  // 提交班主活动试卷
  static SUBMIT_GRAND_TRAIN = '/typeWorkTestPaper/submitTypeWorkTestPaper';

  // 获取班组活动列表
  static GET_GRAND_LIST = '/typeWorkTestPaper/organizationTypeWorkTestPaper';
}
