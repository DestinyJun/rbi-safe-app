/**
 * desc：  判断题组件
 * author：DestinyJun
 * date：  2020/7/16 16:15
 */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox, Icon} from "react-native-elements";
export function JudgeTopicComponent(props) {
  let arr = [false,false];
  const arrAnswer = ['正确','错误'];
  const [checked,setChecked] = useState(arr);
  const checkOnPress = (index) => {
    arr[index] = true;
    setChecked(arr);
  };
  return (
    <View style={[styles.container,c_styles.p_4]}>
      <View style={styles.title}>
        <View style={[styles.titleTag]}>
          <Text style={[styles.titleTagText,c_styles.h5,c_styles.text_white]}>判断</Text>
        </View>
        <View style={[styles.titleContent,c_styles.pl_3]} >
          <Text style={[c_styles.h6]}>
            02.题目名称 题目名称 题目名称 题目名称 题目名称 题目名称
          </Text>
        </View>
      </View>
      <View style={[styles.choose]}>
        {
          checked.map((item,index) => (
            <CheckBox
              key={`judge${index}`}
              title={arrAnswer[index]}
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
    flexDirection: 'row'
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
  choose:{}
});
