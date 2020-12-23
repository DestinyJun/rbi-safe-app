/**
 * desc：  TabHome
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {View, BackHandler, ToastAndroid, Platform, ScrollView, Text, TouchableOpacity} from 'react-native';
import {HomeStyle as styles} from "./HomeStyle";
import {Button, Header, ListItem} from "react-native-elements";
// 自定义组件
import {DialogContentComponent} from "../../components/DialogContentComponent";
import EchartsLinerComponent from "../../components/EchartsLinerComponent";
import EchartsBarDoubleComponent from "../../components/EchartsBarDoubleComponent";
// 自定义工具类
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {HomeApi} from "../../service/HomeApi";
import AsyncStorage from "@react-native-community/async-storage";


export class HomeScreen extends Component {
  monitorIds = [];
  constructor(props) {
    super(props);
    this.state = {
      infoList: [],
      catList: [],
      wheatList: [],
      contentModalShow: false,
      detailInfo: null,
      troubleEcharts: {},
      safeEcharts: {},
      cat: false,
      wheat: false,
      organizationId: null,
    };
  }

  render() {
    return (
      <View style={[styles.home]}>
        <Header
          statusBarProps={{backgroundColor: '#23344E'}}
          backgroundColor={'#23344E'}
          containerStyle={{
            backgroundColor: '#23344E',
            justifyContent: 'space-around',
          }}
          centerComponent={{text: '矿业公司矿山安全监测预警系统', style: {color: '#fff', fontSize: 18}}}
        />
        <View style={styles.content}>
          <ScrollView style={{flex: 1}}>
            {/*综合监测预警指数图*/}
            <View style={styles.imgBox}>
              <Text style={[c_styles.h5,c_styles.p_2,{color: '#555555'}]}>综合监测预警指数图</Text>
              <View style={{height: 440}}>
                {
                  Object.keys(this.state.troubleEcharts).length>0?
                    <EchartsLinerComponent chartClick={(data) => {
                      if (this.monitorIds[data]) {
                        this.monitorChartBarHttp({warningId: this.monitorIds[data]});
                      }
                    }} option={Object.keys(this.state.troubleEcharts).length>0?this.state.troubleEcharts: null} />:
                    <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>暂无统计数据！</Text>
                }
              </View>
            </View>
            {/*综合监测预警指标分类分值*/}
            <View style={styles.imgBox}>
              <Text style={[c_styles.h5,c_styles.p_2,{color: '#555555'}]}>综合监测预警指标分类分值</Text>
              <View style={{height: 440}}>
                {
                  Object.keys(this.state.safeEcharts).length>0?
                    <EchartsBarDoubleComponent option={Object.keys(this.state.safeEcharts).length>0?this.state.safeEcharts: null} />:
                    <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>暂无统计数据！</Text>
                }
              </View>
            </View>
            {/*猫厂铝矿监测预警*/}
            <View style={styles.imgBox}>
              <View style={styles.imgBoxTitle}>
                <Text style={[c_styles.h5,{color: '#555555'}]}>猫厂铝矿监测预警</Text>
              </View>
              <View style={styles.imgBoxList}>
                {
                  this.state.cat?<>
                    <View style={styles.tableHeader}>
                      <View style={{flex: 1}}>
                        <Text style={[c_styles.text_center, c_styles.text_darkinfo,c_styles.h5]}>传感器名称</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={[c_styles.text_center, c_styles.text_darkinfo,c_styles.h5]}>位置</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={[c_styles.text_center, c_styles.text_darkinfo,c_styles.h5]}>实时数据</Text>
                      </View>
                    </View>
                    {
                      this.state.catList.length>0?this.state.catList.map((item,index) => (
                        <View key={`cat_${index}`} style={styles.tableHeader}>
                          <View style={{flex: 1}}>
                            <Text style={[c_styles.text_center, c_styles.text_danger]}>{item.name}</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={[c_styles.text_center, c_styles.text_danger]}>{item.location}</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={[c_styles.text_center, c_styles.text_danger]}>{item.value}</Text>
                          </View>
                        </View>
                      )):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>当前无预警信息！</Text>
                    }
                  </>: null
                }

              </View>
            </View>
            {/*麦坝铝矿监测预警*/}
            <View style={styles.imgBox}>
              <View style={styles.imgBoxTitle}>
                <Text style={[c_styles.h5,{color: '#555555'}]}>麦坝铝矿监测预警</Text>
              </View>
              <View style={styles.imgBoxList}>
                {
                  this.state.wheat?<>
                    <View style={styles.tableHeader}>
                      <View style={{flex: 1}}>
                        <Text style={[c_styles.text_center, c_styles.text_darkinfo,c_styles.h5]}>传感器名称</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={[c_styles.text_center, c_styles.text_darkinfo,c_styles.h5]}>位置</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={[c_styles.text_center, c_styles.text_darkinfo,c_styles.h5]}>传感器采集数字量</Text>
                      </View>
                    </View>
                    {
                      this.state.wheatList.length>0?this.state.wheatList.map((item,index) => (
                        <View key={`cat_${index}`} style={styles.tableHeader}>
                          <View style={{flex: 1}}>
                            <Text style={[c_styles.text_center, c_styles.text_danger]}>{item.name}</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={[c_styles.text_center, c_styles.text_danger]}>{item.place}</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={[c_styles.text_center, c_styles.text_danger]}>{item.value}</Text>
                          </View>
                        </View>
                      )):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>当前无预警信息！</Text>
                    }
                  </>: null
                }

              </View>
            </View>
            {/*综合信息公告栏*/}
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
                        containerStyle: {backgroundColor: '#23344E',paddingTop: 8,paddingLeft: 8,paddingRight: 8,borderRadius: 8},
                        size: 60,
                        icon: {name: 'comment',type: 'material',color: '#fff',size: 40},
                        iconStyle: {backgroundColor: '#23344E'},
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
          <DialogContentComponent isVisible={this.state.contentModalShow} title={'详细信息'} bgcColor={'#23344E'} onClose={(res) => {
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
  async componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    // 折线图
    post(HomeApi.ECHARTS_TROUBLE_MONTH, {})
      .then(res => {
        hiddenLoading();
        this.monitorIds = [...res.data.id];
        const xData = res.data.abscissa;
        const data = [
          {name: 'SPI实际值', value: res.data.value, isShowDotted: false},
          {name: 'SPI预测值', value: res.data.predictiveValue, isShowDotted: true},
          {name: 'a', value: res.data.thresholdOne, isShowDotted: false},
          {name: 'b', value: res.data.thresholdTwo, isShowDotted: false},
          {name: 'c', value: res.data.thresholdThree, isShowDotted: false},
        ];
        this.setState({
          troubleEcharts: {
           xData: xData,
           data: data,
          },
          organizationId: res.data.organizationId,
        });
        this.monitorChartBarHttp({warningId: this.monitorIds[this.monitorIds.length - 1]})
      })
      .catch(err => {});

    this.unfocus = this.props.navigation.addListener('focus',() => {
      // 综合信息
      post(HomeApi.GET_MINE_LIST,{pageNo: 1,pageSize: 3})
        .then(res => {
          this.setState({
            infoList: [...res.data.contents]
          });
        })
        .catch(err => {});

      // 猫厂监测
      post(HomeApi.GET_CAT_LIST,{pageNo: 1,pageSize: 10000})
        .then(res => {
          this.setState({
            catList: [...res.data.filter((item) => (!item.isNormal))]
          });
        })
        .catch(err => {});

      // 麦坝铝矿监测预警
      post(HomeApi.GET_WHEAT_LIST,{pageNo: 1,pageSize: 10000})
        .then(res => {
          this.setState({
            wheatList: [...res.data.filter((item) => (!item.isNormal))]
          });
        })
        .catch(err => {});
    });

    const arrCat = JSON.parse(await AsyncStorage.getItem('limits')).filter((item) => item.name === 'cat');
    const arrWheat = JSON.parse(await AsyncStorage.getItem('limits')).filter((item) => item.name === 'wheat');
    this.setState({
      wheat: arrWheat[0].limit,
      cat: arrCat[0].limit,
    });

  }

   // 组件挂载生命周期
  componentWillUnmount() {
    this.unfocus();
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  // 柱状图数据获取
  monitorChartBarHttp(params) {
    post(HomeApi.ECHARTS_SAFE_MANAGER, params)
      .then(res => {
        const xdata = res.data.abscissa;
        const barData = res.data.percentage;
        this.setState({
          safeEcharts: {xdata, barData}
        });
      })
      .catch(err => {});
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
