/**
 * desc：  考试页面
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {HomeInformationStyles as styles} from "./HomeInformationStyles";
import {Header, ListItem,Button} from "react-native-elements";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {HomeApi} from "../../service/HomeApi";
import {DialogContentComponent} from "../../components/DialogContentComponent";

export class HomeInformationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoList: [],
      contentModalShow: false,
      detailInfo: null,
    };
  }

  render() {
    return (
      <View style={styles.HomeInformation}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `综合信息公告`, style: {fontSize: 20, color: '#fff'}}}
        />
        <ScrollView style={[styles.container]}>
          <View style={styles.containerList}>
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
        </ScrollView>
        <DialogContentComponent isVisible={this.state.contentModalShow} title={'详细信息'}  onClose={(res) => {
          this.setState({
            contentModalShow: res
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
    );
  }

  // 组件挂载生命周期
  componentDidMount() {
    showLoading();
    post(HomeApi.GET_MINE_LIST,{pageNo: 1,pageSize: 1000000})
      .then(res => {
        hiddenLoading();
        this.setState({
          infoList: [...res.data.contents]
        });
      })
      .catch(err => {
        hiddenLoading();
      })
  }
}
