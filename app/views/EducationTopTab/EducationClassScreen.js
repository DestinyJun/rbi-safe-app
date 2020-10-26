/**
 * desc：  班组考试
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Button, Icon} from "react-native-elements";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";

export class EducationClassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seExamList: []
    };
    this.unfocus = null;
  }
  render() {
    return (
      <View style={{flex: 1,paddingBottom: 20}}>
        <ScrollView style={{flex: 1}}>
          {
            this.state.seExamList.length>0?this.state.seExamList.map((item,index) => (
                <View style={styles.content} key={index}>
                  <View style={[styles.examCard]}>
                    <View style={styles.title}>
                      <Icon type={'font-awesome'} name={'list-alt'} size={20} color={'#3B86FF'} raised={true}/>
                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 20, color: '#333333', marginLeft: 6}} numberOfLines={1} ellipsizeMode={'tail'}>{item.testPaperName}</Text>
                      </View>
                    </View>
                    <View style={[c_styles.pl_5,c_styles.pt_3]}>
                      {
                        item.idt &&  <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'calendar'} size={16} color={'#3B86FF'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>创建时间：{item.idt}</Text>
                        </View>
                      }
                      {
                        item.operatingStaff && <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'user-o'} size={18} color={'#3B86FF'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>发布人：{item.operatingStaff}</Text>
                        </View>
                      }
                      {
                        item.testResults && <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'diamond'} size={16} color={'#3B86FF'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>考试结果：{item.testResults}</Text>
                        </View>
                      }
                    </View>
                    <View style={[styles.buttons]}>
                      <Button
                        disabled={item.processingStatus === 2}
                        disabledStyle={{backgroundColor: '#BABABA'}}
                        disabledTitleStyle={{color: '#fff'}}
                        title={item.processingStatus === 2?`考试完成`:`开始考试`}
                        onPress={() => {
                          Alert.alert('考前须知', item.examNotes, [
                            {
                              text: '取消考试', onPress: () => {
                              }, style: "cancel"
                            },
                            {
                              text: '开始考试', onPress: () => {
                                this.examStart(item);
                              }
                            },
                          ], {cancelable: false});
                        }}
                        />
                    </View>
                  </View>
                </View>
              ))
              :<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>您还没有任何班组考试！</Text>
          }
        </ScrollView>
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {
    this.unfocus = this.props.navigation.addListener('focus',() => {
      showLoading();
      this.classEducationInit();
    });
  }

  // 组件卸载
  componentWillUnmount() {
    this.unfocus();
  }

  // 开始考试
  examStart(item) {
    this.props.navigation.navigate(
      'EducationExamScreen',
      {
        title: item.testPaperName,
        name: '班组考试',
        exam: item
      }
    );
  };

  // 数据初始化
  classEducationInit() {
    // 分页查询班组试卷
    post(EducationApi.GET_GRAND_EXAM, {pageNo: 1, pageSize: 10000})
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
