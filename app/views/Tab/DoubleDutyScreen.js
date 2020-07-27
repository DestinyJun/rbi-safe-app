/**
 * desc：  一岗双责
 * author：DestinyJun
 * date：  2020/6/17 17:37
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Button, Header, Icon, ListItem} from "react-native-elements";
import {DoubleDutyStyles as styles} from "./DoubleDutyStyles";
// 自定义组件
import {ListItemTitleComponent} from "../../components/ListItemTitleComponent";
// 自定义工具类
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {DoubleDutyApi} from "../../service/DoubleDutyApi";

export class DoubleDutyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingList: null,
      dutyList: null,
    };
  }

  render() {
    return (
      <View style={styles.DoubleDuty}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{backgroundColor: '#226AD5', justifyContent: 'space-around',}}
          centerComponent={{ text: '一岗双责', style: { color: '#fff', fontSize: 18 } }}
        />
        <Button
          onPress={() => {this.props.navigation.navigate('DoubleInventoryCheckScreen',{
            type: 1
          })}}
          icon={{name: 'add', color: '#84B3FF',size: 18}}
          title={'责任清单填写'}
          titleStyle={{color: '#84B3FF',fontSize: 16}}
          buttonStyle={{paddingTop: 10,paddingBottom: 10,backgroundColor: '#fff'}} />
        <View style={[styles.mine]}>
          <View style={[styles.mineTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>我的责任清单（{this.state.pendingList?this.state.pendingList.length: '0'}）</Text>
          </View>
          <ScrollView style={{maxHeight: 190}}>
            {/*
              onPress={() => {
                    if (l.isState === 1) {
                      this.props.navigation.navigate('DoubleInventoryCheckScreen',l)
                    } else if(l.isState === 2) {
                      this.props.navigation.navigate('DoubleInventoryFillScreen',l)
                    }
                  }}
            */}
            {
              this.state.pendingList&&this.state.pendingList.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={`${l.templateName}  ${l.statusName}`}
                  titleStyle={{color: '#5A5A5A'}}
                  titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  leftElement={<Text style={[
                    {backgroundColor: l.status === '2'?'#FFC06A':l.status === '1'?'#3DBCFF': '#63DCAF',
                      color: '#fff',
                      borderRadius: 20,
                      fontSize: 14},c_styles.pl_1,c_styles.pr_1]}>我方</Text>}
                  rightTitle={'2020.06.18'}
                  rightTitleStyle={{color:'#BABABA', fontSize: 16}}
                />
              ))
            }
          </ScrollView>
        </View>
        <View style={[styles.pending]}>
          <View style={[styles.pendingTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>待审核责任清单（{this.state.dutyList?this.state.dutyList.length: '0'}）</Text>
          </View>
          <ScrollView style={{flex: 1}}>
            {
              this.state.dutyList&&this.state.dutyList.map((l, i) => (
                <ListItem
                  key={i}
                  Component={TouchableOpacity}
                  onPress={() => {this.props.navigation.navigate('DoubleInventoryCheckScreen',{
                    baseInfo: l,
                    type: 2
                  })}}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={<ListItemTitleComponent title={l.templateName} />}
                  titleStyle={{color: '#AFAFAF'}}
                  titleProps={{numberOfLines: 1, ellipsizeMode: 'tail'}}
                  subtitle={l.writeTime}
                  subtitleStyle={{paddingTop: 20,color: '#C5C5C5'}}
                  leftAvatar={{
                    size: 'medium',
                    icon: {name: 'account-circle',type: 'material',color: '#2289DC',size: 50},
                    iconStyle: {backgroundColor: '#fff'},
                    rounded: true
                  }}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期函
  componentDidMount() {
    showLoading();
    // 我的清单
    post(DoubleDutyApi.GET_MINE_LIST,{pageNo: 1,pageSize: 100000})
      .then((res) => {
        hiddenLoading();
        this.setState({
          pendingList: [...res.data.contents]
        });
      })
      .catch(err => {
        hiddenLoading();
      });
    // 待审核清单
    post(DoubleDutyApi.GET_MINE_PENDING,{pageNo: 1,pageSize: 100000})
      .then((res) => {
        hiddenLoading();
        this.setState({
          dutyList: [...res.data.contents]
        });
      })
      .catch(err => {
        hiddenLoading();
      })
  }
}
