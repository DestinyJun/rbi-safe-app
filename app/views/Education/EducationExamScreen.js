/**
 * desc：  考试页面
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component, useEffect} from 'react';
import {View, Text, ScrollView, Alert, BackHandler} from 'react-native';
import {EducationExamStyles as styles} from "./EducationExamStyles";
import {Header} from "react-native-elements";
import {SingleTopicComponent} from "../../components/SingleTopicComponent";
import {JudgeTopicComponent} from "../../components/JudgeTopicComponent";
import {FillTopicComponent} from "../../components/FillTopicComponent";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";

function MyCustomLeftComponent(props) {
  const headerLeftOnPress = () => {
    Alert.alert(
      '','您正在考试，是否需要返回？一旦返回，则当前答案无效，需重新考试！',
      [
        {
          text: '取消',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: () => {props.navigation.goBack();}
        }
      ]);
    return true
  };
  BackHandler.addEventListener('hardwareBackPress', headerLeftOnPress);
  useEffect(() => {
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', headerLeftOnPress)
    }
  });
  return(
   <HeaderLeftComponent headerLeftOnPress={headerLeftOnPress} />
  )
}
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
          leftComponent={<MyCustomLeftComponent {...this.props} />}
          centerComponent={{text: `${this.props.route.params.title}  ${this.props.route.params.name}`,style: {fontSize: 20,color: '#fff'}}}
        />
        <View style={styles.timer}>
          <Text style={[styles.timerText,c_styles.pl_3,c_styles.pr_3]}>模拟考试倒计时     00:35:09</Text>
        </View>
        <ScrollView style={[styles.topic,c_styles.mt_2]}>
          <SingleTopicComponent />
          <JudgeTopicComponent />
          <FillTopicComponent />
        </ScrollView>
      </View>
    );
  }
}
