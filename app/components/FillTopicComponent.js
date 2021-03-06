/**
 * desc：  填空题组件
 * author：DestinyJun
 * date：  2020/7/16 16:15
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input} from "react-native-elements";
export class FillTopicComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.arr = props.rightKey.split('#');
    this.answer = this.arr.map(() => null);
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
            <Text style={[styles.titleTagText,c_styles.h5,c_styles.text_white]}>填空</Text>
          </View>
          <View style={[styles.titleContent,c_styles.pl_3]} >
            <Text style={[c_styles.h6]}>{`${this.props.serial+1}、${this.props.subject}`}</Text>
          </View>
        </View>
        <View style={[styles.choose]}>
          {
            this.arr.map((item,index) => (
              <Input
                key={`fill${index}`}
                placeholder={`请输入第${index+1}个空的答案`}
                placeholderTextColor={'#C9C9C9'}
                inputContainerStyle={{borderColor: '#F5F5F5'}}
                onChangeText={this.onInputChange.bind(this,index)}
              />
            ))
          }
        </View>
      </View>
    );
  }

  onInputChange(index,text){
    this.answer[index] = text;
    this.props.onPress({
      answerResults: this.answer.join('#')?this.answer.join('#'): null,
      testUestionsId: this.props.id,
      rightKey: this.props.rightKey,
      score: this.props.score,
      testPapreId: this.props.testPapreId,
      questionBankSubjectId: this.props.questionBankSubjectId?this.props.questionBankSubjectId: '',
      twTestPapreId: this.props.twTestPapreId?this.props.twTestPapreId: '',
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
    backgroundColor: '#FB6955',
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleContent: {
    flex: 5,
  },
  choose:{}
});
