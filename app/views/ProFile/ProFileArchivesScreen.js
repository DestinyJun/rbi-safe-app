/**
 * desc：  我的培训档案
 * author：DestinyJun
 * date：  2020/7/3 17:53
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {ProFileArchivesStyles as styles} from "./ProFileArchivesStyles";
import {Button, Header, Icon} from "react-native-elements";
import Modal from "react-native-translucent-modal";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {TopicSingleCheckedComponent} from "../../components/TopicSingleCheckedComponent";
import {TopicMultipleCheckedComponent} from "../../components/TopicMultipleCheckedComponent";
import {TopicJudgeCheckedComponent} from "../../components/TopicJudgeCheckedComponent";
import {TopicFillCheckedComponent} from "../../components/TopicFillCheckedComponent";
// 自定义工具类
import {errorRemind, hiddenLoading, showLoading, singleRemind, successRemind} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";

export class ProFileArchivesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seExamList: [],
      isVisible: false,
      topicListCallback: [],
    };
  }

  render() {
    return (
      <View style={styles.Archives}>
        <Header
          statusBarProps={{backgroundColor: '#23344E'}}
          containerStyle={{backgroundColor: '#23344E', zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {
            this.props.navigation.goBack()
          }}/>}
          centerComponent={{text: `我的培训档案`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={{flex: 1,paddingBottom: 20}}>
          <ScrollView style={{flex: 1}}>
            {
              this.state.seExamList.length>0?this.state.seExamList.map((item,index) => (
                  <View style={styles.content} key={index}>
                    <View style={[styles.examCard]}>
                      <View style={styles.title}>
                        <Icon type={'font-awesome'} name={'list-alt'} size={20} color={'#23344E'} raised={true}/>
                        <View style={{flex: 1}}>
                          <Text style={{fontSize: 20, color: '#333333', marginLeft: 6}} numberOfLines={1} ellipsizeMode={'tail'}>{item.trainingContent}</Text>
                        </View>
                      </View>
                      <View style={[c_styles.pl_5,c_styles.pt_3]}>
                        {
                          item.trainingime &&  <View style={[styles.timerBox]}>
                            <Icon type={'font-awesome'} name={'calendar'} size={16} color={'#23344E'}/>
                            <Text
                              style={[c_styles.h6, c_styles.ml_2]}>培训时间：{item.trainingime}</Text>
                          </View>
                        }
                        {
                          item.examinationTime && <View style={[styles.timerBox]}>
                            <Icon type={'font-awesome'} name={'clock-o'} size={18} color={'#23344E'}/>
                            <Text style={[c_styles.h6, c_styles.ml_2]}>考试时间：{item.examinationTime}</Text>
                          </View>
                        }
                        {
                          item.testResults && <View style={[styles.timerBox]}>
                            <Icon type={'font-awesome'} name={'graduation-cap'} size={18} color={'#23344E'}/>
                            <Text style={[c_styles.h6, c_styles.ml_2]}>考试成绩：{item.testResults}</Text>
                          </View>
                        }
                      </View>
                      <View style={[styles.buttons]}>
                        <Button
                          title={`查看考试详情`}
                          titleStyle={{color: '#fff'}}
                          buttonStyle={[styles.buttonsStyles]}
                          onPress={this.getExamDetail.bind(this,item)}
                        />
                      </View>
                    </View>
                  </View>
                ))
                :<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>您还没有任何培训！</Text>
            }
          </ScrollView>
        </View>
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
            <View style={styles.maskContent}>
              <View style={styles.scrollContent}>
                <ScrollView style={[styles.topic,c_styles.mt_2]} keyboardShouldPersistTaps={'always'}>
                  {/*4填空题 3判断题  2多选题 1单选题*/}
                  {
                    this.state.topicListCallback.length>0?this.state.topicListCallback.map((item,index) => {
                      if (item.subjectType === 1) {
                        return ( <TopicSingleCheckedComponent disabled={true} serial={index} key={`single${index}`} name={this.name} {...item} />)
                      }
                      if (item.subjectType === 2) {
                        return ( <TopicMultipleCheckedComponent disabled={true} serial={index} key={`multiple${index}`} name={this.name} {...item} />)
                      }
                      if (item.subjectType === 3) {
                        return ( <TopicJudgeCheckedComponent disabled={true} serial={index} key={`judge${index}`} name={this.name} {...item} />)
                      }
                      if (item.subjectType === 4) {
                        return ( <TopicFillCheckedComponent disabled={true} serial={index} key={`fill${index}`} name={this.name} {...item} />)
                      }
                    }): <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h4]}>您没有回答任何一道题！</Text>
                  }
                  <View style={[c_styles.pl_5,c_styles.pr_5]}>
                    <Button title={'返回'} onPress={() => {
                      this.setState({
                        isVisible: false
                      })
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

  // 组件挂载
  componentDidMount() {
    showLoading();
    // 查询培训计划信息
    post(ProFileApi.GET_TRAIN_LIST, {pageNo: 1, pageSize: 10000})
      .then((train) => {
        hiddenLoading();
        this.setState({
          seExamList: [...train.data.contents]
        })
      })
      .catch((err) => {
        hiddenLoading();
      });
  }

  // 查看考试详情
  getExamDetail(item) {
    showLoading();
    post(ProFileApi.GET_EXAM_DETAIL,{testPapreId: item.testPapreId, personnelTrainingRecordId: item.personnelTrainingRecordId})
      .then((res) => {
        if (res.data) {
          this.setState({
            topicListCallback: [
              ...res.data.completion,
              ...res.data.multipleChoiceQuestions,
              ...res.data.judgmentQuestions,
              ...res.data.singleChoiceQuestions
            ]
          },() => {
            this.setState({
              isVisible: true
            })
          });
        } else {
          singleRemind('消息提醒','此培训还未考试！');
        }
        hiddenLoading();
      })
      .catch(err => {
        hiddenLoading();
        singleRemind('错误提醒',err.message);
      })
  }
}
