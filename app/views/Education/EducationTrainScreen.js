/**
 * desc：  培训计划界面
 * author：DestinyJun
 * date：  2020/7/2 16:12
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {EducationTrainStyles as styles} from "./EducationTrainStyles";
import {Header, Icon, ListItem, Image} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {IMAGE_VIDEO_1} from "../../util/Constant";
import {ListItemSubtitleComponent} from "../../components/ListItemSubtitleComponent";
import {ListItemRightIconComponent} from "../../components/ListItemRightIconComponent";

export class EducationTrainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.navigation.setOptions({
      title: `${this.props.route.params.title}`
    })
  }

  render() {
    const fileList = [
      {
        title: '电工工作安全注意事项01',
        isRead: true,
      },
      {
        title: '电工工作安全注意事项02',
        isRead: true,
      },
      {
        title: '电工工作安全注意事项03',
        isRead: false ,
      },
    ];
    const videoList = [
      {
        title: '电工工作安全注意事项01',
        img_url: IMAGE_VIDEO_1,
        video_time: '16:30',
        isRead: true,
      },
      {
        title: '电工工作安全注意事项02',
        img_url:IMAGE_VIDEO_1,
        video_time: '16:30',
        isRead: true,
      },
      {
        title: '电工工作安全注意事项03',
        img_url: IMAGE_VIDEO_1,
        video_time: '16:30',
        isRead: false ,
      },
    ];
    return (
      <View style={styles.Train}>
         <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `${this.props.route.params.title}`,style: {fontSize: 20,color: '#fff'}}}
        />
        <View style={[styles.course,c_styles.pl_3,c_styles.pr_3]}>
          <View style={[styles.courseTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>培训课件（{fileList.length}）</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            {
              fileList.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.title}
                  titleStyle={{color: '#AFAFAF'}}
                  titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  rightIcon={{type: 'font-awesome', name: l.isRead?'check-circle': 'angle-right',color: '#3B86FF',size: 18}}
                  rightTitle={l.isRead?null:'继续学习'}
                  rightTitleStyle={{color:'#3A86FF', fontSize: 16}}
                />
              ))
            }
          </ScrollView>
        </View>
        <View style={[styles.videos,c_styles.pl_3,c_styles.pr_3]}>
          <View style={[styles.videosTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>培训视频（{fileList.length}）</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            {
              videoList.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.title}
                  titleStyle={{color: '#AFAFAF'}}
                  titleProps={{numberOfLines: 1, ellipsizeMode: 'tail'}}
                  subtitle={l.isRead?l.video_time:<ListItemSubtitleComponent text={l.video_time}/>}
                  subtitleStyle={{paddingTop: 20,color: '#C5C5C5'}}
                  leftElement={<Image source={IMAGE_VIDEO_1} style={{width: 100,height: 60}} resizeMode={'cover'} />}
                  rightIcon={l.isRead?{type: 'font-awesome', name: 'check-circle',color: '#3B86FF',size: 18}:<ListItemRightIconComponent />}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
