/**
 * desc：  责任清单详情
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {DoubleInventoryDetailStyles as styles} from "./DoubleInventoryDetailStyles";
import {Header, Icon, Input} from "react-native-elements";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {CardInputComponent} from "../../components/CardInputComponent";

export class DoubleInventoryDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      type: '2',
      badSituation: '',
      correctSituation: '',
    };
    this.addFiled = null;
  }

  render() {
    return (
      <View style={styles.InventoryCheck}>
        <Header
          statusBarProps={{backgroundColor: '#23344E'}}
          containerStyle={{backgroundColor: '#23344E',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {
            this.props.navigation.goBack()
          }}/>}
          centerComponent={{text: '责任清单详情', style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={[styles.content]}>
          <View style={[styles.contentTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#23344E'}/>
            <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>责任清单详情</Text>
          </View>
          <View style={[styles.contentList]}>
            <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'always'}>
              {
                this.state.list?this.state.list.map((item, i) => (<
                  CardInputComponent
                  type={this.state.type}
                  onChangeSelfEvaluation={(text) => {
                    this.addFiled.content[i].selfEvaluation = text;
                  }}
                  onChangeSelfFraction={(text) => {
                    this.addFiled.content[i].selfFraction = text;
                  }}
                  {...item} index={i}
                  key={i}/>)):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>亲，没有任何信息噢，赶快联系管理员吧！</Text>
              }
              {
                this.state.type === '3'? <View>
                  <View style={[styles.contentTitle]}>
                    <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#23344E'}/>
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
                      disabled
                      placeholder={this.state.badSituation?this.state.badSituation:'请输入（最多200字）'}
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
                      disabled
                      placeholder={this.state.correctSituation?this.state.correctSituation:'请输入（最多200字）'}
                      inputContainerStyle={{borderBottomWidth: 0}}
                      containerStyle={{paddingRight: 0, paddingLeft: 0}}
                      inputStyle={[c_styles.h6]}/>
                  </View>
                </View>:null
              }

            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期函
  componentDidMount() {
    const baseInfo= {...this.props.route.params};
    const {badSituation}= {...this.props.route.params}; // 未履职情况
    const {correctSituation}= {...this.props.route.params}; // 就诊与核查
    this.setState({
      list: [...baseInfo.doubleDutyEvaluationContents],
      type: baseInfo.status,
      badSituation: badSituation,
      correctSituation: correctSituation,
    })
  }
}
