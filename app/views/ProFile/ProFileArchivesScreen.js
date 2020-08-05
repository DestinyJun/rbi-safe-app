/**
 * desc：  我的培训档案
 * author：DestinyJun
 * date：  2020/7/3 17:53
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {ProFileArchivesStyles as styles} from "./ProFileArchivesStyles";
import {Button, Header, Icon, Slider} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {ExamCardComponent} from "../../components/ExamCardComponent";
import {hiddenLoading, percentage, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";


export class ProFileArchivesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seExamList: []
    };
  }

  render() {
    return (
      <View style={styles.Archives}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5', zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {
            this.props.navigation.goBack()
          }}/>}
          centerComponent={{text: `我的培训档案`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            {
              this.state.seExamList.length>0?this.state.seExamList.map((item,index) => (
                  <View style={styles.content} key={index}>
                    <View style={[styles.examCard]}>
                      <View style={styles.title}>
                        <Icon type={'font-awesome'} name={'list-alt'} size={20} color={'#3B86FF'} raised={true}/>
                        <View style={{flex: 1}}>
                          <Text style={{fontSize: 20, color: '#333333', marginLeft: 6}} numberOfLines={1} ellipsizeMode={'tail'}>{item.trainingContent}</Text>
                        </View>
                      </View>
                      <View style={[c_styles.pl_5,c_styles.pt_3]}>
                        {
                          item.trainingime &&  <View style={[styles.timerBox]}>
                            <Icon type={'font-awesome'} name={'calendar'} size={16} color={'#3B86FF'}/>
                            <Text
                              style={[c_styles.h6, c_styles.ml_2]}>培训时间：{item.trainingime}</Text>
                          </View>
                        }
                        {
                          item.examinationTime && <View style={[styles.timerBox]}>
                            <Icon type={'font-awesome'} name={'clock-o'} size={18} color={'#3B86FF'}/>
                            <Text style={[c_styles.h6, c_styles.ml_2]}>考试时间：{item.examinationTime}</Text>
                          </View>
                        }
                      </View>
                      <View style={[styles.buttons]}>
                        <Button
                          disabled={true}
                          disabledStyle={{backgroundColor: '#FB6955'}}
                          disabledTitleStyle={{color: '#fff'}}
                          title={`考试成绩：${item.testResults}`}
                          titleStyle={{color: '#fff'}}
                          buttonStyle={[styles.buttonsStyles]} />
                      </View>
                    </View>
                  </View>
                ))
                :<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>噢，天了！您还没有任何培训，真糟糕！</Text>
            }
          </ScrollView>
        </View>
      </View>

    );
  }

  // 组件挂载
  componentDidMount() {
    showLoading();
    // 查询培训计划信息
    post(ProFileApi.GET_TRAIN_LIST, {pageNo: 1, pageSize: 10000})
      .then((train) => {
        console.log(train);
        hiddenLoading();
        this.setState({
          seExamList: [...train.data.contents]
        })
      })
      .catch((err) => {
        hiddenLoading();
      });
  }
}
