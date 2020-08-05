/**
 * desc：  我的资格证书
 * author：DestinyJun
 * date：  2020/7/3 17:56
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {ProFileInventoryStyles as styles} from "./ProFileInventoryStyles";
import {Header, ListItem} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";

export class ProFileInventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.fileList =  [
      {
      name: '姓名',
      keywords: 'name',
    }
    ];
  }

  render() {
    return (
      <View style={styles.Inventory}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的资格证书`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          {/*<ScrollView style={{flex: 1}}>
            {
              fileList.map((l, i) => (
                <ListItem
                  Component={TouchableOpacity}
                  key={i}
                  containerStyle={{marginTop: 10,borderRadius: 10}}
                  title={l.title}
                  titleStyle={{color: '#5A5A5A'}}
                  titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  leftElement={<Text style={[
                    {backgroundColor: l.isState === 1?'#FFC06A':l.isState === 2?'#3DBCFF': '#63DCAF',
                      color: '#fff',
                      borderRadius: 20,
                      fontSize: 14},c_styles.pl_1,c_styles.pr_1]}>{(i + 1)>9?i:`0${i+1}`}</Text>}
                  rightTitle={'2020.06.18'}
                  onPress={() => {
                    if (l.isState === 1) {
                      this.props.navigation.navigate('DoubleInventoryCheckScreen',l)
                    } else if(l.isState === 2) {
                      this.props.navigation.navigate('DoubleInventoryFillScreen',l)
                    }
                  }}
                  rightTitleStyle={{color:'#BABABA', fontSize: 16}}
                />
              ))
            }
          </ScrollView>*/}
        </View>
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {
    showLoading();
    // 查询培训计划信息
    post(ProFileApi.GET_MY_PROOF)
      .then((res) => {
        console.log(res);
        hiddenLoading();
      /*  this.setState({
          seExamList: [...train.data.contents]
        })*/
      })
      .catch((err) => {
        hiddenLoading();
      });
  }
}

