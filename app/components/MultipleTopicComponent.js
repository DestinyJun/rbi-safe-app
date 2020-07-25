/**
 * desc：  多选题组件
 * author：DestinyJun
 * date：  2020/7/16 16:15
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from "react-native-elements";
let arr = [];
export function MultipleTopicComponent(props) {
  const questionOptions= [...props.safeTestQuestionOptionsList];
  if (arr.length === 0) {
    arr = questionOptions.map(() => false);
  }
  const [checked,setChecked] = useState(questionOptions.map(() => false));
  const checkOnPress = (index) => {
    const answer = [];
    arr[index]?arr[index]=false: arr[index]=true;
    questionOptions.forEach((l,i) => {
      if (arr[i]) {
        answer.push(l.order)
      }
    });
    setChecked(arr.map(item => item));
    props.onPress({
      answerResults: answer.join('#'),
      testUestionsId: props.id,
      rightKey: props.rightKey,
      score: props.score,
      testPapreId: props.testPapreId,
    });
  };
  return (
    <View style={[styles.container,c_styles.p_4]}>
      <View style={styles.title}>
        <View style={[styles.titleTag]}>
          <Text style={[styles.titleTagText,c_styles.h5,c_styles.text_white]}>多选</Text>
        </View>
        <View style={[styles.titleContent,c_styles.pl_3]} >
          <Text style={[c_styles.h6]}>{props.subject}</Text>
        </View>
      </View>
      <View style={[styles.choose]}>
        {
          checked.map((item,index) => (
            <CheckBox
              key={`checkBox${index}`}
              title={questionOptions[index].option}
              titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
              size={20}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={checkOnPress.bind(this,index)}
              checked={item}
            />
          ))
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
