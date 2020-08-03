/**
 * desc：  我的隐患排查记录
 * author：DestinyJun
 * date：  2020/7/3 17:47
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ProFileRecordStyles as styles} from "./ProFileRecordStyles";
import {Button, Header} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {TroubleListComponent} from "../../components/TroubleListComponent";

export class ProFileRecordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const list = [
      {title: '矿业公司隐患排查',pendingState: true,issuedState: true,verifyState: false,subtitle: '隐患内容',date: '2020.03.08'},
      {title: '电工部门隐患排查',pendingState: true,issuedState: false,verifyState: false,subtitle: '隐患内容',date: '2020.03.08'},
      {title: '合金化事业部隐患排查',pendingState: false,issuedState: false,verifyState: true,subtitle: '隐患内容',date: '2020.03.08'},
    ];
    return (
      <View style={styles.Record}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的隐患排查记录`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          <ScrollView style={{flex: 1}}>
            {
              list.map((item,i) => (
                <TroubleListComponent
                  key={`TroubleListComponent${i}`}
                  title={item.title}
                  onPress={() => {this.props.navigation.navigate('TroubleHandleScreen',item)}}
                  subtitle={item.subtitle}
                  rightTitle={item.date}
                  pendingFlag={item.pendingState}
                  issuedFlag={item.issuedState}
                  verifyFlag={item.verifyState}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

