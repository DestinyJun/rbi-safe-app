/**
 * desc：  我的四级教育卡
 * author：DestinyJun
 * date：  2020/7/3 17:56
 */
import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {ProFileFourEduStyles as styles} from "./ProFileFourEduStyles";
import {Header, ListItem} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";

const RightTitle = (props) => {
  let rightTitle = '暂无';
  if (props.data[props.keywords]) {
    rightTitle = props.data[props.keywords]
  }
  return <Text>{rightTitle}</Text>
};

export class ProFileFourEduScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.fileList =  [
      {name: 'organizationName', keywords: '组织名称'},
      {name: 'entryTime', keywords: '入厂时间'},
      {name: 'workType', keywords: '工种'},
      {name: 'companyEducationTime', keywords: '公司培训时间'},
      {name: 'companyFraction', keywords: '分公司级成绩'},
      {name: 'factoryEducationTime', keywords: '厂培训时间'},
      {name: 'factoryFraction', keywords: '厂级成绩'},
      {name: 'workshopEducationTime', keywords: '车间培训时间'},
      {name: 'workshopFraction', keywords: '车间级成绩'},
      {name: 'classEducationTime', keywords: '班组培训时间'},
      {name: 'classFraction', keywords: '班组级成绩'},
    ];
  }

  render() {
    return (
      <View style={styles.Inventory}>
        <Header
          statusBarProps={{backgroundColor: '#23344E'}}
          containerStyle={{backgroundColor: '#23344E',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的四级HSE教育卡`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          <ScrollView style={{flex: 1}}>
            {
              Object.keys(this.state.data).length>0?this.fileList.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.keywords}
                  titleStyle={{color: '#5A5A5A'}}
                  titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  rightTitle={<RightTitle keywords={l.name} data={this.state.data}/>}
                  rightTitleStyle={{color:'#BABABA', fontSize: 16}}
                />
              )): <Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>
                您当前没有任何教育卡！
              </Text>
            }
          </ScrollView>
        </View>
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {
    showLoading();
    // 查询培训计划信息
    post(ProFileApi.GET_FOUR_EDU)
      .then((res) => {
        hiddenLoading();
        this.setState({
          data: {...res.data}
        })
      })
      .catch((err) => {
        hiddenLoading();
      });
  }
}

