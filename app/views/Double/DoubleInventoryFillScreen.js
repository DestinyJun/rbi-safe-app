/**
 * desc：  一岗双责清单填写
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {DoubleInventoryFillStyles as styles} from "./DoubleInventoryFillStyles";
import {Button, Header, Icon} from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {CardInputComponent} from "../../components/CardInputComponent";
// 自定义工具
import {errorRemind, hiddenLoading, showLoading, successRemind} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {DoubleDutyApi} from "../../service/DoubleDutyApi";

export class DoubleInventoryFillScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.addFiled = null;
    this.type = '1';
  }

  render() {
    return (
      <View style={styles.InventoryFill}>
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
                      await AsyncStorage.setItem('fill', JSON.stringify(this.addFiled.content));
                    }
                    this.props.navigation.goBack();
                  }
                }
              ]);
          }}/>}
          centerComponent={{text: '责任清单填写', style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={[styles.content]}>
          <View style={[styles.contentTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
            <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>{this.type === '1'?'责任清单分数填写':'责任清单分数审核'}</Text>
          </View>
          <View style={[styles.contentList]}>
            <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'always'}>
              {
                this.state.list.length>0?this.state.list.map((item, i) => (<
                  CardInputComponent
                  type={this.type}
                  selfEvaluation={item.selfEvaluation}
                  selfFraction={item.selfFraction}
                  onChangeSelfEvaluation={(text) => {
                    this.addFiled.content[i].selfEvaluation = text;
                  }}
                  onChangeSelfFraction={(text) => {
                    this.addFiled.content[i].selfFraction = text;
                  }}
                  {...item} index={i}
                  key={i}/>)): <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h4]}>
                  没有任何需要填写的责任项，请联系管理员添加！
                </Text>
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
  componentDidMount() {
    showLoading();
    post(DoubleDutyApi.GET_LIST_FILL, {})
      .then(async (res) => {
        hiddenLoading();
        let arr1 = [];
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
        await AsyncStorage.getItem('fill')
          .then(result => {
            arr1 = res.data.doubleDutyTemplateContents.map((item,index) =>(
              {...item,selfEvaluation: JSON.parse(result)[index].selfEvaluation,selfFraction: JSON.parse(result)[index].selfFraction}
            ));
          })
          .catch(err => {
            arr1 = res.data.doubleDutyTemplateContents.map((item) =>(
              {...item,selfEvaluation: '符合',selfFraction: item.fraction}
            ));
          });
        this.setState({
          list: [...arr1]
        },() => {
          AsyncStorage.getItem('fill')
            .then(result => {
              this.state.list.forEach((item,index) => {
                this.addFiled.content[index].selfFraction = JSON.parse(result)[index].selfFraction;
                this.addFiled.content[index].selfEvaluation = JSON.parse(result)[index].selfEvaluation;
              })
            })
            .catch(err => {
              this.state.list.forEach((item,index) => {
                this.addFiled.content[index].selfFraction = item.fraction;
                this.addFiled.content[index].selfEvaluation = '符合';
              })
            });
        })
      })
      .catch(err => {
        hiddenLoading();
      })
  }

  // 提交操作
  addOnPress() {
    console.log(this.addFiled);
    showLoading();
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
