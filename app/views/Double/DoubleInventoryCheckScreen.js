/**
 * desc：  一岗双责清单待审核
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DoubleInventoryCheckStyles as styles} from "./DoubleInventoryCheckStyles";
import {Button, Header, Icon, Input} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {CardInputComponent} from "../../components/CardInputComponent";

export class DoubleInventoryCheckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {title: '(10分）啊就是的哈德和大家都阿坎德拉速度快可视对讲卡里的动画',number: '10'},
        {title: '(10分）啊就是的哈德和大家都阿坎德拉速度快可视对讲卡里的动画',number: '0'},
      ]
    };
  }

  render() {
    return (
      <View style={styles.InventoryCheck}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `${this.props.route.params.title}`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={[styles.content]}>
          <View style={[styles.contentTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>责任清单分数检查</Text>
          </View>
          <View style={[styles.contentList]}>
            <ScrollView style={{flex: 1}}>
              {
                this.state.list.map((item,i) => (<CardInputComponent {...item} index={i} key={i} />))
              }
              <View style={[styles.contentTitle]}>
                <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
                <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>审核信息</Text>
              </View>
              <View style={[styles.textArea]}>
                <Text style={[c_styles.h6,{paddingLeft: 2, color:'#686868', paddingTop: 10, paddingBottom:10}]}>未履职情况</Text>
                <Input
                  placeholder={'请输入（最多200字）'}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  containerStyle={{paddingRight: 0,paddingLeft: 0}}
                  inputStyle={[c_styles.h6]} />
              </View>
              <View style={[styles.textArea]}>
                <Text style={[c_styles.h6,{paddingLeft: 2, color:'#686868', paddingTop: 10, paddingBottom:10}]}>纠正与考核情况</Text>
                <Input
                  placeholder={'请输入（最多200字）'}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  containerStyle={{paddingRight: 0,paddingLeft: 0}}
                  inputStyle={[c_styles.h6]} />
              </View>
              <Button title={'提交评价'} buttonStyle={c_styles.button}/>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
