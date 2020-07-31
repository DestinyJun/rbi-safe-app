/**
 * desc：  考试页面
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {EducationExamStyles as styles} from "./EducationExamStyles";
import {useBackHandler} from "@react-native-community/hooks";
import {Button, Header} from "react-native-elements";
// 自定义组件
import {SingleTopicComponent} from "../../components/SingleTopicComponent";
import {JudgeTopicComponent} from "../../components/JudgeTopicComponent";
import {FillTopicComponent} from "../../components/FillTopicComponent";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {MultipleTopicComponent} from "../../components/MultipleTopicComponent";
// 工具函数类
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";
import {errorRemind, hiddenLoading, showLoading, successRemind} from "../../util/ToolFunction";

function MyCustomLeftComponent(props) {
  const headerLeftOnPress = () => {
    Alert.alert(
      '','您正在考试，是否需要返回？一旦返回，则当前答案无效，需重新考试！',
      [
        {
          text: '取消',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: () => {props.goBack()}
        }
      ]);
  };
  useBackHandler(() => {
    headerLeftOnPress();
    return true;
  });
  return(
   <HeaderLeftComponent headerLeftOnPress={headerLeftOnPress} />
  )
}
export class EducationExamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicList: []
    };
    this.exam = {...props.route.params.exam};
    this.name = props.route.params.name;
    this.params = {
      personnelTrainingRecordId: props.route.params.exam.personnelTrainingRecordId,
      safeAnswerRecordList: []
    };
  }

  render() {
    const {navigation} = {...this.props};
    return (
      <View style={styles.Exam}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<MyCustomLeftComponent {...navigation} />}
          centerComponent={{text: `${this.props.route.params.title}  ${this.props.route.params.name}`,style: {fontSize: 20,color: '#fff'}}}
        />
        {/*<View style={styles.timer}>
          <Text style={[styles.timerText,c_styles.pl_3,c_styles.pr_3]}>模拟考试倒计时     00:35:09</Text>
        </View>*/}
        <ScrollView style={[styles.topic,c_styles.mt_2]}>
          {/* 4填空题 3判断题  2多选题 1单选题 */}
          {
            this.state.topicList && this.state.topicList.map((item,index) => {
              if (item.subjectType === 1) {
                return ( <SingleTopicComponent key={`single${index}`} name={this.name} {...item} onPress={(res) => {this.params.safeAnswerRecordList[index] = res}} />)
              }
              if (item.subjectType === 2) {
                return ( <MultipleTopicComponent key={`multiple${index}`} name={this.name} {...item} onPress={(res) => {this.params.safeAnswerRecordList[index] = res}} />)
              }
              if (item.subjectType === 3) {
                return ( <JudgeTopicComponent key={`judge${index}`} name={this.name} {...item} onPress={(res) => {this.params.safeAnswerRecordList[index] = res}} />)
              }
              if (item.subjectType === 4) {
                return ( <FillTopicComponent key={`fill${index}`} name={this.name} {...item} onPress={(res) => {this.params.safeAnswerRecordList[index] = res}} />)
              }
            })
          }
          <Button title={'结束考试'} buttonStyle={c_styles.button} onPress={this.edExamComplete.bind(this)} />
        </ScrollView>
      </View>
    );
  }

  // 组件挂在后生命周期
  componentDidMount() {
    switch (this.name) {
      case '开始考试':
        this.httpRequestExam(EducationApi.GET_EXAM_PAPER,{id: this.exam.id});
        break;
      case '模拟考试':
        this.httpRequestExam(EducationApi.GET_EXAM_SIMULATION,{trainingPlanId: this.exam.id});
        break;
    }
  }

  // 结束考试操作
  edExamComplete() {
    switch (this.name) {
      case '开始考试':
        this.httpRequestFinishExam(EducationApi.COMPLETE_EXAM);
        break;
      case '模拟考试':
        this.httpRequestFinishExam(EducationApi.COMPLETE_SIMULATION_EXAM);
        break;
    }
  }

  // 请求获取试卷
  httpRequestExam(url,params) {
    showLoading();
    post(url,params)
      .then((res) => {
        this.setState({
          topicList: [
            ...res.data.completion,
            ...res.data.multipleChoiceQuestions,
            ...res.data.judgmentQuestions,
            ...res.data.singleChoiceQuestions
          ]
        });
        hiddenLoading();
      })
      .catch((err) => {
        hiddenLoading();
      })
  }

  // 考试处理请求
  httpRequestFinishExam(url) {
    showLoading();
    const fields = {simulationSafeAnswerRecords: null};
    if (this.name === '模拟考试') {
      fields.simulationSafeAnswerRecords = this.params.safeAnswerRecordList.map((item) => ({
        id: item.testUestionsId,
        answerResults: item.answerResults,
        rightKey: item.rightKey,
        score: item.score,
      }));
    }
    post(url,this.name === '模拟考试'?fields:this.params)
      .then((res) => {
        hiddenLoading();
        successRemind(res.message,this.props.navigation,'返回');
      })
      .catch(err => {
        hiddenLoading();
        errorRemind(err.message,this.props.navigation);
      })
  }
}
