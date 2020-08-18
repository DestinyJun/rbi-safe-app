/**
 * desc：  一岗双责清单填写
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DoubleInventoryFillStyles as styles} from "./DoubleInventoryFillStyles";
import {Button, Header, Icon} from "react-native-elements";
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
      list: []
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
            this.props.navigation.goBack()
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
                  selfEvaluation={'符合'}
                  selfFraction={item.fraction}
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
      .then((res) => {
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
        },() => {
          this.state.list.forEach((item,index) => {
            this.addFiled.content[index].selfFraction = item.fraction;
            this.addFiled.content[index].selfEvaluation = '符合';
          })
        })
      })
      .catch(err => {
        hiddenLoading();
      })
  }

  // 提交操作
  addOnPress() {
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
