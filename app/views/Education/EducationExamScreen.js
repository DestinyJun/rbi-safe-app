/**
 * desc：  考试页面
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {EducationExamStyles as styles} from "./EducationExamStyles";

export class EducationExamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.navigation.setOptions({
      title: `${this.props.route.params.title}  ${this.props.route.params.name}`
    })
  }

  render() {
    return (
      <View style={styles.Exam}>
        <Text>开始考试/模拟考试</Text>
      </View>
    );
  }
}
