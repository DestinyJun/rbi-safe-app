/**
 * desc：  立即整改
 * author：DestinyJun
 * date：  2020/7/2 21:26
 */
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {TroubleShortlyStyles as styles} from "./TroubleShortlyStyles";
import {Button, Header, Icon, Input, ListItem} from "react-native-elements";
// 自定义组件
import {HeaderLeftBackComponent} from "../../components/HeaderLeftBackComponent";
import {CheckBoxGroupsComponent} from "../../components/CheckBoxGroupsComponent";
import {ImagePickerComponent} from "../../components/ImagePickerComponent";
import {TreePickerComponent} from "../../components/TreePickerComponent";
import {TimePickerComponent} from "../../components/TimePickerComponent";
// 自定义工具
import {post} from "../../service/Interceptor";
import {TroubleApi} from "../../service/TroubleApi";
import {dataURLtoFile, errorRemind, hiddenLoading, showLoading, successRemind} from "../../util/ToolFunction";
import {TROUBLE_ARR_TYPE} from "../../util/Constant";

export class TroubleShortlyScreen extends Component {
  constructor(props) {
    super(props);
    this.remindMessage = '您是否需要返回？若返回则填写的数据将全部清空！';
    this.state = {
      checked: true,
      orgList: null,
      orgTitle: null,
      timeTitle: null,
    };
    this.submitField = new FormData();
    this.beforeFile = [];
    this.afterFile = [];
    this.copyObj = {};
  }

  render() {
    return (
      <View style={styles.TroubleShortly}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftBackComponent {...this.props} message={this.remindMessage}/>}
          centerComponent={{text: `立即整改`, style: {fontSize: 20, color: '#fff'}}}
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
                  bottomDivider={true} title={'单位车间'}
                  titleStyle={{color: '#9D9D9D'}}
                  chevron={true}
                  rightElement={ this.state.orgList && <TreePickerComponent
                    confirmPress={(res) => {
                      this.submitField.append('organizationId',res.id);
                      this.submitField.append('organizationName',res.name);
                      this.setState({
                        orgTitle: res.name,
                      });
                    }}
                    treeData={this.state.orgList}
                    title={this.state.orgTitle?this.state.orgTitle:'点击选择'}
                    titleStyle={{color: '#9D9D9D'}}
                    buttonStyle={{backgroundColor: 'unset',padding: 0}}
                  />}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'排查时间'}
                  titleStyle={{color: '#9D9D9D'}}
                  chevron={true}
                  rightElement={<TimePickerComponent
                    onSelectDate={(time) => {
                      this.submitField.append('troubleshootingTime',time);
                      this.setState({
                        timeTitle: time,
                      });
                    }}
                    title={this.state.timeTitle?this.state.timeTitle:'点击选择'}
                    titleStyle={{color: '#9D9D9D'}}
                    buttonStyle={{backgroundColor: 'unset',padding: 0}}
                  />}
                />
                <View style={[{paddingTop: 15,paddingBottom: 15},styles.borderBottom]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患类型</Text>
                  <CheckBoxGroupsComponent options={TROUBLE_ARR_TYPE} onSelectData={(res) => {
                    const arr = ['hidTypePerson','hidTypeThing','hidTypeManage'];
                    res.forEach((item,index) => {
                      if (item) {
                        this.copyObj = Object.assign(this.copyObj,{[arr[index]]: '1'})
                      }
                      else {
                        if (arr[index] in this.copyObj) {
                          delete this.copyObj[arr[index]];
                        }
                      }
                    });
                  }} />
                </View>
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患内容</Text>
                  <Input
                    onChangeText={(text) =>{
                      this.submitField.append('hidDangerContent',text);
                      this.setState({
                    })}}
                    placeholder={'请输入（最多200字）'}
                    inputStyle={{paddingBottom: 0,fontSize: 16}}
                    inputContainerStyle={{borderBottomWidth: 0}}  />
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
                  <ImagePickerComponent onSelect={(f) => {this.beforeFile = f}} />
                </View>
                <View style={[styles.siteBox]}>
                  <View style={[styles.siteBoxTitle]}>
                    <Text style={[{color: '#858585'}]}>整改后</Text>
                    <Text style={[{backgroundColor: '#3B86FF',borderRadius: 10},c_styles.pl_1,c_styles.pr_1,c_styles.text_white,c_styles.ml_1]}>最多6张</Text>
                  </View>
                  <ImagePickerComponent onSelect={(f) => {this.afterFile = f}} />
                </View>
              </View>
            </View>
            <Button title={'提交'} buttonStyle={styles.button} onPress={this.onSubmitOnPress.bind(this)}/>
          </ScrollView>
        </View>
      </View>
    );
  }

  // 租金按挂载周期函数
  componentDidMount() {
    showLoading();
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
  }

  // 整改提交操作
  onSubmitOnPress(){
    if (JSON.stringify(this.copyObj) !== '{}') {
      for (let k in this.copyObj) {
        if (this.copyObj.hasOwnProperty(k)) {
          this.submitField.append(k,this.copyObj[k]);
        }
      }
    }
    this.beforeFile.map((item) => {
      this.submitField.append('beforeImg',dataURLtoFile(item.uri,item.fileName));
    });
    this.afterFile.map((item) => {
      this.submitField.append('afterImg',dataURLtoFile(item.uri,item.fileName));
    });
    let formData = new FormData();
    formData.append('file','1123');
    console.log(formData.getParts());
  /*  post(TroubleApi.ADD_STRAIGHTAWAY_TRO,this.submitField)
      .then((res) => {
        successRemind(res.message,this.props.navigation,'返回');
      })
      .catch((err) => {
        errorRemind(err.message,this.props.navigation);
      })*/
  }
}
