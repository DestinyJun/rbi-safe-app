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

export class TroubleShootScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <View>
              <TroubleListComponent />
             {/* <TouchableOpacity onPress={() => {this.props.navigation.navigate('TroubleHandleScreen')}}>
                <Text>待处理隐患</Text>
              </TouchableOpacity>*/}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
