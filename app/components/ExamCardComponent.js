/**
 * desc：  考试面板组件
 * author：DestinyJun
 * date：  2020/7/2 14:35
 */
import React, {useState} from 'react';
import {View,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon, Slider, Text, Button,} from "react-native-elements";

export function ExamCardComponent(props) {
  const {train,exam,navigation} = {...props};
  const examStart = (item) => {
    // 开始考试
    navigation.navigate(
      'EducationExamScreen',
      {
        title: item.testPaperName,
        name: '开始考试',
        exam: item
      }
    );
  };
  // 继续学习
  const continueStudy = (item) => {
    navigation.navigate(
      'EducationTrainScreen',
      {
        title: item.trainingContent,
        train: item
      })
  };
  // 模拟考试
  const imitateExam = (item) => {
    navigation.navigate(
      'EducationExamScreen',
      {
        title: '2020第四期',
        name: '模拟考试'
      }
    );
  };
  return (
    <View style={[styles.container,c_styles.pl_3,c_styles.pr_4]}>
      <View style={[styles.title,c_styles.pt_1,c_styles.pb_1]}>
        <Icon type={'font-awesome'} name={'list-alt'} size={20} color={'#3B86FF'} raised={true} />
        <Text style={{fontSize: 20,color: '#333333',marginLeft: 6}}>{train.trainingContent}</Text>
      </View>
      <View style={[styles.timer,c_styles.pl_5]}>
        <View style={[styles.timerBox]}>
          <Icon type={'font-awesome'} name={'calendar'} size={16} color={'#3B86FF'}/>
          <Text style={[c_styles.h6,c_styles.ml_2]}>培训时间：{train.startTime}—{train.endTime}</Text>
        </View>
        <View style={[styles.timerBox]}>
          <Icon type={'font-awesome'} name={'clock-o'} size={18} color={'#3B86FF'}/>
          <Text style={[c_styles.h6,c_styles.ml_2]}>考试时间：{exam.startTime}—{exam.endTime}</Text>
        </View>
      </View>
      <View style={[styles.progress,c_styles.pl_5,c_styles.pt_3,c_styles.pb_3]}>
       {/* <View style={[styles.progressTitle]}>
          <Text style={[c_styles.h5]}>学习进度</Text>
          <Text style={[c_styles.h5,{color: '#307AEC'}]}>60%</Text>
        </View>
        <Slider
          thumbStyle={{backgroundColor: 'transparent'}}
          disabled={true}
          trackStyle={{height: 8,borderRadius: 5}}
          maximumTrackTintColor={'#F2F2F2'}
          minimumTrackTintColor={'#3883FA'}
          value={0.6}/>*/}
      </View>
      <View style={[styles.buttons]}>
        {
          exam.isExam?
          <Button
            title={'开始考试'}
            TouchableComponent={TouchableOpacity}
            buttonStyle={[styles.buttonsStyles,{backgroundColor: '#63DCAF'}]}
            onPress={examStart.bind(this,exam)} />:
          <Button
            title={'模拟考试'}
            type={'outline'}
            buttonStyle={[styles.buttonsStyles,{borderColor: '#3883FA'}]}
            titleStyle={{color: '#3883FA'}}
            onPress={imitateExam.bind(this,train)} />
        }
        <Button title={'继续学习'} buttonStyle={[styles.buttonsStyles,{backgroundColor: '#3883FA'}]} onPress={continueStudy.bind(this,train)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 1
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 6
  },
  progressTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20
  },
  buttonsStyles: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20
  }
});
