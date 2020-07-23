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
import {HEADER_IMAGE} from "../../util/Constant";

export class ProFileInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Info}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的信息`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          <View style={styles.contentBack} />
          <View style={styles.contentList}>
            <View style={styles.baseInfo}>
              <ListItem
                containerStyle={{backgroundColor: 'unset'}}
                leftAvatar={{source: HEADER_IMAGE,size: 'large'}}
                title={'王建国  男'}
                titleStyle={{color: '#3A3A3A'}}
                subtitle={<View style={styles.baseInfoPerson}>
                  <Icon type={'material'} name={'people'} size={16} color={'#226AD5'} />
                  <Text style={[c_styles.ml_1,{color:'#A5A5A5', fontSize: 14}]}>班组长： 10545575</Text>
                </View>}
              />
              <ListItem
                containerStyle={{backgroundColor: 'unset',paddingBottom: 5}}
                leftElement={
                  <View style={styles.baseInfoList}>
                    <Text style={[{color: '#CACACA'},c_styles.h6,c_styles.pr_5]}>厂矿</Text>
                    <Text style={[{color: '#595959'},c_styles.h6]}>xxx厂矿</Text>
                  </View>
                }
                rightElement={
                  <View style={styles.baseInfoList}>
                    <Text style={[{color: '#CACACA'},c_styles.h6,c_styles.pr_5]}>厂矿</Text>
                    <Text style={[{color: '#595959'},c_styles.h6]}>xxx厂矿</Text>
                  </View>
                }
              />
              <ListItem
                containerStyle={{backgroundColor: 'unset',paddingTop: 5}}
                leftElement={
                  <View style={styles.baseInfoList}>
                    <Text style={[{color: '#CACACA'},c_styles.h6,c_styles.pr_5]}>厂矿</Text>
                    <View style={[{flex: 1},c_styles.pr_2]}>
                      <Text style={[{color: '#595959'},c_styles.h6]} numberOfLines={1} ellipsizeMode={'tail'}>xxx厂矿</Text>
                    </View>
                  </View>
                }
                rightElement={
                  <View style={styles.baseInfoList}>
                    <Text style={[{color: '#CACACA'},c_styles.h6,c_styles.pr_5]}>厂矿</Text>
                    <View style={[{flex: 1},c_styles.pr_2]}>
                      <Text style={[{color: '#595959'},c_styles.h6]} numberOfLines={1} ellipsizeMode={'tail'}>厂矿</Text>
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
                  rightTitle={'2020.06.03'}
                />
                <View style={styles.baseListCenter}>
                  <ListItem
                    containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
                    title={'所在岗位'}
                    rightTitle={'xxx岗位'}
                    bottomDivider={true}
                  />
                  <ListItem
                    containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
                    title={'岗位性质'}
                    rightTitle={'xxxxxxxxxx'}
                    bottomDivider={true}
                  />
                  <ListItem
                    Component={TouchableOpacity}
                    onPress={() => {}}
                    containerStyle={{backgroundColor: 'unset',paddingLeft: 5,paddingRight: 5}}
                    title={'岗位风险'}
                    chevron={true}
                  />
                </View>
                <ListItem
                  containerStyle={{borderRadius: 10,marginTop: 10}}
                  title={'工种'}
                  rightTitle={'xxx工种'}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
