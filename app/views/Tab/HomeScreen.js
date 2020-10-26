/**
 * desc：  TabHome
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {View, BackHandler, ToastAndroid, Platform, ScrollView, Text, TouchableOpacity} from 'react-native';
import {HomeStyle as styles} from "./HomeStyle";
import {Button, Header, Image, ListItem} from "react-native-elements";
// 自定义组件
import {DialogContentComponent} from "../../components/DialogContentComponent";
import EchartsLinerComponent from "../../components/EchartsLinerComponent";
import EchartsBarDoubleComponent from "../../components/EchartsBarDoubleComponent";
// 自定义工具类
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {HomeApi} from "../../service/HomeApi";


export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoList: [],
      contentModalShow: false,
      detailInfo: null,
      troubleEcharts: {},
      safeEcharts: {},
    };
  }

  render() {
    return (
      <View style={[styles.home]}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
          }}
          centerComponent={{text: '安全生产信息化', style: {color: '#fff', fontSize: 18}}}
        />
        <View style={styles.content}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.imgBox}>
              <Text style={[c_styles.h5,c_styles.p_2,{color: '#555555'}]}>月隐患数量统计</Text>
              <View style={{height: 220}}>
                {
                  Object.keys(this.state.troubleEcharts).length>0?
                    <EchartsLinerComponent option={Object.keys(this.state.troubleEcharts).length>0?this.state.troubleEcharts: null} />:
                    <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>暂无统计数据！</Text>
                }
              </View>
            </View>
            <View style={styles.imgBox}>
              <Text style={[c_styles.h5,c_styles.p_2,{color: '#555555'}]}>安全管理培训计划统计</Text>
              <View style={{height: 300}}>
                {
                  Object.keys(this.state.safeEcharts).length>0?
                    <EchartsBarDoubleComponent option={Object.keys(this.state.safeEcharts).length>0?this.state.safeEcharts: null} />:
                    <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>暂无统计数据！</Text>
                }
              </View>
            </View>
            <View style={styles.imgBox}>
              <View style={styles.imgBoxTitle}>
                <Text style={[c_styles.h5,{color: '#555555'}]}>综合信息公告栏</Text>
                <Button onPress={() => {
                  this.props.navigation.navigate('HomeInformationScreen')
                }} title={'查看更多'} titleStyle={{color: '#C0C0C0',fontSize: 14}} buttonStyle={{backgroundColor: 'unset'}} />
              </View>
              <View style={styles.imgBoxList}>
                {
                  this.state.infoList.length>0?this.state.infoList.map((item,index) => (
                    <ListItem
                      Component={TouchableOpacity}
                      onPress={() =>{
                        this.setState({
                          contentModalShow: true,
                          detailInfo: item,
                        })
                      }}
                      key={index}
                      containerStyle={{backgroundColor: '#fff',borderWidth: 1,borderRadius: 5,borderColor: '#F4F4F4',marginBottom: 10}}
                      leftAvatar={{
                        containerStyle: {backgroundColor: '#226AD5',paddingTop: 8,paddingLeft: 8,paddingRight: 8,borderRadius: 8},
                        size: 60,
                        icon: {name: 'comment',type: 'material',color: '#fff',size: 40},
                        iconStyle: {backgroundColor: '#226AD5'},
                        rounded: false
                      }}
                      title={item.title}
                      titleStyle={{color: '#3A3A3A'}}
                      subtitle={item.idt}
                      subtitleStyle={{paddingTop: 14}}
                    />
                  )):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>当前没有任何事件通知！</Text>
                }
              </View>
            </View>
          </ScrollView>
          <DialogContentComponent isVisible={this.state.contentModalShow} title={'详细信息'} onClose={(res) => {
            this.setState({
              contentModalShow: res,
            })
          }}>
            <View style={styles.dialogContainer}>
              <Text style={[c_styles.h4,c_styles.pt_5,c_styles.pb_5,c_styles.text_center]}>{this.state.detailInfo?this.state.detailInfo.title:''}</Text>
              <Text style={{fontSize: 16,color: '#72827E'}}>
                {this.state.detailInfo?this.state.detailInfo.content:''}
              </Text>
              <Button title={'关闭'} buttonStyle={c_styles.button} onPress={() => {
                this.setState({
                  contentModalShow: false,
                })
              }}/>
            </View>
          </DialogContentComponent>
        </View>
      </View>
    );
  }

  // 生命周期
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    showLoading();
    post(HomeApi.ECHARTS_TROUBLE_MONTH)
      .then(res => {
        this.setState({
          troubleEcharts: {...res.data}
        });
      })
      .catch(err => {});
    post(HomeApi.ECHARTS_SAFE_MANAGER,{})
      .then(res => {
        hiddenLoading();
        this.safeManagerInit(res.data);
      })
      .catch(err => {
        hiddenLoading();
      });
    this.unfocus = this.props.navigation.addListener('focus',() => {
      post(HomeApi.GET_MINE_LIST,{pageNo: 1,pageSize: 3})
        .then(res => {
          this.setState({
            infoList: [...res.data.contents]
          });
        })
        .catch(err => {
        });
    });

  }
   // 组件挂载生命周期
  componentWillUnmount() {
    this.unfocus();
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  // 安全教育统计图数据初始化
  safeManagerInit(data) {
    if(data.length>0) {
      const seriesName = [];
      const threshold = [];
      const avgTime = [];
      const baseNum = 0.01;
      data.forEach(value => {
        seriesName.push(value.trainingContent);
        avgTime.push((value.average + baseNum).toFixed(3));
        threshold.push((value.averageClassHours + baseNum).toFixed(3));
      });
      this.setState({
        safeEcharts: {seriesName,threshold,avgTime,baseNum}
      })
    } else {
      this.setState({
        safeEcharts: {}
      })
    }
  }

  // 二次返回退出App
  onBackAndroid = () => {
    //判断该页面是否处于聚焦状态
    if (this.props.navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        // return true;
        BackHandler.exitApp();//直接退出APP
      } else {
        this.lastBackPressed = Date.now();
        //退出提示
        ToastAndroid.show('再按一次退出应用', 1000);
        return true;
      }
    }
  }
}
