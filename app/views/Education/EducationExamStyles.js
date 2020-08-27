/**
 * desc：  开始考试样式
 * author：DestinyJun
 * date：  2020/7/2 15:32
 */
import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
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
  timerDuration: {
    paddingTop: 5,
    paddingBottom: 5,
    color: '#47CF04',
    fontSize: 16,
    borderColor: '#47CF04',
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 15
  },
  topic: {
    flex: 1
  },
  maskLayer: {
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  content: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 15
  }
});
