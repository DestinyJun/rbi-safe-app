export class EducationApi {

  // 分页获取自身考试信息
  static GET_EXAM_INFO = '/pagingTestPaperInfo';

  // 分页获取学习计划
  static GET_LEARN_INFO = '/getLearningInformation';

  // 根据考试ID获取试卷信息
  static GET_EXAM_PAPER = '/getTestPaper';

  // 完成考试
  static COMPLETE_EXAM = '/completeTheExam';

  // 根据培训计划id查询培训内容
  static GET_TRAIN_INFO = '/getLearningContentById';
}
