/**
 * desc：  一岗双责清单待审核
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {DoubleInventoryCheckStyles as styles} from "./DoubleInventoryCheckStyles";
import {Button, Header, Icon, Input} from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
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
      list: [],
      badeSituation: null,
      correctSituation: null,
    };
    this.type = this.props.route.params.type;
    this.addFiled = null;
  }

  render() {
    return (
      <View style={styles.InventoryCheck}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {
            Alert.alert(
              '','您确定要返回吗！',
              [
                {
                  text: '取消',
                  onPress: () => {},
                  style: 'cancel'
                },
                {
                  text: '确定',
                  onPress: async () => {
                    if (this.state.list.length>0) {
                      await AsyncStorage.setItem('check', JSON.stringify(this.addFiled));
                    }
                    this.props.navigation.goBack();
                  }
                }
              ]);
          }}/>}
          centerComponent={{text: '责任清单审核', style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={[styles.content]}>
          <View style={[styles.contentTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
            <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>{'责任清单分数审核'}</Text>
          </View>
          <View style={[styles.contentList]}>
            <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'always'}>
              {
                this.state.list.length>0?this.state.list.map((item, i) => {
                  return (<
                    CardInputComponent
                    type={this.type}
                    checkEvaluation={'符合'}
                    checkNumber={item.fraction}
                    onChangeSelfEvaluation={(text) => {
                      this.addFiled.content[i].checkResult = text;
                    }}
                    onChangeSelfFraction={(text) => {
                      this.addFiled.content[i].checkFraction = text;
                    }}
                    {...item} index={i}
                    key={i}/>)
                }): <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h4]}>
                  没有任何需要填写的责任项，请联系管理员添加！
                </Text>
              }
              {
                this.state.list.length>0 && (
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
                        placeholder={this.state.badeSituation?this.state.badeSituation:'请输入（最多200字）'}
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
                        placeholder={this.state.correctSituation?this.state.correctSituation:'请输入（最多200字）'}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        containerStyle={{paddingRight: 0, paddingLeft: 0}}
                        inputStyle={[c_styles.h6]}/>
                    </View>
                  </View>
                )
              }
              {
                this.state.list.length>0&&<Button title={'提交'} buttonStyle={c_styles.button} onPress={this.addOnPress.bind(this)}/>
              }
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期函
  async componentDidMount() {
    let arr1 = [];
    const {baseInfo} = {...this.props.route.params};
    this.addFiled = Object.assign({},{id: baseInfo.id,badeSituation: '',correctSituation: ''});
    const baseInfoList = baseInfo.doubleDutyEvaluationContents;
    await AsyncStorage.getItem('check')
      .then(result => {
        if (result) {
          this.addFiled = JSON.parse(result);
          this.setState({
            badeSituation: JSON.parse(result).badeSituation,
            correctSituation:JSON.parse(result).badeSituation,
          });
          arr1 = baseInfoList.map((item,index) =>(
            {
              ...item,
              checkEvaluation: JSON.parse(result).content[index].checkResult,
              checkNumber: JSON.parse(result).content[index].checkFraction
            }
          ));
        } else {
          const arr = baseInfoList.map((item) => {
            return Object.assign({}, {
              id: item.id,
              checkResult: '符合',
              checkFraction: item.fraction,
            });
          });
          arr1 = baseInfoList.map((item) => (
            {
              ...item,
              checkEvaluation: '符合',
              checkNumber: item.fraction
            }
          ));
          this.addFiled = Object.assign(this.addFiled, {content: arr});
        }
      })
      .catch(err => {
        const arr = baseInfoList.map((item) => {
          return Object.assign({},{
            id: item.id,
            checkResult: '符合',
            checkFraction: item.fraction,
          });
        });
        arr1 = baseInfoList.map((item) =>(
          {
            ...item,
            checkEvaluation: '符合',
            checkNumber: item.fraction
          }
        ));
        this.addFiled = Object.assign(this.addFiled,{content: arr});
      });
    this.setState({
      list: [...arr1]
    })
  }

  // 提交操作
  addOnPress() {
    showLoading();
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
}
