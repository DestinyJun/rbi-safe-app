/**
 * desc：  一岗双责
 * author：DestinyJun
 * date：  2020/6/17 17:37
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native';
import {DoubleDutyStyles as styles} from "./DoubleDutyStyles";
import {Button, Header, Icon, ListItem} from "react-native-elements";
import {IMAGE_VIDEO_1} from "../../util/Constant";
import {ListItemTitleComponent} from "../../components/ListItemTitleComponent";

export class DoubleDutyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const fileList = [
      {
        title: '责任清单  待审核',
        isState: 1,
      },
      {
        title: '责任清单  待填写',
        isState: 2,
      },
      {
        title: '责任清单  已完成',
        isState: 3,
      },
    ];
    const videoList = [
      {
        title: '电工工作安全注意事项01',
        img_url: IMAGE_VIDEO_1,
        video_time: '16:30',
      },
      {
        title: '电工工作安全注意事项02',
        img_url:IMAGE_VIDEO_1,
        video_time: '16:30',
      },
      {
        title: '电工工作安全注意事项03',
        img_url: IMAGE_VIDEO_1,
        video_time: '16:30',
      },
    ];
    return (
      <View style={styles.DoubleDuty}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{backgroundColor: '#226AD5', justifyContent: 'space-around',}}
          centerComponent={{ text: '一岗双责', style: { color: '#fff', fontSize: 18 } }}
        />
        <Button
          onPress={() => {this.props.navigation.navigate('DoubleInventoryMakeScreen')}}
          icon={{name: 'add', color: '#84B3FF',size: 18}}
          title={'责任清单制定'}
          titleStyle={{color: '#84B3FF',fontSize: 16}}
          buttonStyle={{paddingTop: 10,paddingBottom: 10,backgroundColor: '#fff'}} />
        <View style={[styles.mine,c_styles.pl_3,c_styles.pr_3]}>
          <View style={[styles.mineTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>我的责任清单（{fileList.length}）</Text>
          </View>
          <ScrollView style={{maxHeight: 190}}>
            {
              fileList.map((l, i) => (
                <ListItem
                  Component={TouchableOpacity}
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.title}
                  titleStyle={{color: '#5A5A5A'}}
                  titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  leftElement={<Text style={[
                    {backgroundColor: l.isState === 1?'#FFC06A':l.isState === 2?'#3DBCFF': '#63DCAF',
                      color: '#fff',
                      borderRadius: 20,
                      fontSize: 14},c_styles.pl_1,c_styles.pr_1]}>我方</Text>}
                  rightTitle={'2020.06.18'}
                  onPress={() => {
                    if (l.isState === 1) {
                      this.props.navigation.navigate('DoubleInventoryCheckScreen',l)
                    } else if(l.isState === 2) {
                      this.props.navigation.navigate('DoubleInventoryFillScreen',l)
                    }
                  }}
                  rightTitleStyle={{color:'#BABABA', fontSize: 16}}
                />
              ))
            }
          </ScrollView>
        </View>
        <View style={[styles.pending,c_styles.pl_3,c_styles.pr_3]}>
          <View style={[styles.pendingTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>待审核责任清单（{videoList.length}）</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            {
              videoList.map((l, i) => (
                <ListItem
                  key={i}
                  Component={TouchableOpacity}
                  onPress={() => {this.props.navigation.navigate('DoubleInventoryCheckScreen',l)}}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={<ListItemTitleComponent title={l.title} />}
                  titleStyle={{color: '#AFAFAF'}}
                  titleProps={{numberOfLines: 1, ellipsizeMode: 'tail'}}
                  subtitle={l.video_time}
                  subtitleStyle={{paddingTop: 20,color: '#C5C5C5'}}
                  leftAvatar={{source: l.img_url,size: 50}}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
