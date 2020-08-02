/**
 * desc：  责任清单详情
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {DoubleInventoryDetailStyles as styles} from "./DoubleInventoryDetailStyles";
import {Header, Icon} from "react-native-elements";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {CardInputComponent} from "../../components/CardInputComponent";

export class DoubleInventoryDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
    this.type = 3;
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
          centerComponent={{text: '责任清单详情', style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={[styles.content]}>
          <View style={[styles.contentTitle]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'}/>
            <Text style={[c_styles.h5, c_styles.pl_3, {color: '#333333'}]}>责任清单详情</Text>
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
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期函
  componentDidMount() {
    const baseInfo = {...this.props.route.params};
    this.setState({
      list: [...baseInfo.doubleDutyEvaluationContents]
    })
  }
}
