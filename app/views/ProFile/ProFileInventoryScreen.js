/**
 * desc：  我的资格证书
 * author：DestinyJun
 * date：  2020/7/3 17:56
 */
import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {ProFileInventoryStyles as styles} from "./ProFileInventoryStyles";
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

export class ProFileInventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.fileList =  [
      {name: 'name', keywords: '姓名'},
      {name: 'gender', keywords: '性别'},
      {name: 'idCardNo', keywords: '身份证号'},
      {name: 'degreeOfEducation', keywords: '文化程度'},
      {name: 'typeOfWork', keywords: '工种'},
      {name: 'operationItems', keywords: '操作项目'},
      {name: 'workingYears', keywords: '工龄'},
      {name: 'theoreticalAchievements', keywords: '理论成绩'},
      {name: 'actualResults', keywords: '实际成绩'},
      {name: 'operationCertificateNo', keywords: '操作证号'},
      {name: 'dateOfIssue', keywords: '发证日期'},
      {name: 'yearsOfWork', keywords: '工种年限'},
      {name: 'validityPeriod', keywords: '复审年限'},
      {name: 'oneReviewResults', keywords: '第一次复审成绩'},
      {name: 'oneReviewTime', keywords: '第一次复审时间'},
      {name: 'towReviewResults', keywords: '第二次复审成绩'},
      {name: 'towReviewTime', keywords: '第二次复审时间'},
      {name: 'threeReviewResults', keywords: '第三次复审成绩'},
      {name: 'threeReviewTime', keywords: '第三次复审时间'},
      {name: 'fourReviewResults', keywords: '第四次复审成绩'},
      {name: 'fourReviewTime', keywords: '第四次复审时间'},
      {name: 'fiveReviewResults', keywords: '第五次复审成绩'},
      {name: 'fiveReviewTime', keywords: '第五次复审时间'},
      {name: 'sixReviewResults', keywords: '第六次复审成绩'},
      {name: 'sixReviewTime', keywords: '第六次复审时间'},
      {name: 'remarks', keywords: '备注'},
    ];
  }

  render() {
    return (
      <View style={styles.Inventory}>
        <Header
          statusBarProps={{backgroundColor: '#23344E'}}
          containerStyle={{backgroundColor: '#23344E',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的资格证书`, style: {fontSize: 20, color: '#fff'}}}
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
              )):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>
                您当前没有任何证书！
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
    post(ProFileApi.GET_MY_PROOF)
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

