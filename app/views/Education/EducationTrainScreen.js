/**
 * desc：  培训计划界面
 * author：DestinyJun
 * date：  2020/7/2 16:12
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {EducationTrainStyles as styles} from "./EducationTrainStyles";
import {Header, Icon, ListItem, Image, Button} from "react-native-elements";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {ListItemSubtitleComponent} from "../../components/ListItemSubtitleComponent";
import {ListItemRightIconComponent} from "../../components/ListItemRightIconComponent";
// 自定义工具类
import {IMAGE_VIDEO_1} from "../../util/Constant";
import {errorRemind, hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";

export class EducationTrainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: null,
      videoList: null,
      isStudy: false
    };
    this.train = {...props.route.params.train};
  }

  render() {
    return (
      <View style={styles.Train}>
         <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `${this.props.route.params.title}`,style: {fontSize: 20,color: '#fff'}}}
        />
        <View style={[styles.course]}>
          <View style={[styles.courseTitle]}>
            <View style={{flexDirection:'row',alignItems: 'center'}}>
              <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
              <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>培训课件（{this.state.fileList&&this.state.fileList.length}）</Text>
            </View>
            <Button
              title={'模拟考试'}
              buttonStyle={{backgroundColor: '#226AD5',borderRadius: 20,paddingBottom: 2,paddingTop: 2}}
              onPress={this.imitateExam.bind(this)}
            />
          </View>
          <ScrollView style={{maxHeight: 190}}>
            {
              this.state.fileList&&this.state.fileList.map((l, i) => (
                <ListItem
                  Component={TouchableOpacity}
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.resourceName}
                  titleStyle={{color: '#AFAFAF'}}
                  titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  rightIcon={{type: 'font-awesome', name: 'angle-right',color: '#3B86FF',size: 18}}
                  rightTitle={'开始学习'}
                  // rightIcon={{type: 'font-awesome', name: l.isRead?'check-circle': 'angle-right',color: '#3B86FF',size: 18}}
                  // rightTitle={l.isRead?null:'继续学习'}
                  checkmark={l.whetherStudy === 1?{type: 'font-awesome',name: 'check-circle',color: 'green'}:false}
                  rightTitleStyle={{color:'#3A86FF', fontSize: 16}}
                  onPress={this.studyOnPress.bind(this,'file',l)}
                />
              ))
            }
          </ScrollView>
        </View>
        <View style={[styles.videos]}>
          <View style={[styles.videosTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>培训视频（{this.state.videoList&&this.state.videoList.length}）</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            {
              this.state.videoList&&this.state.videoList.map((l, i) => (
                <ListItem
                  Component={TouchableOpacity}
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.resourceName}
                  titleStyle={{color: '#AFAFAF'}}
                  titleProps={{numberOfLines: 1, ellipsizeMode: 'tail'}}
                  // subtitle={l.isRead?l.video_time:<ListItemSubtitleComponent text={l.video_time}/>}
                  subtitle={<ListItemSubtitleComponent text={l.video_time}/>}
                  subtitleStyle={{paddingTop: 20,color: '#C5C5C5'}}
                  leftElement={<Image source={IMAGE_VIDEO_1} style={{width: 100,height: 60}} resizeMode={'cover'} />}
                  // rightIcon={l.isRead?{type: 'font-awesome', name: 'check-circle',color: '#3B86FF',size: 18}:<ListItemRightIconComponent />}
                  rightIcon={<ListItemRightIconComponent />}
                  checkmark={l.whetherStudy === 1?{type: 'font-awesome',name: 'check-circle',color: 'green'}:false}
                  onPress={this.studyOnPress.bind(this,'video',l)}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  // 组件挂在后生命周期
  componentDidMount() {
    this.unfocus = this.props.navigation.addListener('focus',() => {
      showLoading();
      post(EducationApi.GET_TRAIN_INFO,{id: this.train.id})
        .then((res) => {
          hiddenLoading();
          this.setState({
            fileList: [...res.data.file],
            videoList: [...res.data.video]
          });
        })
        .catch((err) => {
          hiddenLoading();
        })
    });
  }

  // 组件卸载
  componentWillUnmount() {
    this.unfocus();
  }

  // 模拟考试
  imitateExam() {
    this.props.navigation.navigate(
      'EducationExamScreen',
      {
        title: this.train.trainingContent,
        name: '模拟考试',
        exam: this.train
      }
    );
  };

  // 学习操作
  studyOnPress(name,item) {
    showLoading();
    const fields = {
      planId: this.train.id,
      contentId: item.id,
    };
    post(EducationApi.ADD_STUDY_TIME,fields)
      .then((res) => {
        hiddenLoading();
        if (name === 'file') {
          this.props.navigation.navigate('DownloadScreen',item)
        } else {
          this.props.navigation.navigate('PlayVideoScreen',item)
        }
      })
      .catch((err) => {
        hiddenLoading();
        errorRemind(err.message,this.props.navigation)
      })
  }
}
