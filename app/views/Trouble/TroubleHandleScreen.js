/**
 * desc：  隐患排查处理
 * author：DestinyJun
 * date：  2020/7/3 11:09
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TroubleHandleStyles as styles} from "./TroubleHandleStyles";
import {Button, Header, Icon, Image, Input, ListItem} from "react-native-elements";
import {HeaderLeftBackComponent} from "../../components/HeaderLeftBackComponent";
import {CheckBoxGroupsComponent} from "../../components/CheckBoxGroupsComponent";
import {PickerImageComponent} from "../../components/PickerImageComponent";
import {
  INPUT_BACK_REMIND_MESSAGE,
  TROUBLE_ARR_GRADE,
  TROUBLE_ARR_TYPE,
  TROUBLE_STATUS_LIST
} from "../../util/Constant";
import {PickerListComponent} from "../../components/PickerListComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {TroubleApi} from "../../service/TroubleApi";
import {PickerTreeComponent} from "../../components/PickerTreeComponent";
import {PickerTimeComponent} from "../../components/PickerTimeComponent";

export class TroubleHandleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      orgList: null,
      orgTitle: null,
      timeTitle: null,
      info: null,
      beforeImgs: null,
      afterImgs: null,
      bottons: null,
    };
    this.submitField = {};
    this.beforeFile = [];
    this.typeObj = {};
    this.gradeObj = {};
    this.processingStatus = props.route.params.processingStatus;
    this.hidDangerCode = props.route.params.hidDangerCode;
    this.title = TROUBLE_STATUS_LIST[parseInt(this.processingStatus)+1]
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
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'公司'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.companyName}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'厂矿'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.factoryName}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'车间'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.workshopName}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'班主'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.className}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'排查时间'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.troubleshootingTime}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患描绘</Text>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#4B4B4B'}}>{this.state.info&&this.state.info.hidDangerContent}</Text>
                </View>
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>整改意见</Text>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#4B4B4B'}}>{this.state.info&&this.state.info.rectificationOpinions}</Text>
                </View>
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患描绘</Text>
                  <Input
                    onChangeText={(text) =>{
                      // this.submitField.append('hidDangerContent',text);
                      this.submitField = Object.assign(this.submitField,{hidDangerContent: text});
                      this.setState({
                      })}}
                    placeholder={'请输入（最多200字）'}
                    inputStyle={{paddingBottom: 0,fontSize: 16}}
                    inputContainerStyle={{borderBottomWidth: 0}}  />
                </View>
                <View>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患现场情况</Text>
                  <View style={[styles.siteBox,c_styles.mb_3]}>
                    {
                      this.state.beforeImgs&&this.state.beforeImgs.map((item,index) => (
                        <Image key={index} source={{uri: item.beforePicture}} style={{
                          height: 100,
                          width: 100,
                          borderColor: '#E5E5E5',
                          borderWidth: 1,
                          marginRight: 10,}} resizeMode={'cover'} />
                      ))
                    }
                  </View>
                </View>
              </View>
            </View>
            {/* 可编辑*/}
            <View>
              <View style={[styles.title]}>
                <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
                <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>基本信息</Text>
              </View>
              <View style={[styles.infoList]}>
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'治理资金'}
                  titleStyle={{color: '#9D9D9D'}}
                  input={{keyboardType: 'numeric',inputStyle: {borderWidth: 0,fontSize: 16},placeholder: '请输入治理资金',}}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'完成时间'}
                  titleStyle={{color: '#9D9D9D'}}
                  chevron={true}
                  rightElement={<PickerTimeComponent
                    onSelectDate={(time) => {
                      this.submitField = Object.assign(this.submitField,{troubleshootingTime:time});
                      // this.submitField.append('troubleshootingTime',time);
                      this.setState({
                        timeTitle: time,
                      });
                    }}
                    title={this.state.timeTitle?this.state.timeTitle:'点击选择'}
                    titleStyle={{color: '#9D9D9D'}}
                    buttonStyle={{backgroundColor: 'unset',padding: 0}}
                  />}
                />
                <View style={[c_styles.pt_4,c_styles.pb_4,styles.borderBottom]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患类型</Text>
                  <CheckBoxGroupsComponent options={TROUBLE_ARR_TYPE} onSelectData={(res) => {
                    const arr = ['hidTypePerson','hidTypeThing','hidTypeManage'];
                    res.forEach((item,index) => {
                      if (item) {
                        this.typeObj = Object.assign(this.typeObj,{[arr[index]]: '1'})
                      }
                      else {
                        if (arr[index] in this.typeObj) {
                          delete this.typeObj[arr[index]];
                        }
                      }
                    });
                  }} />
                </View>
                <View style={[c_styles.pt_4,c_styles.pb_4,styles.borderBottom]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患等级</Text>
                  <ScrollView horizontal={true}>
                    <CheckBoxGroupsComponent options={TROUBLE_ARR_GRADE} onSelectData={(res) => {
                      const arr = ['hidTypePerson','hidTypeThing','hidTypeManage'];
                      res.forEach((item,index) => {
                        if (item) {
                          this.gradeObj = Object.assign(this.gradeObj,{[arr[index]]: '1'})
                        }
                        else {
                          if (arr[index] in this.gradeObj) {
                            delete this.gradeObj[arr[index]];
                          }
                        }
                      });
                    }} />
                  </ScrollView>
                </View>
                <View>
                  <View style={[styles.title]}>
                    <Text style={[c_styles.h5, c_styles.pl_3, {color: '#9D9D9D'}]}>隐患现场情况</Text>
                  </View>
                  <View>
                    <View style={[styles.siteBox]}>
                      <View style={[styles.siteBoxTitle]}>
                        <Text style={[{color: '#858585'}]}>整改后</Text>
                        <Text style={[{backgroundColor: '#3B86FF',borderRadius: 10},c_styles.pl_1,c_styles.pr_1,c_styles.text_white,c_styles.ml_1]}>最多6张</Text>
                      </View>
                      <PickerImageComponent/>
                    </View>
                  </View>
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

  // 组件挂载周期函数
  componentDidMount() {
    showLoading();
    // 获取组织树
    post(TroubleApi.GET_ORG_LIST,{})
      .then(res => {
        hiddenLoading();
        this.setState({
          orgList: [...res.data]
        })
      })
      .catch(err => {
        hiddenLoading();
      });

    // 获取整改负责人
    post(TroubleApi.GET_PERSON_LIST,{})
      .then(res => {
        hiddenLoading();
        this.setState({
          pickerData: [...res.data.data]
        })
      })
      .catch(err => {
        hiddenLoading();
      });

    // 获取隐患详情
    post(TroubleApi.TROUBLE_INFO_LIST,{hidDangerCode: this.hidDangerCode})
      .then(res => {
        // console.log(res);
        hiddenLoading();
        this.setState({
          info: res.data.hidDangerDO,
          afterImgs:  res.data.afterImgs,
          beforeImgs:  res.data.beforImgs,
          bottons:  res.data.botton,
        },() => {
           console.log(this.state.beforeImgs);
        })
      })
      .catch(err => {
        hiddenLoading();
      });
  }
}

