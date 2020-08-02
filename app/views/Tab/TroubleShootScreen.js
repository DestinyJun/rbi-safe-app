/**
 * desc：  隐患排查
 * author：DestinyJun
 * date：  2020/6/17 17:32
 */
import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {TroubleShootStyles as styles} from './TroubleShootStyles'
import {Header, Button} from "react-native-elements";
import {TroubleListComponent} from "../../components/TroubleListComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {TroubleApi} from "../../service/TroubleApi";

export class TroubleShootScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
    this.unfocus = null
  }

  render() {
    return (
      <View style={styles.TroubleShoot}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
          }}
          centerComponent={{ text: '隐患排查', style: { color: '#fff',fontSize: 18 } }}
        />
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.buttons}>
              <Button
                containerStyle={{flex: 1}}
                buttonStyle={{backgroundColor: '#FFFFFF'}}
                title={'立即整改'}
                titleStyle={{color: '#4F93FF'}}
                icon={{name: 'add',color: '#4F93FF'}}
                onPress={() => {this.props.navigation.navigate('TroubleShortlyScreen')}}
              />
              <Button
                containerStyle={[styles.borderLeft,{flex: 1}]}
                buttonStyle={[{backgroundColor: '#FFFFFF'}]}
                title={'上报整改'}
                titleStyle={{color: '#4F93FF'}}
                icon={{name: 'add',color: '#4F93FF'}}
                onPress={() => {this.props.navigation.navigate('TroubleReportScreen')}}
              />
            </View>
            <View style={styles.content}>
              {
                this.state.list && this.state.list.map((item,i) => {
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
                })
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期
  componentDidMount() {
    this.unfocus = this.props.navigation.addListener('focus',() => {
      showLoading();
      post(TroubleApi.GET_HANDLE_LIST,{pageNo: 1,pageSize: 100000})
        .then((res) => {
          hiddenLoading();
          this.setState({
            list: [...res.data.contents]
          });
        })
        .catch(err => {
          hiddenLoading();
        });
    });
  }

  // 组件卸载
  componentWillUnmount() {
    this.unfocus();
  }
}
