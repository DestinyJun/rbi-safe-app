/**
 * desc：  隐患排查处理
 * author：DestinyJun
 * date：  2020/7/3 11:09
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TroubleHandleStyles as styles} from "./TroubleHandleStyles";
import {Button, Header, Icon, Image, Input, ListItem} from "react-native-elements";
// 自定义组件
import {HeaderLeftBackComponent} from "../../components/HeaderLeftBackComponent";
import {CheckMultipleComponent} from "../../components/CheckMultipleComponent";
import {PickerImageComponent} from "../../components/PickerImageComponent";
import {PickerTimeComponent} from "../../components/PickerTimeComponent";
import {CheckSingleComponent} from "../../components/CheckSingleComponent";
import {DialogContentComponent} from "../../components/DialogContentComponent";
import {PickerListComponent} from "../../components/PickerListComponent";
// 自定义工具类
import {
  INPUT_BACK_REMIND_MESSAGE,
  TROUBLE_ARR_GRADE,
  TROUBLE_ARR_TYPE,
  TROUBLE_STATUS_LIST
} from "../../util/Constant";
import {errorRemind, hiddenLoading, showLoading, successRemind} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {TroubleApi} from "../../service/TroubleApi";

export class TroubleHandleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      timeTitle: null,
      specifiedRectificationTime: null,
      rectificationOpinions: null,
      info: null,
      beforeImgs: null,
      afterImgs: null,
      bottons: null,
      isHandle: false,
      verifyModalShow: false,
      noticeModalShow: false,
      buttonName: null,
      selectPerson: null
    };
    this.submitField = {};
    this.typeObj = {};
    this.afterFile = [];
    this.processingStatus = props.route.params.processingStatus;
    this.hidDangerCode = props.route.params.hidDangerCode;
    this.hidDangerGrade = props.route.params.hidDangerGrade;
    this.title = TROUBLE_STATUS_LIST[parseInt(this.processingStatus-1)];
    this.typeList = {hidTypePerson: props.route.params.hidTypePerson,hidTypeThing: props.route.params.hidTypeThing,hidTypeManage: props.route.params.hidTypeManage};
  }

  render() {
    return (
      <View style={styles.TroubleHandle}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftBackComponent {...this.props} message={INPUT_BACK_REMIND_MESSAGE}/>}
          centerComponent={{text: `${this.title}隐患`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps={'always'}  style={[c_styles.pl_3,c_styles.pr_3,{flex: 1}]}>
            {/*不可编辑*/}
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
                  bottomDivider={true} title={'班组'}
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
                <View style={[c_styles.pt_4,c_styles.pb_4,styles.borderBottom]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患类型</Text>
                  <CheckMultipleComponent options={TROUBLE_ARR_TYPE} value={this.typeList} onSelectData={(res) => {
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
                    <CheckSingleComponent options={TROUBLE_ARR_GRADE} value={this.hidDangerGrade} onSelectData={(res) => {
                      this.submitField = Object.assign(this.submitField,{hidDangerGrade:res});
                    }}/>
                  </ScrollView>
                </View>
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患描述</Text>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#4B4B4B'}}>{this.state.info&&this.state.info.hidDangerContent}</Text>
                </View>
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>整改意见</Text>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#4B4B4B'}}>{this.state.info&&this.state.info.rectificationOpinions}</Text>
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
                          marginRight: 10,}} resizeMode={'contain'} />
                      ))
                    }
                  </View>
                </View>
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  title={'是否处理'}
                  titleStyle={{color: '#9D9D9D'}}
                  switch={{
                    disabled:!!(this.state.info && this.state.info.processingStatus === '4'),
                    value: this.state.isHandle,
                    onValueChange: (res) => {
                      this.setState({
                        isHandle: res
                      });
                    }
                  }}
                />
              </View>
            </View>
            {/* 可编辑*/}
            {
              this.state.isHandle&&<View>
                <View style={[styles.title]}>
                  <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
                  <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>处理信息</Text>
                </View>
                <View style={[styles.infoList]}>
                  <ListItem
                    containerStyle={{backgroundColor: 'none'}}
                    bottomDivider={true} title={'治理资金'}
                    titleStyle={{color: '#9D9D9D'}}
                    input={{
                      disabled:!!(this.state.info && this.state.info.processingStatus === '4'),
                      keyboardType: 'numeric',
                      inputStyle: {borderWidth: 0,fontSize: 16,color: '#9D9D9D'},
                      placeholder: this.state.info&&this.state.info.governanceFunds?this.state.info.governanceFunds.toString():'请输入治理资金',
                      onChangeText: (text) => {this.submitField = Object.assign(this.submitField,{governanceFunds:text});
                      }}}
                  />
                  <ListItem
                    containerStyle={{backgroundColor: 'none'}}
                    bottomDivider={true}
                    title={'完成时间'}
                    titleStyle={{color: '#9D9D9D'}}
                    chevron={true}
                    rightElement={(!!(this.state.info && this.state.info.processingStatus === '4'))?<Text style={{color: '#D1D1D1'}}>{this.state.timeTitle}</Text>:
                      <PickerTimeComponent
                        disabled={!!(this.state.info && this.state.info.processingStatus === '4')}
                        onSelectDate={(time) => {
                          this.submitField = Object.assign(this.submitField,{completionTime:time.split('.').join('-')});
                          this.setState({
                            timeTitle: time.split('.').join('-'),
                          });
                        }}
                        title={this.state.timeTitle?this.state.timeTitle:'点击选择'}
                        titleStyle={{color: '#9D9D9D'}}
                        buttonStyle={{backgroundColor: 'unset',padding: 0}}
                      />}
                  />
                  <View style={[{paddingTop: 15}]}>
                    <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>完成情况</Text>
                    <Input
                      disabled={!!(this.state.info && this.state.info.processingStatus === '4')}
                      onChangeText={(text) =>{this.submitField = Object.assign(this.submitField,{completionSituation: text});}}
                      placeholder={this.state.info&&this.state.info.completionSituation?this.state.info.completionSituation:'请输入完成情况'}
                      inputStyle={{paddingBottom: 0,fontSize: 16,color: '#9D9D9D'}}
                      inputContainerStyle={{borderBottomWidth: 0}}  />
                  </View>
                  {
                    this.state.afterImgs.length>0&&<View>
                      <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患现场情况：整改后</Text>
                      <View style={[styles.siteBox,c_styles.mb_3]}>
                        {
                          this.state.afterImgs.map((item,index) =>{
                            return (
                              <Image key={index} source={{uri: item.afterPicture}} style={{
                                height: 100,
                                width: 100,
                                borderColor: '#E5E5E5',
                                borderWidth: 1,
                                marginRight: 10,}} resizeMode={'contain'} />
                            )
                          })
                        }
                      </View>
                    </View>
                  }
                  {
                    this.state.info&&this.state.info.processingStatus ==='4'?null:
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
                          <PickerImageComponent onSelect={(f) => {this.afterFile = f}} />
                        </View>
                      </View>
                    </View>
                  }
                </View>
              </View>
            }
            <View style={styles.bottomButtons}>
              {
                this.state.bottons&&this.state.bottons.map((item,index) =>{
                  if (this.state.isHandle) {
                    if (item.botton === '完成整改') {
                      return (
                        (<
                          Button
                          key={index}
                          onPress={this.handlePress.bind(this,item.botton)}
                          title={item.botton}
                        />)
                      )
                    }
                    if (item.botton === '审核通过'||item.botton === '审核不通过' ) {
                      return (
                        (<
                          Button
                          key={index}
                          onPress={this.handlePress.bind(this,item.botton)}
                          title={item.botton}
                        />)
                      )
                    }
                    return null
                  }
                  if (item.botton === '完成整改' && !this.state.isHandle) {
                    return null
                  }
                  return (
                    (<
                      Button
                      key={index}
                      onPress={this.handlePress.bind(this,item.botton)}
                      title={item.botton}
                    />)
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
        {/* 审核不通过modal */}
        <DialogContentComponent isVisible={this.state.verifyModalShow} title={'审核内容'}>
          <View style={{flex: 1}}>
            <Input placeholder={'请输入评价整改评估'} onChangeText={(text) => {
              this.submitField = Object.assign(this.submitField,{rectificationEvaluate: text});
            }} />
            <Button title={'确定'} buttonStyle={c_styles.button} onPress={() => {
              delete this.submitField.afterImg;
              if (this.state.buttonName === '审核通过') {
                this.httpRequest(TroubleApi.VERIFY_SUCCESS);
              } else {
                this.httpRequest(TroubleApi.VERIFY_ERROR);
              }
              this.setState({
                verifyModalShow: false
              })
            }} />
          </View>
        </DialogContentComponent>
        {/* 通知整改modal */}
        <DialogContentComponent isVisible={this.state.noticeModalShow} title={'通知整改'}>
          <View style={{flex: 1}}>
            <ListItem
              containerStyle={{backgroundColor: 'none'}}
              bottomDivider={true}
              title={'整改负责人'}
              titleStyle={{color: '#9D9D9D'}}
              rightElement={<PickerListComponent
                pickerData={this.state.selectPerson}
                onSelectData={(res) => {
                  this.submitField = Object.assign(this.submitField,{correctorId:res});
                }}
              />}
            />
            <ListItem
              containerStyle={{backgroundColor: 'none'}}
              bottomDivider={true} title={'整改截止时间'}
              titleStyle={{color: '#9D9D9D'}}
              rightElement={
                this.state.specifiedRectificationTime?<Text style={{color: '#B4B4B4'}}>
                    {this.state.specifiedRectificationTime}
                  </Text>:
                <PickerTimeComponent
                  onSelectDate={(time) => {
                    this.submitField = Object.assign(this.submitField,{specifiedRectificationTime:time.split('.').join('-')});
                    this.setState({
                      timeTitle: time.split('.').join('-'),
                    });
                  }}
                  title={this.state.timeTitle?this.state.timeTitle:'点击选择'}
                  titleStyle={{color: '#9D9D9D'}}
                  buttonStyle={{backgroundColor: 'unset',padding: 0}}
                />}
              disabled={true}
            />
            <ListItem
              containerStyle={{backgroundColor: 'none'}}
              bottomDivider={true} title={'整改意见'}
              titleStyle={{color: '#9D9D9D'}}
              input={{
                value: this.state.rectificationOpinions,
                disabled: this.state.rectificationOpinions,
                inputStyle: {borderWidth: 0,fontSize: 14,color: '#AEAEAE'},
                placeholder: '请输入整改意见',
                onChangeText: (text) => {this.submitField = Object.assign(this.submitField,{rectificationOpinions:text});
                }}}
            />
            <Button title={'确定'} buttonStyle={c_styles.button} onPress={() => {
              delete this.submitField.afterImg;
              this.setState({
                noticeModalShow: false
              });
              this.httpRequest(TroubleApi.NOTICE_RECTIFY);
            }} />
          </View>
        </DialogContentComponent>
      </View>
    );
  }

  // 组件挂载周期函数
  componentDidMount() {
    showLoading();
    // 获取隐患详情
    post(TroubleApi.TROUBLE_INFO_LIST,{hidDangerCode: this.hidDangerCode})
      .then(res => {
        this.typeObj.hidTypeManage = res.data.hidDangerDO.hidTypeManage;
        this.typeObj.hidTypePerson = res.data.hidDangerDO.hidTypePerson;
        this.typeObj.hidTypeThing = res.data.hidDangerDO.hidTypeThing;
        this.submitField.rectificationOpinions = res.data.hidDangerDO.rectificationOpinions;
        this.submitField.specifiedRectificationTime = res.data.hidDangerDO.specifiedRectificationTime;
        hiddenLoading();
        this.setState({
          isHandle: res.data.hidDangerDO.ifDeal === '是',
          timeTitle:res.data.hidDangerDO.completionTime?res.data.hidDangerDO.completionTime:null,
          rectificationOpinions:res.data.hidDangerDO.rectificationOpinions?res.data.hidDangerDO.rectificationOpinions:null,
          specifiedRectificationTime:res.data.hidDangerDO.specifiedRectificationTime?res.data.hidDangerDO.specifiedRectificationTime:null,
          info: res.data.hidDangerDO,
          afterImgs:  res.data.afterImgs,
          beforeImgs:  res.data.beforImgs,
          bottons:  res.data.botton,
        })
      })
      .catch(err => {
        hiddenLoading();
      });

    // 获取整改负责人列表
    post(TroubleApi.GET_PERSON_LIST,{})
      .then(res => {
        hiddenLoading();
        this.setState({
          selectPerson: res.data.data
        });
      })
      .catch(err => {
        hiddenLoading();
      });
  }

  // 处理操作
  handlePress(name){
    const arr = ['hidTypePerson','hidTypeThing','hidTypeManage'];
    arr.forEach((k) => {
      if (k in this.submitField) {
        delete this.submitField[k]
      }
    });
    if (JSON.stringify(this.typeObj) !== '{}') {
      for (let k in this.typeObj) {
        if (this.typeObj.hasOwnProperty(k)) {
          this.submitField[k] = this.typeObj[k]
        }
      }
    }
    const afterFileArr = this.afterFile.map((item) => ({file: item.uri}));
    this.submitField = Object.assign(this.submitField,{afterImg: afterFileArr});
    this.submitField = Object.assign(this.submitField,{hidDangerCode: this.state.info.hidDangerCode});
    switch (name) {
      case '通知整改':
        this.setState({
          noticeModalShow: true
        });
        break;
      case '完成整改':
        this.httpRequest(TroubleApi.FINISH_RECTIFY);
        break;
      case '审核通过':
        this.setState({
          buttonName: '审核通过'
        });
        this.setState({
          verifyModalShow: true
        });
        break;
      case '审核不通过':
        this.setState({
          buttonName: '审核不通过'
        });
        this.setState({
          verifyModalShow: true
        });
        break;
      case '上报处理':
        this.httpRequest(TroubleApi.REPORT_HANDLE);
        break;
    }
  }

  // 代理请求
  httpRequest(url) {
    showLoading();
    post(url,this.submitField)
      .then((res) => {
        hiddenLoading();
        successRemind(res.message,this.props.navigation,'返回');
      })
      .catch((err) => {
        hiddenLoading();
        errorRemind(err.message,this.props.navigation);
      })
  }
}

