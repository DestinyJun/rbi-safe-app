/**
 * desc：  安全教育
 * author：DestinyJun
 * date：  2020/6/17 17:28
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SafeEducationStyles as styles} from "./SafeEducationStyles";
import {Header} from "react-native-elements";
import {ExamCard} from "../../components/ExamCard";

export class SafeEducationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.SafeEducation}>
        <Header
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
          }}
          centerComponent={{ text: '安全教育培训', style: { color: '#fff', fontSize: 18 } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
        <Text>SafeEducationScreen</Text>
        <ExamCard {...this.props} />
      </View>
    );
  }
}
