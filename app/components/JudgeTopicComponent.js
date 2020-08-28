/**
 * desc：  判断题组件
 * author：DestinyJun
 * date：  2020/7/16 16:15
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from "react-native-elements";
export class JudgeTopicComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checked: props.safeSubjectOptionList ? props.safeSubjectOptionList.map(() => false) : props.safeTestQuestionOptionsList ? props.safeTestQuestionOptionsList.map(() => false) : props.questionsOptionsList ? props.questionsOptionsList.map(() => false) : props.safeSubjectOptions.map(() => false)
    };
    this.arr = props.safeSubjectOptionList ? props.safeSubjectOptionList.map(() => false) : props.safeTestQuestionOptionsList ? props.safeTestQuestionOptionsList.map(() => false) : props.questionsOptionsList ? props.questionsOptionsList.map(() => false) : props.safeSubjectOptions.map(() => false);
    this.questionOptions = props.safeSubjectOptionList ? [...props.safeSubjectOptionList] : props.safeTestQuestionOptionsList ? [...props.safeTestQuestionOptionsList] : props.questionsOptionsList ? [...props.questionsOptionsList] : [...props.safeSubjectOptions];
    props.onPress({
      isInit: true,
      answerResults: '',
      testUestionsId: props.id,
      rightKey: props.rightKey,
      score: props.score,
      testPapreId: props.testPapreId,
      questionBankSubjectId: props.questionBankSubjectId?props.questionBankSubjectId: '',
      twTestPapreId: props.twTestPapreId?props.twTestPapreId: '',
    });
  }
  render() {
    return (
      <View style={[styles.container,c_styles.p_4]}>
        <View style={styles.title}>
          <View style={[styles.titleTag]}>
            <Text style={[styles.titleTagText,c_styles.h5,c_styles.text_white]}>判断</Text>
          </View>
          <View style={[styles.titleContent,c_styles.pl_3]} >
            <Text style={[c_styles.h6]}>{`${this.props.serial+1}、${this.props.subject}`}</Text>
          </View>
        </View>
        <View style={[styles.choose]}>
          {
            this.state.checked.map((item,index) => (
              <CheckBox
                key={`judge${index}`}
                title={this.questionOptions[index].option}
                titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                size={20}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={this.checkOnPress.bind(this,index,this.questionOptions[index].order)}
                checked={item}
              />
            ))
          }
        </View>
      </View>
    );
  }
  checkOnPress(index,res){
    this.arr = this.arr.map(() => false);
    this.arr[index] = true;
    this.setState({
      checked: this.arr.map(item => item)
    },() => {
      this.props.onPress({
        answerResults: res,
        testUestionsId: this.props.id,
        rightKey: this.props.rightKey,
        score: this.props.score,
        testPapreId: this.props.testPapreId,
        questionBankSubjectId: this.props.questionBankSubjectId?this.props.questionBankSubjectId: '',
        twTestPapreId: this.props.twTestPapreId?this.props.twTestPapreId: '',
      });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleTag: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTagText: {
    backgroundColor: '#47CF04',
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleContent: {
    flex: 5,
  },
});
