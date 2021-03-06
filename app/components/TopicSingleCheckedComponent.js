/**
 * desc：  单选题组件
 * author：DestinyJun
 * date：  2020/7/16 16:15
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from "react-native-elements";

export function TopicSingleCheckedComponent(props) {
  let questionOptions = [];
  if (props.safeSubjectOptions) {
    questionOptions = [...props.safeSubjectOptions]
  }
  else if (props.safeTestQuestionOptionsList) {
    questionOptions = [...props.safeTestQuestionOptionsList]
  }
  else if (props.questionsOptionsList) {
    questionOptions = [...props.questionsOptionsList]
  }
  else {
    questionOptions = [...props.safeSubjectOptionList]
  }
  const [checked,setChecked] = useState(questionOptions.map((item,index) => {
    return (props.hasOwnProperty(('answerResults')) && ((parseInt(props.answerResults) - 1) === index));
  }));
  return (
    <View style={[styles.container,c_styles.p_4]}>
      <View style={styles.title}>
        <View style={[styles.titleTag]}>
          <Text style={[styles.titleTagText,c_styles.h5,c_styles.text_white]}>单选</Text>
        </View>
        <View style={[styles.titleContent,c_styles.pl_3]} >
          <Text style={[c_styles.h6]}>{`${props.serial+1}、${props.subject}`}</Text>
        </View>
      </View>
      <View style={[styles.choose]}>
        {
          checked.map((item,index) => (
            <CheckBox
              disabled={true}
              key={`checkBox${index}`}
              title={questionOptions[index].option}
              titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
              size={20}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={item}
            />
          ))
        }
        {
          props.hasOwnProperty('correct')?<View>
            {props.correct === 0?<Text style={{fontSize: 16,color: 'red',paddingLeft: 10}}>错误</Text>: <Text style={{fontSize: 16,color: 'green'}}>正确</Text>}
          </View>:null
        }
      </View>
    </View>
  );
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
    backgroundColor: '#226AD5',
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleContent: {
    flex: 5,
  }
});
