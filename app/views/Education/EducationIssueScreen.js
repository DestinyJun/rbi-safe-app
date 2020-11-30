/**
 * desc：  帮助活动发布
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, ScrollView, Alert, Text} from 'react-native';
import {EducationIssueStyles as styles} from "./EducationIssueStyles";
import {useBackHandler} from "@react-native-community/hooks";
import {Button, Header, ListItem} from "react-native-elements";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
// 工具函数类
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";
import {hiddenLoading, showLoading, singleRemind, successRemind} from "../../util/ToolFunction";
import {PickerTreeComponent} from "../../components/PickerTreeComponent";
import {Picker} from "@react-native-community/picker";

function MyCustomLeftComponent(props) {
  const headerLeftOnPress = () => {
    Alert.alert(
      '','返回后您填写的所有信息将会被清空，确定要返回吗？',
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
export class EducationIssueScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicList: [],
      bankList: [],
      bankTitle:'0',
      questionList: [],
      questionTitle: null,
      personList: [],
      personTitle: null,
    };
    this.submitField = {};
  }

  render() {
    const {navigation} = {...this.props};
    return (
      <View style={styles.Issue}>
        <Header
          statusBarProps={{backgroundColor: '#23344E'}}
          containerStyle={{backgroundColor: '#23344E',zIndex: 1}}
          leftComponent={<MyCustomLeftComponent {...navigation} />}
          centerComponent={{text: `班组活动发布`,style: {fontSize: 20,color: '#fff'}}}
        />
        <ScrollView style={[styles.input,c_styles.mt_2]}>
          <ListItem
            containerStyle={{backgroundColor: 'none'}}
            bottomDivider={true} title={'考试时长'}
            titleStyle={{color: '#9D9D9D'}}
            input={{
              keyboardType: 'numeric',
              inputStyle: {borderWidth: 0,fontSize: 16,color: '#9D9D9D'},
              placeholder: '请输入考试时长',
              onChangeText: (text) => {this.submitField = Object.assign(this.submitField,{duration:text});
              }}}
          />
          <ListItem
            containerStyle={{backgroundColor: 'none'}}
            bottomDivider={true} title={'试卷名称'}
            titleStyle={{color: '#9D9D9D'}}
            input={{
              inputStyle: {borderWidth: 0,fontSize: 16,color: '#9D9D9D'},
              placeholder: '请输入试卷名称',
              onChangeText: (text) => {this.submitField = Object.assign(this.submitField,{testPaperName:text});
              }}}
          />
          <ListItem
            containerStyle={{backgroundColor: 'none'}}
            bottomDivider={true} title={'考试须知'}
            titleStyle={{color: '#9D9D9D'}}
            input={{
              inputStyle: {borderWidth: 0,fontSize: 16,color: '#9D9D9D'},
              placeholder: '请输入考试须知',
              onChangeText: (text) => {this.submitField = Object.assign(this.submitField,{examNotes:text})}}}
          />
          <ListItem
            containerStyle={{backgroundColor: 'none'}}
            bottomDivider={true}
            title={'考试人'}
            titleStyle={{color: '#9D9D9D'}}
            chevron={true}
            rightElement={ this.state.personList.length>0?<PickerTreeComponent
              confirmPress={(res) => {
                if (!res) {
                  return;
                }
                const arr = [];
                res.forEach((item) => {
                for (let l of this.state.personList) {
                  if (l.id === item) {
                    arr.push(l)
                  }
                }
                });
                const personName = arr.map((item) => (item.name));
                this.setState({
                  personTitle: personName.join(',')
                });
                this.submitField = Object.assign(this.submitField,{targetSet:res.join(',')})
              }}
              selectType={'multiple'}
              flag={'person'}
              centerTitle={'请选择成员'}
              treeData={this.state.personList}
              title={this.state.personTitle?this.state.personTitle:'点击选择考试人'}
              titleStyle={{color: '#9D9D9D'}}
              buttonStyle={{backgroundColor: 'unset',padding: 0,width: 200,justifyContent: 'flex-end'}}
            />: <Text style={{color: '#A4A4A4',fontSize: 16}}>暂无考试人可选</Text>}
          />
          <ListItem
            containerStyle={{backgroundColor: 'none'}}
            bottomDivider={true} title={'题库选择'}
            titleStyle={{color: '#9D9D9D'}}
            rightElement={
              <Picker
                selectedValue={this.state.bankTitle}
                style={{height: 50, width: 200,flexDirection: 'row',justifyContent: 'flex-end'}}
                onValueChange={(itemValue, itemIndex) =>{
                  this.setState({
                    bankTitle: itemValue
                  });
                  this.getQuestionOnPress(itemValue);
                }
                }>
                <Picker.Item label="请选择题库" value="0" itemStyle={{color: 'red'}} />
                {
                  this.state.bankList.map((item,index) => {
                    return (
                      <Picker.Item key={index} label={item.subjectStoreName} value={item.id} />
                    )
                  })
                }
              </Picker>
            }
          />
          <ListItem
            containerStyle={{backgroundColor: 'none'}}
            bottomDivider={true} title={'题目选择'}
            titleStyle={{color: '#9D9D9D'}}
            chevron={true}
            rightElement={this.state.bankTitle === '0'?<Text style={{color: '#A4A4A4',fontSize: 16}}>请先先择题库</Text>:<PickerTreeComponent
              confirmPress={(res) => {
                if (!res) {
                  return;
                }
                const arr = [];
                res.forEach((item) => {
                  for (let l of this.state.questionList) {
                    if (l.safeSubject.id === item) {
                      arr.push({
                        questionBankSubjectId: l.safeSubject.id,
                        subject: l.safeSubject.subject,
                        subjectType: l.safeSubject.subjectType,
                        rightKey: l.safeSubject.rightKey,
                        score: l.safeSubject.score,
                        questionsOptionsList: l.safeSubjectOptionList,
                      })
                    }
                  }
                });
                this.setState({
                  questionTitle: res.join(',')
                });
                this.submitField = Object.assign(this.submitField,{typeWorkTestPaperQuestionsList: arr})
              }}
              selectType={'multiple'}
              flag={'question'}
              centerTitle={'请选择题目'}
              treeData={this.state.questionList}
              title={this.state.questionTitle?this.state.questionTitle:'点击选择题目'}
              titleStyle={{color: '#9D9D9D'}}
              buttonStyle={{backgroundColor: 'unset',padding: 0,width: 200,justifyContent: 'flex-end'}}
            />}
          />
          <Button
            disabled={!this.state.personTitle && !this.state.questionTitle}
            disabledStyle={{backgroundColor: '#A0A0A0' }}
            disabledTitleStyle={{color: '#fff'}}
            title={'确定发布'}
            buttonStyle={c_styles.button}
            onPress={this.sureIssue.bind(this)}
          />
        </ScrollView>
      </View>
    );
  }

  // 组件挂在后生命周期
  componentDidMount() {
    showLoading();
    // 分页获取成员列表
    post(EducationApi.GET_PERSON_LIST,{pageNo: 1,pageSize: 10000 })
      .then((res) => {
        this.setState({
          personList: [...res.data.contents]
        });
        hiddenLoading();
      })
      .catch((err) => {
        hiddenLoading();
      });
    // 分页获取题库列表
    post(EducationApi.GET_TOPIC_BANK,{pageNo: 1,pageSize: 10000 })
      .then((res) => {
        this.setState({
          bankList: [...res.data]
        });
      })
      .catch((err) => {
        hiddenLoading();
      });
  }

  // 根据题库ID查询题目
  getQuestionOnPress(id) {
    showLoading();
    post(EducationApi.GET_QUESTION_LIST,{pageNo: 1,pageSize: 100000,subjectStoreId: id })
      .then((res) => {
        this.setState({
          questionList: [...res.data.contents]
        });
        hiddenLoading();
      })
      .catch((err) => {
        hiddenLoading();
      });
  }

  // 确认发布
  sureIssue() {
    showLoading();
    post(EducationApi.ISSUE_GRAND_EXAM,{typeWorkTestPaper:  this.submitField})
      .then((res) => {
        hiddenLoading();
        successRemind(res.message,this.props.navigation,'返回');
      })
      .catch((err) => {
        hiddenLoading();
        singleRemind('请求异常',err.message)
      });
  }
}
