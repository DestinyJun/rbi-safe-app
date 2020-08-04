/**
 * desc：  我的隐患排查记录
 * author：DestinyJun
 * date：  2020/7/3 17:47
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ProFileRecordStyles as styles} from "./ProFileRecordStyles";
import {Header} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {TroubleListComponent} from "../../components/TroubleListComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";

export class ProFileRecordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  render() {
    return (
      <View style={styles.Record}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的隐患排查记录`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.content}>
              {
                this.state.list.length>0?this.state.list.map((item,i) => {
                  let title = '';
                  if (item.workshopName) {
                    title = `${item.factoryName}${item.workshopName}`;
                  } else {
                    title = `${item.factoryName}`;
                  }
                  return (
                    <TroubleListComponent
                      key={`TroubleListComponent${i}`}
                      title={title}
                      color={item.color}
                      onPress={() => {this.props.navigation.navigate('TroubleHandleScreen',item)}}
                      subtitle={item.hidDangerContent}
                      rightTitle={item.idt.split(' ')[0]}
                      processingStatus={item.processingStatus}
                    />
                  )
                }):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>亲，一切正常，没有任何隐患呢！</Text>
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期
  componentDidMount() {
    showLoading();
    post(ProFileApi.GET_RECORD_LIST,{pageNo: 1,pageSize: 100000})
      .then((res) => {
        console.log(res);
        hiddenLoading();
        this.setState({
          list: [...res.data.contents]
        });
      })
      .catch(err => {
        hiddenLoading();
      });
  }
}

