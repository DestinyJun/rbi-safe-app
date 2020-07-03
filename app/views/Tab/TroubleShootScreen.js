/**
 * desc：  隐患排查
 * author：DestinyJun
 * date：  2020/6/17 17:32
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TroubleShootStyles as styles} from './TroubleShootStyles'
import {Header, Icon} from "react-native-elements";

export class TroubleShootScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.TroubleShoot}>
        <Header
          containerStyle={{
            backgroundColor: '#226AD5',
            justifyContent: 'space-around',
          }}
          centerComponent={{ text: '隐患排查', style: { color: '#fff',fontSize: 18 } }}
        />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('TroubleShortlyScreen')}}>
            <View style={styles.buttons_touch}>
              <Icon name={'add'} />
              <Text>立即整改</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('TroubleReportScreen')}}>
            <View style={styles.buttons_touch}>
              <Icon name={'add'} />
              <Text>上报整改</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('TroubleHandleScreen')}}>
            <Text>待处理隐患</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
