/**
 * desc：  考试面板组件
 * author：DestinyJun
 * date：  2020/7/2 14:35
 */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Icon, Slider, Text, Button,} from "react-native-elements";
import {percentage} from "../util/ToolFunction";

export class ExamCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      train: props.train,
      exam: props.exam ? props.exam : null,
    };
    this.navigation = props.exam;
}

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.title, c_styles.pt_1, c_styles.pb_1]}>
          <Icon type={'font-awesome'} name={'list-alt'} size={20} color={'#3B86FF'} raised={true}/>
          <Text style={{fontSize: 20, color: '#333333', marginLeft: 6}}>{this.state.train.trainingContent}</Text>
        </View>
        <View style={[styles.timer, c_styles.pl_5]}>
          <View style={[styles.timerBox]}>
            <Icon type={'font-awesome'} name={'calendar'} size={16} color={'#3B86FF'}/>
            <Text
              style={[c_styles.h6, c_styles.ml_2]}>培训时间：{this.state.train.startTime?this.state.train.startTime.split(' ')[0]:''}—{this.state.train.endTime?this.state.train.endTime.split(' ')[0]:''}</Text>
          </View>
          {
            this.state.exam && <View style={[styles.timerBox]}>
              <Icon type={'font-awesome'} name={'clock-o'} size={18} color={'#3B86FF'}/>
              <Text style={[c_styles.h6, c_styles.ml_2]}>考试时间：{this.state.exam.startTime?this.state.exam.startTime.split(' ')[0]:''}—{this.state.exam.endTime?this.state.exam.endTime.split(' ')[0]:''}</Text>
            </View>
          }
        </View>
        <View style={[styles.progress, c_styles.pl_5, c_styles.pt_3, c_styles.pb_3]}>
          <View style={[styles.progressTitle]}>
            <Text style={[c_styles.h5]}>学习进度</Text>
            <Text style={[c_styles.h5, {color: '#307AEC'}]}>{this.state.train.finishStudyTime?Math.floor(percentage(this.state.train.finishStudyTime,this.state.train.trainingDuration)*100): 0}%</Text>
          </View>
          <Slider
            thumbStyle={{backgroundColor: 'transparent'}}
            disabled={true}
            trackStyle={{height: 8, borderRadius: 5}}
            maximumTrackTintColor={'#F2F2F2'}
            minimumTrackTintColor={'#3883FA'}
            value={this.state.train.finishStudyTime?percentage(this.state.train.finishStudyTime,this.state.train.trainingDuration): 0}/>
        </View>
        <View style={[styles.buttons]}>
          {
            this.state.exam ?
              <Button
                title={'开始考试'}
                TouchableComponent={TouchableOpacity}
                buttonStyle={[styles.buttonsStyles, {backgroundColor: '#63DCAF'}]}
                onPress={() => {
                  Alert.alert('考前须知', this.props.exam.examNotes, [
                    {
                      text: '取消考试', onPress: () => {
                      }, style: "cancel"
                    },
                    {
                      text: '开始考试', onPress: () => {
                        this.examStart();
                      }
                    },
                  ], {cancelable: false});
                }}/> :
              <Button
                disabled={true}
                title={'开始考试'}
                buttonStyle={[styles.buttonsStyles, {backgroundColor: '#63DCAF'}]}
                titleStyle={{color: '#3883FA'}}
              />
          }
          <Button title={'继续学习'} buttonStyle={[styles.buttonsStyles, {backgroundColor: '#3883FA'}]}
                  onPress={this.continueStudy.bind(this)}/>
        </View>
      </View>
    );

  }

  examStart() {
    // 开始考试
    this.props.navigation.navigate(
      'EducationExamScreen',
      {
        title: this.state.exam.testPaperName,
        name: '开始考试',
        exam: this.state.exam
      }
    );
  };

  // 继续学习
  continueStudy() {
    this.props.navigation.navigate(
      'EducationTrainScreen',
      {
        title: this.state.train.trainingContent,
        train: this.state.train
      })
  };

  // 模拟考试
  imitateExam(item) {
    this.props.navigation.navigate(
      'EducationExamScreen',
      {
        title: '2020第四期',
        name: '模拟考试'
      }
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 10,
    paddingLeft: 12,
    paddingRight: 15
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
  progressTitle: {
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
