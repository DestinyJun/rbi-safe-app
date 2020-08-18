/**
 * desc：  安全教育
 * author：DestinyJun
 * date：  2020/6/17 17:28
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {SafeEducationStyles as styles} from "./SafeEducationStyles";
import {Header, Button} from "react-native-elements";
// tab子路由
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {EducationClassScreen} from "../EducationTopTab/EducationClassScreen";
import {EducationRecordScreen} from "../EducationTopTab/EducationRecordScreen";
import {EducationSafeScreen} from "../EducationTopTab/EducationSafeScreen";
import {TabTopButtonComponent} from "../../components/TabTopButtonComponent";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'EducationSafeScreen'}
      lazy={true}
      tabBar={props => {
        return <TabTopButtonComponent {...props} />
      }}
    >
      <Tab.Screen name="EducationSafeScreen" options={{title: '培训'}} component={EducationSafeScreen} />
      <Tab.Screen name="EducationClassScreen" options={{title: '班主'}}  component={EducationClassScreen} />
      <Tab.Screen name="EducationRecordScreen" options={{title: '记录'}} component={EducationRecordScreen} />
    </Tab.Navigator>
  );
}

export class SafeEducationScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.SafeEducation]}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
          }}
          leftComponent={<Button title={'发布'} buttonStyle={{backgroundColor:'#226AD5'}} onPress={() => {
            this.props.navigation.navigate('EducationIssueScreen');
          }} />}
          centerComponent={{ text: '安全教育培训', style: { color: '#fff', fontSize: 18 } }}
          rightComponent={<Button title={'错题库'} buttonStyle={{backgroundColor:'#226AD5'}} onPress={this.errorTopicStart.bind(this)} />}
        />
        <View style={{flex: 1}}>
          <MyTabs />
        </View>
      </View>
    );
  }

  // 错题训练
  errorTopicStart() {
    // 开始考试
    this.props.navigation.navigate(
      'EducationErrorScreen',
      {
        name: '错题训练',
      }
    );
  };
}
