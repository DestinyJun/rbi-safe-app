/**
 * desc：  安全培训
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Icon} from "react-native-elements";
import {ExamCardComponent} from "../../components/ExamCardComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";

export class EducationSafeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seExamList: []
    };
    this.unfocus = null;
  }

  render() {
    return (
      <View style={{flex: 1,position: 'relative'}}>
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
}
const styles = StyleSheet.create({
  remind: {
    height: 22,
    ...c_styles.w_100,
    backgroundColor: '#FBCF92',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 9
  }
});
