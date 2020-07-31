/**
 * desc：  多选题组件
 * author：DestinyJun
 * date：  2020/7/16 16:15
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from "react-native-elements";
export class MultipleTopicComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checked: props.safeSubjectOptionList?props.safeSubjectOptionList.map(() => false):props.safeTestQuestionOptionsList.map(() => false)
    };
    this.arr = props.safeSubjectOptionList?props.safeSubjectOptionList.map(() => false):props.safeTestQuestionOptionsList.map(() => false);
    this.questionOptions= props.safeSubjectOptionList?[...props.safeSubjectOptionList]:[...props.safeTestQuestionOptionsList];
  }
  render() {
    return (
      <View style={[styles.container,c_styles.p_4]}>
        <View style={styles.title}>
          <View style={[styles.titleTag]}>
            <Text style={[styles.titleTagText,c_styles.h5,c_styles.text_white]}>多选</Text>
          </View>
          <View style={[styles.titleContent,c_styles.pl_3]} >
            <Text style={[c_styles.h6]}>{this.props.subject}</Text>
          </View>
        </View>
        <View style={[styles.choose]}>
          {
            this.state.checked.map((item,index) => (
              <CheckBox
                key={`checkBox${index}`}
                title={this.questionOptions[index].option}
                titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                size={20}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={this.checkOnPress.bind(this,index)}
                checked={item}
              />
            ))
          }
        </View>
      </View>
    );
  }
  checkOnPress(index){
    const answer = [];
    this.arr[index]?this.arr[index]=false: this.arr[index]=true;
    this.questionOptions.forEach((l,i) => {
      if (this.arr[i]) {
        answer.push(l.order)
      }
    });
    this.setState({
      checked: this.arr.map(item => item)
    },() => {
      this.props.onPress({
        answerResults: answer.join('#'),
        testUestionsId: this.props.id,
        rightKey: this.props.rightKey,
        score: this.props.score,
        testPapreId: this.props.testPapreId,
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
    backgroundColor: '#FFA347',
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
