/**
 * desc：  考试页面
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {EducationExamStyles as styles} from "./EducationExamStyles";
import {Header, Icon} from "react-native-elements";
import {SingleTopicComponent} from "../../components/SingleTopicComponent";

export class EducationExamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Exam}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<Icon type='font-awesome' name={'angle-left'} color={'#fff'} size={30} onPress={this.headerLeftOnPress.bind(this)} />}
          centerComponent={{text: `${this.props.route.params.title}  ${this.props.route.params.name}`,style: {fontSize: 20,color: '#fff'}}}
        />
        <View style={styles.timer}>
          <Text style={[styles.timerText,c_styles.pl_3,c_styles.pr_3]}>模拟考试倒计时     00:35:09</Text>
        </View>
        <View style={[styles.topic,c_styles.mt_2]}>
          <SingleTopicComponent />
        </View>
      </View>
    );
  }
  headerLeftOnPress() {
    this.props.navigation.goBack();
  }
}
