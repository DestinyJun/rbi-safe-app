/**
 * desc：  隐患排查处理
 * author：DestinyJun
 * date：  2020/7/3 11:09
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TroubleHandleStyles as styles} from "./TroubleHandleStyles";
import {Button, Header, Icon, Input, ListItem} from "react-native-elements";
import {HeaderLeftBackComponent} from "../../components/HeaderLeftBackComponent";
import {CheckBoxGroupsComponent} from "../../components/CheckBoxGroupsComponent";
import {ImagePickerComponent} from "../../components/ImagePickerComponent";
import {INPUT_BACK_REMIND_MESSAGE, TROUBLE_ARR_INFO} from "../../util/Constant";
import {PickerComponent} from "../../components/PickerComponent";

export class TroubleHandleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.title = props.route.params.verifyState?'待审核':props.route.params.pendingState&&props.route.params.issuedState? '待处理下发':'待处理';
  }

  render() {
    return (
      <View style={styles.TroubleHandle}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftBackComponent {...this.props} message={INPUT_BACK_REMIND_MESSAGE}/>}
          centerComponent={{text: `${this.title}隐患`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={{flex: 1}}>
          <ScrollView style={[c_styles.pl_3,c_styles.pr_3,{flex: 1}]}>
            <View>
              <View style={[styles.title]}>
                <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
                <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>基本信息</Text>
              </View>
              <View style={[styles.infoList]}>
                <ListItem containerStyle={{backgroundColor: 'none'}} bottomDivider={true} title={'单位车间'} titleStyle={{color: '#9D9D9D'}} chevron={true} rightTitle={'点击选择'} rightTitleStyle={{color: '#9D9D9D'}}/>
                <ListItem containerStyle={{backgroundColor: 'none'}} bottomDivider={true} title={'排查时间'} titleStyle={{color: '#9D9D9D'}} chevron={true} rightTitle={'点击选择'} rightTitleStyle={{color: '#9D9D9D'}}/>
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'整改负责人'}
                  titleStyle={{color: '#9D9D9D'}}
                  chevron={true}
                  rightElement={ <PickerComponent titleStyle={{color: '#9D9D9D'}} buttonStyle={{backgroundColor: 'unset',padding: 0}} />}
                />
                <View style={[c_styles.pt_4,c_styles.pb_4,styles.borderBottom]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患类型</Text>
                  <ScrollView horizontal={true}>
                    <CheckBoxGroupsComponent />
                  </ScrollView>
                </View>
                <View style={[c_styles.pt_4,c_styles.pb_4,styles.borderBottom]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患等级</Text>
                  <ScrollView horizontal={true}>
                    <CheckBoxGroupsComponent options={TROUBLE_ARR_INFO} />
                  </ScrollView>
                </View>
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患内容</Text>
                  <Input placeholder={'请输入（最多200字）'} inputStyle={{paddingBottom: 0,fontSize: 16}} inputContainerStyle={{borderBottomWidth: 0}}  />
                </View>
              </View>
            </View>
            <View>
              <View style={[styles.title]}>
                <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
                <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>隐患现场情况</Text>
              </View>
              <View>
                <View style={[styles.siteBox,c_styles.mb_3]}>
                  <View style={[styles.siteBoxTitle]}>
                    <Text style={[{color: '#858585'}]}>整改前</Text>
                    <Text style={[{backgroundColor: '#3B86FF',borderRadius: 10},c_styles.pl_1,c_styles.pr_1,c_styles.text_white,c_styles.ml_1]}>最多6张</Text>
                  </View>
                  <ImagePickerComponent />
                </View>
                <View style={[styles.siteBox]}>
                  <View style={[styles.siteBoxTitle]}>
                    <Text style={[{color: '#858585'}]}>整改后</Text>
                    <Text style={[{backgroundColor: '#3B86FF',borderRadius: 10},c_styles.pl_1,c_styles.pr_1,c_styles.text_white,c_styles.ml_1]}>最多6张</Text>
                  </View>
                  <ImagePickerComponent />
                </View>
              </View>
            </View>
            <View>
              {
                this.props.route.params.verifyState?(
                  <View>
                    <Button title={'审核通过'} buttonStyle={styles.button}/>
                    <Text style={{color: '#3B86FF',fontSize: 16,textAlign: 'center',textDecorationLine: 'underline',textDecorationColor: '#3B86FF',marginBottom: 30}}>审核不通过</Text>
                </View>):
                  this.props.route.params.pendingState&&this.props.route.params.issuedState?(
                    <Button title={'确认下发'} buttonStyle={styles.button}/>
                  ):<Button title={'提交'} buttonStyle={styles.button}/>
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

