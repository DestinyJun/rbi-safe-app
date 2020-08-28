/**
 * desc：  填空题组件
 * author：DestinyJun
 * date：  2020/7/16 16:15
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input} from "react-native-elements";
export class TopicFillCheckedComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.arr = props.answerResults.split('#');
    this.answer = this.arr.map(() => null);
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
                editable={false}
                key={`fill${index}`}
                placeholder={item}
                placeholderTextColor={'#C9C9C9'}
                inputContainerStyle={{borderColor: '#F5F5F5'}}
              />
            ))
          }
          {
            this.props.hasOwnProperty('correct')?<View>
              {this.props.correct === 0?<Text style={{fontSize: 16,color: 'red',paddingLeft: 10}}>错误</Text>: <Text style={{fontSize: 16,color: 'green'}}>正确</Text>}
            </View>:null
          }
        </View>
      </View>
    );
  }
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
});
