/**
 * desc：  考试页面
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, ScrollView, Alert, Text, TouchableWithoutFeedback} from 'react-native';
import {EducationExamStyles as styles} from "./EducationExamStyles";
import {useBackHandler} from "@react-native-community/hooks";
import {Button, Header} from "react-native-elements";
import Modal from "react-native-translucent-modal";
// 自定义组件
import {SingleTopicComponent} from "../../components/SingleTopicComponent";
import {JudgeTopicComponent} from "../../components/JudgeTopicComponent";
import {FillTopicComponent} from "../../components/FillTopicComponent";
import {MultipleTopicComponent} from "../../components/MultipleTopicComponent";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {TopicSingleCheckedComponent} from "../../components/TopicSingleCheckedComponent";
import {TopicMultipleCheckedComponent} from "../../components/TopicMultipleCheckedComponent";
import {TopicJudgeCheckedComponent} from "../../components/TopicJudgeCheckedComponent";
import {TopicFillCheckedComponent} from "../../components/TopicFillCheckedComponent";
// 工具函数类
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";
import {errorRemind, hiddenLoading, showLoading, successRemind} from "../../util/ToolFunction";
import {CountdownComponent} from "../../components/CountdownComponent";


function MyCustomLeftComponent(props) {
  const headerLeftOnPress = () => {
    if (props.remind) {
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
    }
    else {
      props.goBack();
    }
  };
  useBackHandler(() => {
    headerLeftOnPress();
    return true;
  });
  return(
   <HeaderLeftComponent headerLeftOnPress={headerLeftOnPress}  />
  )
}
export class EducationExamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicList: [],
      topicListAnswer: [],
      isVisible: false,
      topicListCallback: [],
      resultNumber: 0,
      totalNumber: 0,
      duration: 0, // 考试时长
    };
    this.exam = {...props.route.params.exam};
    this.name = props.route.params.name;
    this.timeControl = null;
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
          statusBarProps={{backgroundColor: '#23344E'}}
          containerStyle={{backgroundColor: '#23344E',zIndex: 1}}
          leftComponent={<MyCustomLeftComponent {...navigation} remind={this.state.topicList.length>0} />}
          centerComponent={{text: `${this.props.route.params.title}  ${this.props.route.params.name}`,style: {fontSize: 20,color: '#fff'}}}
        />
        <View style={styles.timer}>
          <Text style={[styles.timerText,c_styles.pl_3,c_styles.pr_3]}>当前进度 {this.state.topicListAnswer.length} / {this.state.topicList.length}</Text>
          {
            this.name !== '模拟考试'?<Text style={[styles.timerDuration,c_styles.pl_3,c_styles.pr_3]}>
              {this.state.duration > 0 ? <CountdownComponent duration={this.state.duration} timerStop={() => {
                Alert.alert(
                  '', '考试时间已到，请立即交卷或取消考试！',
                  [
                    {
                      text: '交卷',
                      onPress: () => {
                        this.edExamComplete();
                      },
                      style: 'cancel'
                    },
                    {
                      text: '取消考试',
                      onPress: () => {
                        navigation.goBack()
                      }
                    }
                  ]);
              }}/> : '考试中...'}
            </Text> : null
          }

        </View>
        <ScrollView style={[styles.topic,c_styles.mt_2]} keyboardShouldPersistTaps={'always'}>
           {/*4填空题 3判断题  2多选题 1单选题*/}
          {
            this.state.topicList.length>0?this.state.topicList.map((item,index) => {
              if (item.subjectType === 1) {
                return ( <SingleTopicComponent serial={index} key={`single${index}`} name={this.name} {...item} onPress={(res) => {
                  if (!this.state.topicListAnswer.includes(res.testUestionsId)) {
                    const arr = [...this.state.topicListAnswer];
                    arr.push(res.testUestionsId);
                    if (!('isInit' in res)) {
                      this.setState({
                        topicListAnswer: arr
                      });
                    }
                  }
                  this.params.safeAnswerRecordList[index] = res
                }} />)
              }
              if (item.subjectType === 2) {
                return ( <MultipleTopicComponent serial={index} key={`multiple${index}`} name={this.name} {...item} onPress={(res) => {
                  if (!this.state.topicListAnswer.includes(res.testUestionsId)) {
                    const arr = [...this.state.topicListAnswer];
                    arr.push(res.testUestionsId);
                    if (!('isInit' in res)) {
                      this.setState({
                        topicListAnswer: arr
                      });
                    }
                  }
                  this.params.safeAnswerRecordList[index] = res;
                }} />)
              }
              if (item.subjectType === 3) {
                return ( <JudgeTopicComponent serial={index} key={`judge${index}`} name={this.name} {...item} onPress={(res) => {
                  if (!this.state.topicListAnswer.includes(res.testUestionsId)) {
                    const arr = [...this.state.topicListAnswer];
                    arr.push(res.testUestionsId);
                    if (!('isInit' in res)) {
                      this.setState({
                        topicListAnswer: arr
                      });
                    }
                  }
                  this.params.safeAnswerRecordList[index] = res
                }} />)
              }
              if (item.subjectType === 4) {
                return ( <FillTopicComponent serial={index} key={`fill${index}`} name={this.name} {...item} onPress={(res) => {
                  if (!this.state.topicListAnswer.includes(res.testUestionsId)) {
                    const arr = [...this.state.topicListAnswer];
                    arr.push(res.testUestionsId);
                    if (!('isInit' in res)) {
                      this.setState({
                        topicListAnswer: arr
                      });
                    }
                  }
                  this.params.safeAnswerRecordList[index] = res;
                }} />)
              }
            }): <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h4]}>暂时无考试题目，请您联系管理员添加！</Text>
          }
          {
            this.state.topicList.length>0&&<Button title={'结束考试'} buttonStyle={c_styles.button} onPress={this.edExamComplete.bind(this)} />
          }
        </ScrollView>
        <Modal
          visible={this.state.isVisible}
          transparent={true}
          onRequestClose={() => {
            this.setState({isVisible: false});
          }}
        >
          <View style={styles.container}>
          {/*START 遮罩层*/}
          <TouchableWithoutFeedback onPress={() => {
            this.setState({isVisible: false});
          }}>
            <View style={styles.maskLayer}/>
          </TouchableWithoutFeedback>
          {/*END 遮罩层*/}
          <View style={styles.content}>
            <View style={styles.scrollContent}>
              <ScrollView style={[styles.topic,c_styles.mt_2]} keyboardShouldPersistTaps={'always'}>
                {/*4填空题 3判断题  2多选题 1单选题*/}
                {
                  this.state.topicListCallback.length>0?this.state.topicListCallback.map((item,index) => {
                    if (item.subjectType === 1) {
                      return ( <TopicSingleCheckedComponent disabled={true} serial={index} key={`single${index}`} name={this.name} {...item} onPress={(res) => {}} />)
                    }
                    if (item.subjectType === 2) {
                      return ( <TopicMultipleCheckedComponent disabled={true} serial={index} key={`multiple${index}`} name={this.name} {...item} onPress={(res) => {}} />)
                    }
                    if (item.subjectType === 3) {
                      return ( <TopicJudgeCheckedComponent disabled={true} serial={index} key={`judge${index}`} name={this.name} {...item} onPress={(res) => {}} />)
                    }
                    if (item.subjectType === 4) {
                      return ( <TopicFillCheckedComponent disabled={true} serial={index} key={`fill${index}`} name={this.name} {...item} />)
                    }
                  }): <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h4]}>您没有回答任何一道题！</Text>
                }
                <View style={[c_styles.pl_5,c_styles.pr_5]}>
                  <Text style={{fontSize: 16,paddingBottom: 10}}>当前得分：{this.state.resultNumber}</Text>
                  <Text style={{fontSize: 16,paddingBottom: 10}}>总分：{this.state.totalNumber}</Text>
                  <Button title={'返回'} onPress={() => {
                    this.props.navigation.goBack();
                  }} />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      </View>
    );
  }

  // 组件挂在后生命周期
  componentDidMount() {
    if (this.name === '开始考试') {
      this.httpRequestExam(EducationApi.GET_EXAM_PAPER,{id: this.exam.id});
    }
    else if (this.name === '模拟考试') {
      this.httpRequestExam(EducationApi.GET_EXAM_SIMULATION,{trainingPlanId: this.exam.id});
    }
    else {
      this.httpRequestExam(EducationApi.GET_GRAND_TRAIN,{twTestPapreId: this.exam.twTestPapreId});
    }
  }

  // 组件销毁后生命周期函数
  componentWillUnmount() {
    clearInterval(this.timeControl);
  }

  // 结束考试操作
  edExamComplete() {
    if (this.name === '开始考试') {
      this.httpRequestFinishExam(EducationApi.COMPLETE_EXAM);
    }
    else if (this.name === '模拟考试') {
      this.httpRequestFinishExam(EducationApi.COMPLETE_SIMULATION_EXAM);
    }
    else {
      this.httpRequestFinishExam(EducationApi.SUBMIT_GRAND_TRAIN);
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
          ],
          duration: res.data.duration
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
    const gradeFields = {
      id: this.exam.id,
      safeTWAnswerRecordList: null
    };
    const startFields = {
      personnelTrainingRecordId: this.params.personnelTrainingRecordId,
      safeAnswerRecordList: null
    };
    const arr = [];
    if (this.name === '模拟考试') {
      for (let item of this.params.safeAnswerRecordList) {
        if (item) {
          arr.push({
            id: item.testUestionsId,
            answerResults: item.answerResults,
            rightKey: item.rightKey,
            score: item.score,
          })
        }
      }
      fields.simulationSafeAnswerRecords = arr;
    }
    if (this.name === '班组考试') {
      for (let item of this.params.safeAnswerRecordList) {
        if (item) {
          arr.push({
            twTestUestionsId: item.testUestionsId,
            answerResults: item.answerResults,
            questionBankSubjectId: item.questionBankSubjectId,
            rightKey: item.rightKey,
            score: item.score,
            twTestPapreId: item.twTestPapreId,
          })
        }
      }
      gradeFields.safeTWAnswerRecordList = arr;
    }
    if (this.name === '开始考试') {
      for (let item of this.params.safeAnswerRecordList) {
        if (item) {
          arr.push(item)
        }
      }
      startFields.safeAnswerRecordList = arr;
    }
    post(url,this.name === '模拟考试'?fields:this.name === '班组考试'?gradeFields:startFields)
      .then((res) => {
        console.log(res);
        hiddenLoading();
        if (this.name === '模拟考试') {
          const arr = [];
          this.state.topicList.map((topic) => {
            res.data.simulationSafeAnswerRecords.forEach((item) => {
              if (item.id === topic.id) {
                arr.push({...topic,correct: item.correct,answerResults: item.answerResults})
              }
            });
          });
          this.setState({
            resultNumber:res.data.result,
            totalNumber:res.data.totalScore,
            topicListCallback: [...arr]
          },() => {
            this.setState({
              isVisible: true
            })
          });
        }
        else {
          successRemind(res.message,this.props.navigation,'返回');
        }
      })
      .catch(err => {
        hiddenLoading();
        errorRemind(err.message,this.props.navigation);
      })
  }
}
