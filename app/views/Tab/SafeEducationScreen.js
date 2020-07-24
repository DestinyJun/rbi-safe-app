/**
 * desc：  安全教育
 * author：DestinyJun
 * date：  2020/6/17 17:28
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SafeEducationStyles as styles} from "./SafeEducationStyles";
import {Header, Icon} from "react-native-elements";
import {ExamCardComponent} from "../../components/ExamCardComponent";
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";
import {Store} from "../../redux/store";
import {isLoading} from "../../redux/actions";
import {ISLOADING} from "../../redux/actionTypes";


export class SafeEducationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seExamList: null
    };
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
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
        {
          this.state.seExamList?(
            <View style={[styles.remind]}>
              <Icon type={'font-awesome'} name={'exclamation-circle'} size={14} color={'#FF7700'} />
              <Text style={{color: '#FF7700',fontSize: 14,marginLeft: 5}}>{this.state.seExamList.length}项培训计划考试中</Text>
            </View>
          ): null
        }
        <View style={[c_styles.pl_3,c_styles.pr_3]}>
          {
            this.state.seExamList?this.state.seExamList.map((item,index) => (<ExamCardComponent key={index} {...this.props} {...item} />)):null
          }
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.safeEducationInit();
  }
  safeEducationInit() {
    Store.dispatch(isLoading({type: ISLOADING, isLoading: true}));
    // 查询考试信息
    post(EducationApi.GET_EXAM_INFO,{pageNo: 1,pageSize: 10000,processingStatus: 1})
      .then((res) => {
        const arr = [];
        // 查询学习计划
        post(EducationApi.GET_LEARN_INFO,{pageNo: 1,pageSize: 10000})
          .then((val) => {
            Store.dispatch(isLoading({type: ISLOADING, isLoading: false}));
            res.data.contents.forEach((l) => {
              l.isExam = true;
              val.data.contents.map((item) => {
                if (l.trainingPlanId === item.id) {
                  arr.push({
                    exam: l,
                    train: item
                  })
                }
              });
              this.setState({
                seExamList: arr
              });
            })
          })
          .catch((err) => {
            Store.dispatch(isLoading({type: ISLOADING, isLoading: false}));
          });
      })
      .catch((err) => {
        Store.dispatch(isLoading({type: ISLOADING, isLoading: false}));
      })
  }
}
