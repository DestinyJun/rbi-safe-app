/**
 * desc：  开始考试样式
 * author：DestinyJun
 * date：  2020/7/2 15:32
 */
import {StyleSheet} from 'react-native';

export const EducationExamStyles = StyleSheet.create({
  Exam: {
    flex: 1
  },
  timer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  timerText: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#FF0000',
    fontSize: 16,
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 20
  },
  topic: {
    flex: 1
  }
});
