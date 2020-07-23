/**
 * desc：  一岗双责检查清单
 * author：DestinyJun
 * date：  2020/7/3 17:56
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {ProFileInventoryStyles as styles} from "./ProFileInventoryStyles";
import {Header, ListItem} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";

export class ProFileInventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const fileList = [
      {
        title: '责任清单  待审核',
        isState: 3,
      },
      {
        title: '责任清单  待填写',
        isState: 3,
      },
      {
        title: '责任清单  已完成',
        isState: 3,
      },
    ];
    return (
      <View style={styles.Inventory}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `一岗双责检查清单`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={styles.content}>
          <ScrollView style={{flex: 1}}>
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
                      fontSize: 14},c_styles.pl_1,c_styles.pr_1]}>我方</Text>}
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
          </ScrollView>
        </View>
      </View>
    );
  }
}

