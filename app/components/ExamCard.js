/**
 * desc：  考试面板组件
 * author：DestinyJun
 * date：  2020/7/2 14:35
 */
import React from 'react';
import {View,StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Slider, Text} from "react-native-elements";

export function ExamCard(props) {
  const {navigation} = {...props};
  return (
    <View style={[styles.container,c_styles.pl_4,c_styles.pr_4]}>
      <View style={[styles.title,c_styles.pt_1,c_styles.pb_1]}>
        <Icon name={'home'} size={20} color={'#3B86FF'} raised={true} />
        <Text style={{fontSize: 20,color: '#333333',marginLeft: 6}}>2020年第三期电工安全</Text>
      </View>
      <View style={[styles.timer,c_styles.pl_5]}>
        <View style={[styles.timerBox]}>
          <Icon name={'home'} size={18} color={'#3B86FF'}/>
          <Text style={[c_styles.h6,c_styles.ml_2]}>培训时间：2020.04.01-2020.05.03</Text>
        </View>
        <View style={[styles.timerBox]}>
          <Icon name={'home'} size={18} color={'#3B86FF'}/>
          <Text style={[c_styles.h6,c_styles.ml_2]}>培训时间：2020.04.01-2020.05.03</Text>
        </View>
      </View>
      <View style={[styles.progress,c_styles.pl_5,c_styles.pt_3]}>
        <View style={[styles.progressTitle]}>
          <Text style={[c_styles.h5]}>学习进度</Text>
          <Text style={[c_styles.h5,{color: '#307AEC'}]}>100%</Text>
        </View>
        <Slider
          thumbStyle={{backgroundColor: 'transparent'}}
          trackStyle={{height: 8,borderRadius: 5}}
          maximumTrackTintColor={'#F2F2F2'}
          minimumTrackTintColor={'#3883FA'}
          value={0.5}/>
      </View>
     {/* <TouchableOpacity
        onPress={() => {
        navigation.navigate(
          'EducationExamScreen',
          {
            title: '2020第三期',
            name: '开始考试'
          }
        );
      }}>
        <View>
          <Text>开始考试</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
        navigation.navigate(
          'EducationExamScreen',
          {
            title: '2020第四期',
            name: '模拟考试'
          }
        );
      }}>
        <View>
          <Text>模拟考试</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
        navigation.navigate(
          'EducationTrainScreen',
          {
            title: '2020第五期培训计划',
          }
        );
      }}>
        <View>
          <Text>继续学习</Text>
        </View>
      </TouchableOpacity>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 1
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 6
  },
  progress: {

  },
  progressTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
