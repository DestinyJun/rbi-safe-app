/**
 * desc：  个人信息详情
 * author：DestinyJun
 * date：  2020/7/3 17:59
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {ProFileInfoStyles as styles} from "./ProFileInfoStyles";
import {Header, Icon, ListItem} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";

export class ProFileInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myInfo = {...props.route.params}
  }

  render() {
    return (
      <View style={styles.Info}>
        <Header
          ViewComponent={View}
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的信息`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          <View style={styles.contentBack} />
          <View style={styles.contentList}>
            <View style={styles.baseInfo}>
              <ListItem
                containerStyle={{backgroundColor: 'unset'}}
                leftAvatar={{
                  size: 'large',
                  icon: {name: 'account-circle',type: 'material',color: '#2289DC',size: 76},
                  iconStyle: {backgroundColor: '#fff'},
                  rounded: true
                }}
                title={this.myInfo.name}
                titleStyle={{color: '#3A3A3A'}}
                subtitle={<View style={styles.baseInfoPerson}>
                  <Icon type={'material'} name={'people'} size={16} color={'#226AD5'} />
                  <Text style={[c_styles.ml_1,{color:'#A5A5A5', fontSize: 14}]}>{this.myInfo.position}： {this.myInfo.employeeNumber}</Text>
                </View>}
              />
              <ListItem
                containerStyle={{backgroundColor: 'unset',paddingBottom: 5}}
                leftElement={
                  <View style={styles.baseInfoList}>
                    <Text style={[{color: '#CACACA'},c_styles.h6,c_styles.pr_5]}>工种</Text>
                    <Text style={[{color: '#595959'},c_styles.h6]}>{this.myInfo.workType}</Text>
                  </View>
                }
                rightElement={
                  <View style={styles.baseInfoList}>
                    <Text style={[{color: '#CACACA'},c_styles.h6,c_styles.pr_5]}>学历</Text>
                    <Text style={[{color: '#595959'},c_styles.h6]}>{this.myInfo.degreeOfEducation}</Text>
                  </View>
                }
              />
              <ListItem
                containerStyle={{backgroundColor: 'unset',paddingTop: 5}}
                leftElement={
                  <View style={styles.baseInfoList}>
                    <Text style={[{color: '#CACACA'},c_styles.h6,c_styles.pr_5]}>民族</Text>
                    <View style={[{flex: 1},c_styles.pr_2]}>
                      <Text style={[{color: '#595959'},c_styles.h6]} numberOfLines={1} ellipsizeMode={'tail'}>{this.myInfo.nation}</Text>
                    </View>
                  </View>
                }
                rightElement={
                  <View style={styles.baseInfoList}>
                    <Text style={[{color: '#CACACA'},c_styles.h6,c_styles.pr_5]}>生日</Text>
                    <View style={[{flex: 1},c_styles.pr_2]}>
                      <Text style={[{color: '#595959'},c_styles.h6]} numberOfLines={1} ellipsizeMode={'tail'}>{this.myInfo.dateOfBirth}</Text>
                    </View>
                  </View>
                }
              />
            </View>
            <View style={styles.baseList}>
              <ScrollView style={{flex: 1}}>
                <ListItem
                  containerStyle={{borderRadius: 10,marginTop: 10}}
                  title={'入厂时间'}
                  rightTitle={this.myInfo.idt.split(' ')[0]}
                />
                <View style={styles.baseListCenter}>
                  <ListItem
                    containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
                    title={'厂矿名称'}
                    rightTitle={this.myInfo.factoryName}
                    bottomDivider={true}
                  />
                  <ListItem
                    containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
                    title={'车间名称'}
                    rightTitle={this.myInfo.workshopName}
                    bottomDivider={true}
                  />
                  <ListItem
                    containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
                    title={'班组名称'}
                    rightTitle={this.myInfo.teamName}
                    bottomDivider={true}
                  />
                  <ListItem
                    Component={TouchableOpacity}
                    onPress={() => {}}
                    containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
                    title={'我的岗位风险'}
                    chevron={true}
                  />
                </View>
                <ListItem
                  containerStyle={{borderRadius: 10,marginTop: 10}}
                  title={'岗位性质'}
                  rightTitle={this.myInfo.jobNature}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
