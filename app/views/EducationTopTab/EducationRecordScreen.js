/**
 * desc：  班主活动记录
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";
import {Icon} from "react-native-elements";

export class EducationRecordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordList: []
    };
    this.unfocus = null;
  }

  render() {
    return (
      <View style={{flex: 1,paddingBottom: 20}}>
        <ScrollView style={{flex: 1}}>
          {
            this.state.recordList.length>0?this.state.recordList.map((item,index) => (
                <View style={styles.content} key={index}>
                  <View style={[styles.examCard]}>
                    <View style={styles.title}>
                      <Icon type={'font-awesome'} name={'list-alt'} size={20} color={'#23344E'} raised={true}/>
                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 20, color: '#333333', marginLeft: 6}} numberOfLines={1} ellipsizeMode={'tail'}>{item.testPaperName}</Text>
                      </View>
                    </View>
                    <View style={[c_styles.pl_5,c_styles.pt_3]}>
                      {
                        item.idt &&  <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'calendar'} size={16} color={'#23344E'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>创建时间：{item.idt}</Text>
                        </View>
                      }
                      {
                        item.operatingStaff && <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'user'} size={18} color={'#23344E'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>发布人：{item.operatingStaff}</Text>
                        </View>
                      }
                      {
                        item.name && <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'user-o'} size={18} color={'#23344E'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>考试人：{item.name}</Text>
                        </View>
                      }
                      {
                        item.testResults && <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'diamond'} size={16} color={'#23344E'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>考试结果：{item.testResults}</Text>
                        </View>
                      }
                    </View>
                  </View>
                </View>
              ))
              :<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>您还没有任何班主考试记录！</Text>
          }
        </ScrollView>
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {
    this.unfocus = this.props.navigation.addListener('focus',() => {
      showLoading();
      this.recordEducationInit();
    });
  }

  // 组件卸载
  componentWillUnmount() {
    this.unfocus();
  }

  // 数据初始化
  recordEducationInit() {
    // 分页查询班主试卷
    post(EducationApi.GET_GRAND_LIST, {pageNo: 1, pageSize: 10000})
      .then((res) => {
        hiddenLoading();
        this.setState({
          recordList: [...res.data.contents]
        })
      })
      .catch((err) => {
        hiddenLoading();
      });
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  examCard: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
    paddingLeft: 12,
    paddingRight: 15
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  progressTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    paddingBottom: 20,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonsStyles: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20
  }
});
