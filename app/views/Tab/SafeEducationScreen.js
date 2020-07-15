/**
 * desc：  安全教育
 * author：DestinyJun
 * date：  2020/6/17 17:28
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {SafeEducationStyles as styles} from "./SafeEducationStyles";
import {Header, Icon} from "react-native-elements";
import {ExamCard} from "../../components/ExamCard";

export class SafeEducationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.SafeEducation]}>
        <Header
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
            marginBottom: 10
          }}
          centerComponent={{ text: '安全教育培训', style: { color: '#fff', fontSize: 18 } }}
          rightComponent={{ icon: 'search', color: '#fff' }}
        />
        <View style={[styles.remind,c_styles.pl_2]}>
          <Icon type={'font-awesome'} name={'exclamation-circle'} size={14} color={'#FF7700'} />
          <Text style={{color: '#FF7700',fontSize: 14,marginLeft: 5}}>1项培训计划考试中</Text>
        </View>
        <View style={[c_styles.pl_3,c_styles.pr_3]}>
          <ExamCard {...this.props} />
        </View>
      </View>
    );
  }
}
