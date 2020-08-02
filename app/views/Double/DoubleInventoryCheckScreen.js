/**
 * desc：  一岗双责清单待审核
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DoubleInventoryCheckStyles as styles} from "./DoubleInventoryCheckStyles";
import {Button, Header, Icon, Input} from "react-native-elements";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {CardInputComponent} from "../../components/CardInputComponent";
// 自定义工具
import {errorRemind, hiddenLoading, showLoading, successRemind} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {DoubleDutyApi} from "../../service/DoubleDutyApi";

export class DoubleInventoryCheckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
    this.type = this.props.route.params.type;
    this.addFiled = null;
    console.log(props);
  }

  render() {
    return (
      <View style={styles.InventoryCheck}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {
            this.props.navigation.goBack()
          }}/>}
          centerComponent={{text: this.type === 1?'责任清单填写':'责任清单审核', style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={[styles.content]}>
          <View style={[styles.contentTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
            <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>责任清单分数检查</Text>
          </View>
          <View style={[styles.contentList]}>
            <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'always'}>
              {
                this.state.list && this.state.list.map((item, i) => (<
                  CardInputComponent
                  type={this.type}
                  onChangeSelfEvaluation={(text) => {
                    this.addFiled.content[i].selfEvaluation = text;
                  }}
                  onChangeSelfFraction={(text) => {
                    this.addFiled.content[i].selfFraction = text;
                  }}
                  {...item} index={i}
                  key={i}/>))
              }
              {
                this.type === 2 && (
                  <View>
                    <View style={[styles.contentTitle]}>
                      <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
                      <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>审核信息</Text>
                    </View>
                    <View style={[styles.textArea]}>
                      <Text style={[c_styles.h6, {
                        paddingLeft: 2,
                        color: '#686868',
                        paddingTop: 10,
                        paddingBottom: 10
                      }]}>未履职情况</Text>
                      <Input
                        onChangeText={(text) => {
                          this.addFiled.badeSituation = text
                        }}
                        placeholder={'请输入（最多200字）'}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        containerStyle={{paddingRight: 0, paddingLeft: 0}}
                        inputStyle={[c_styles.h6]}/>
                    </View>
                    <View style={[styles.textArea]}>
                      <Text style={[c_styles.h6, {
                        paddingLeft: 2,
                        color: '#686868',
                        paddingTop: 10,
                        paddingBottom: 10
                      }]}>纠正与考核情况</Text>
                      <Input
                        onChangeText={(text) => {
                          this.addFiled.correctSituation = text
                        }}
                        placeholder={'请输入（最多200字）'}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        containerStyle={{paddingRight: 0, paddingLeft: 0}}
                        inputStyle={[c_styles.h6]}/>
                    </View>
                  </View>
                )
              }
              <Button title={'提交'} buttonStyle={c_styles.button} onPress={this.addOnPress.bind(this)}/>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期函
  componentDidMount() {
    if (this.type === 2) {
      const {baseInfo} = {...this.props.route.params};
      this.addFiled = Object.assign({},{id: baseInfo.id,badeSituation: '',correctSituation: ''});
      const baseInfoList = baseInfo.doubleDutyEvaluationContents;
      const arr = baseInfoList.map((item) => {
        return Object.assign({},{id: item.id, checkResult: item.selfEvaluation, checkFraction: item.selfFraction,});
      });
      this.addFiled = Object.assign(this.addFiled,{content: arr});
      this.setState({
        list: [...baseInfo.doubleDutyEvaluationContents]
      })
    }
    else {
      showLoading();
      post(DoubleDutyApi.GET_LIST_FILL, {})
        .then((res) => {
          console.log(res);
          hiddenLoading();
          for (let key in res.data) {
            if (res.data.hasOwnProperty(key)) {
              if (key === 'idt' || key === 'udt') {
                continue;
              }
              else if (key === 'id') {
                this.addFiled = Object.assign({},{templateId: res.data[key]});
              }
              else if (key === 'name') {
                this.addFiled = Object.assign(this.addFiled,{templateName: res.data[key]});
              }
              else if (key === 'doubleDutyTemplateContents') {
                const arr = res.data[key].map((item) => {
                  return  Object.assign({},{content: item.content,fraction: item.fraction,selfEvaluation: '',selfFraction: ''});
                });
                this.addFiled = Object.assign(this.addFiled,{content: arr});
              }
              else {
                this.addFiled = Object.assign(this.addFiled,{[key]: res.data[key]});
              }
            }
          }
          this.setState({
            list: [...res.data.doubleDutyTemplateContents]
          })
        })
        .catch(err => {
          hiddenLoading();
        })
    }
  }

  // 提交操作
  addOnPress() {
    showLoading();
    if (this.type === 2) {
      hiddenLoading();
      post(DoubleDutyApi.ADD_LIST_CHECKED,this.addFiled)
        .then((res) => {
          hiddenLoading();
          successRemind(res.message,this.props.navigation,'返回');
        })
        .catch(err => {
          hiddenLoading();
          errorRemind(err.message,this.props.navigation,'返回');
        });
    }
    else {
      post(DoubleDutyApi.ADD_LIST_FILL,this.addFiled)
        .then((res) => {
          hiddenLoading();
          successRemind(res.message,this.props.navigation,'返回');
        })
        .catch(err => {
          hiddenLoading();
          errorRemind(err.message,this.props.navigation,'返回');
        });
    }
  }
}
