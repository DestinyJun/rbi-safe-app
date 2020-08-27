/**
 * desc：  安全培训
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Button, Icon, Image, ListItem} from "react-native-elements";
import {errorRemind, hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";
import {ListItemSubtitleComponent} from "../../components/ListItemSubtitleComponent";
import {IMAGE_VIDEO_1} from "../../util/Constant";
import {ListItemRightIconComponent} from "../../components/ListItemRightIconComponent";
import {Picker} from "@react-native-community/picker";
import AsyncStorage from "@react-native-community/async-storage";

export class EducationContentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesList: [],
      videosList: [],
      categoryList: [],
      categoryTitle:'0',
    };
    this.unfocus = null;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListItem
          containerStyle={{backgroundColor: 'none',paddingTop: 0,paddingBottom: 0}}
          bottomDivider={true} title={'内容分类赛选'}
          titleStyle={{color: '#9D9D9D'}}
          rightElement={
            <Picker
              selectedValue={this.state.categoryTitle}
              style={{height: 50, width: 200,flexDirection: 'row',justifyContent: 'flex-end'}}
              onValueChange={(itemValue) =>{
                this.setState({
                  categoryTitle: itemValue
                });
                this.getTrainContent(itemValue);
                this.getTrainVideo(itemValue);
              }
              }>
              <Picker.Item label="请选择分类" value="0" itemStyle={{color: 'red'}} />
              {
                this.state.categoryList.map((item,index) => {
                  return (
                    <Picker.Item key={index} label={item.contentCategoryName} value={item.id} />
                  )
                })
              }
            </Picker>
          }
        />
        <View style={[styles.course]}>
          <View style={[styles.courseTitle]}>
            <View style={{flexDirection:'row',alignItems: 'center'}}>
              <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
              <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>培训课件（{this.state.filesList.length>0&&this.state.filesList.length}）</Text>
            </View>
          </View>
          <ScrollView style={{maxHeight: 190}}>
            {
              (this.state.filesList.length>0)?this.state.filesList.map((l, i) => (
                <ListItem
                  Component={TouchableOpacity}
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.resourceName}
                  titleStyle={{color: '#AFAFAF'}}
                  titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  rightIcon={{type: 'font-awesome', name: 'angle-right',color: '#3B86FF',size: 18}}
                  rightTitle={'开始学习'}
                  checkmark={l.whetherStudy === 1?{type: 'font-awesome',name: 'check-circle',color: 'green'}:false}
                  rightTitleStyle={{color:'#3A86FF', fontSize: 16}}
                  onPress={this.studyOnPress.bind(this,'file',l)}
                />
              )):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>当前暂无培训资料，请联系管理员！</Text>
            }
          </ScrollView>
        </View>
        <View style={[styles.videos]}>
          <View style={[styles.videosTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>培训视频（{this.state.videosList&&this.state.videosList.length}）</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            {
              (this.state.videosList.length>0)?this.state.videosList.map((l, i) => (
                <ListItem
                  Component={TouchableOpacity}
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.resourceName}
                  titleStyle={{color: '#AFAFAF'}}
                  titleProps={{numberOfLines: 1, ellipsizeMode: 'tail'}}
                  subtitle={<ListItemSubtitleComponent text={l.video_time}/>}
                  subtitleStyle={{paddingTop: 20,color: '#C5C5C5'}}
                  leftElement={<Image source={IMAGE_VIDEO_1} style={{width: 100,height: 60}} resizeMode={'cover'} />}
                  rightIcon={<ListItemRightIconComponent />}
                  checkmark={l.whetherStudy === 1?{type: 'font-awesome',name: 'check-circle',color: 'green'}:false}
                  onPress={this.studyOnPress.bind(this,'video',l)}
                />
              )):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>当前暂无培训视频，请联系管理员！</Text>
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {
    this.unfocus = this.props.navigation.addListener('focus',() => {
      showLoading();
      this.contentEducationInit();
    });
  }

  // 组件卸载
  componentWillUnmount() {
    this.unfocus();
  }

  // 数据初始化
  contentEducationInit() {
    // 查询内容分类
    post(EducationApi.GET_TRAIN_TYPE,{pageNo: 1,pageSize: 10000 })
      .then((category) => {
        this.setState({
          categoryList: [...category.data.contents],
          categoryTitle: category.data.contents[0].id,
        });
        this.getTrainContent(category.data.contents[0].id);
        this.getTrainVideo(category.data.contents[0].id);
      })
      .catch((err1) => {
        hiddenLoading();
      });
  }

  // 培训内容查询
  getTrainContent(value) {
    showLoading();
    // 查询培训内容
    post(EducationApi.GET_TRAIN_FILES,{pageNo: 1,pageSize: 10000,value})
      .then((files) => {
        this.setState({
          filesList: [...files.data.contents],
        });
        hiddenLoading();
      })
      .catch((err) => {
        hiddenLoading();
      });
  }

  // 培训视频查询
  getTrainVideo(value){
    // 查询培训视频
    post(EducationApi.GET_TRAIN_VIDEO,{pageNo: 1,pageSize: 10000,value})
      .then((videos) => {
        this.setState({
          videosList: [...videos.data.contents],
        });
        hiddenLoading();
      })
      .catch((err) => {
        hiddenLoading();
      });
  }

  // 学习操作
  async studyOnPress(name,item) {
    if (name === 'file') {
      this.props.navigation.navigate('ViewPDFScreen',{data: item,accessToken: await AsyncStorage.getItem('accessToken')})
    }
    else {
      this.props.navigation.navigate('PlayVideoScreen',item)
    }
  }

}
const styles = StyleSheet.create({
  course: {
    paddingLeft: 12,
    paddingRight: 12
  },
  courseTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
    justifyContent: 'space-between'
  },
  videos: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12
  },
  videosTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },
});
