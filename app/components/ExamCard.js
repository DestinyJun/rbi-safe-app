/**
 * desc：  考试面板组件
 * author：DestinyJun
 * date：  2020/7/2 14:35
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export function ExamCard(props) {
  const {navigation} = {...props};
  return (
    <View>
      <TouchableOpacity onPress={() => {
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
      <TouchableOpacity onPress={() => {
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
      <TouchableOpacity onPress={() => {
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
