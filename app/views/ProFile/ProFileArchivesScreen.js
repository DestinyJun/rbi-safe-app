/**
 * desc：  我的培训档案
 * author：DestinyJun
 * date：  2020/7/3 17:53
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ProFileArchivesStyles as styles} from "./ProFileArchivesStyles";
import {Header} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {ExamCardComponent} from "../../components/ExamCardComponent";


export class ProFileArchivesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Archives}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的培训档案`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          <ExamCardComponent {...this.props} />
        </View>
      </View>
    );
  }
}
