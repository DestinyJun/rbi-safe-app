/**
 * desc：  安全教育
 * author：DestinyJun
 * date：  2020/6/17 17:28
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SafeEducationStyles as styles} from "./SafeEducationStyles";
import {Header, Icon, Button} from "react-native-elements";
import {ExamCardComponent} from "../../components/ExamCardComponent";
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";


export class SafeEducationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seExamList: []
    };
    this.unfocus = null;
  }
  render() {
    return (
      <View style={[styles.SafeEducation]}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
            marginBottom: 10
          }}
          centerComponent={{ text: '安全教育培训', style: { color: '#fff', fontSize: 18 } }}
          rightComponent={<Button title={'错题库'} buttonStyle={{backgroundColor:'#226AD5'}} onPress={this.errorTopicStart.bind(this)} />}
        />
        {
          this.state.seExamList.length>0?(
            <View style={[styles.remind]}>
              <Icon type={'font-awesome'} name={'exclamation-circle'} size={14} color={'#FF7700'} />
              <Text style={{color: '#FF7700',fontSize: 14,marginLeft: 5}}>{this.state.seExamList.length}项培训计划考试中</Text>
            </View>
          ): null
        }
        <View style={[c_styles.pl_3,c_styles.pr_3,{flex: 1}]}>
          <ScrollView style={{flex: 1}}>
            {
              this.state.seExamList.length>0?
                this.state.seExamList.map((item,index) => (<ExamCardComponent key={index} {...this.props} train={item} />)):
                <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>请联系管理员给您添加培训计划！</Text>
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {
    this.unfocus = this.props.navigation.addListener('focus',() => {
      showLoading();
      this.safeEducationInit();
    });
  }

  // 组件卸载
  componentWillUnmount() {
    this.unfocus();
  }

  // 数据初始化
  safeEducationInit() {
    // 查询培训计划信息
    post(EducationApi.GET_LEARN_INFO,{pageNo: 1,pageSize: 10000 })
      .then((train) => {
        // 查询考试
        post(EducationApi.GET_EXAM_INFO,{pageNo: 1,pageSize: 10000,processingStatus: 1})
          .then((exam) => {
            train.data.contents.forEach((trainItem) => {
              exam.data.contents.forEach((examItem) => {
                if (trainItem.id === examItem.trainingPlanId) {
                  trainItem.exam = examItem;
                }
              })
            });
            this.setState({
              seExamList: train.data.contents.map((res) => res)
            });
            hiddenLoading();
          })
          .catch((err) => {
            hiddenLoading();
          });
      })
      .catch((err) => {
        hiddenLoading();
      });
  }

  // 错题训练
  errorTopicStart() {
    // 开始考试
    this.props.navigation.navigate(
      'EducationErrorScreen',
      {
        name: '错题训练',
      }
    );
  };
}
