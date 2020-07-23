/**
 * desc：  账号与安全
 * author：DestinyJun
 * date：  2020/7/3 21:44
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ProFileSafeStyles as styles} from "./ProFileSafeStyles";
import {Header, Icon, ListItem, Button} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";

export class ProFileSafeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Safe}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `账号与安全`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          <View style={[styles.title]}>
            <Icon type={'font-awesome'} name={'circle-o'} size={16} color={'#3B86FF'} />
            <Text style={[c_styles.h5,c_styles.pl_3,{color:'#333333'}]}>修改密码</Text>
          </View>
          <View style={styles.inputs}>
            <ListItem
              containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
              title={'所在岗位'}
              input={{placeholder: '请输入原密码',inputStyle: {fontSize: 16}}}
              bottomDivider={true}
            />
            <ListItem
              containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
              title={'岗位性质'}
              input={{placeholder: '请输入新密码',inputStyle: {fontSize: 16}}}
              bottomDivider={true}
            />
            <ListItem
              Component={TouchableOpacity}
              onPress={() => {}}
              containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
              title={'岗位风险'}
              input={{placeholder: '请再次请输入新密码',inputStyle: {fontSize: 16}}}
            />
          </View>
          <Button buttonStyle={c_styles.button} title={'确认修改'} />
        </View>
      </View>
    );
  }
}
