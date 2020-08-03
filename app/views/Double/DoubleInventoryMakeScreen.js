/**
 * desc：  一岗双责清单制定
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DoubleInventoryMakeStyles as styles} from "./DoubleInventoryMakeStyles";
import {Header, Input, ListItem, Button} from "react-native-elements";
import {HeaderLeftBackComponent} from "../../components/HeaderLeftBackComponent";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";

export class DoubleInventoryMakeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {text: '哈哈啊哈1哈哈啊哈1哈哈啊哈1哈哈啊哈1哈哈啊哈1哈哈啊哈1哈哈啊哈1',fraction: 10},
        {text: '哈哈啊哈2',fraction: 10},
        {text: '哈哈啊哈3',fraction: 10},
      ]
    };
  }

  render() {
    return (
      <View style={styles.DoubleInventory}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `一岗双责清单制定`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={[styles.top]}>
          <Text style={{color: '#3B86FF',fontSize: 16}}>责任人检查清单总分</Text>
          <Text style={{color: '#3B86FF',textAlignVertical: 'center',fontSize: 16}}><Text>100</Text> 分</Text>
        </View>
        <View style={[styles.list]}>
          <ScrollView style={{flex: 1}}>
            {
              this.state.list.map((item, i) => (
                <ListItem
                  key={`Double_${i}`}
                  containerStyle={{borderRadius: 8,marginBottom: 10}}
                  leftElement={<Text style={{color: '#5194FF',fontWeight: 'bold',fontSize: 16}}>{i>10?i:`0${i+1}`}</Text>}
                  title={item.text}
                  titleStyle={{color:'#5A5A5A'}}
                  rightElement={
                    <View style={{justifyContent: 'center'}}>
                      <Text style={{color: '#FF8B9A',fontSize: 16}}>{`${item.fraction}分`}</Text>
                    </View>}
                  contentContainerStyle={{borderColor: '#F6F6F6',borderRightWidth: 1}}
                />
              ))
            }
            <View style={[styles.bottomInputs]}>
              <View style={{flex: 2}}>
                <Input
                  placeholder={'请输入清单制定内容'}
                  inputContainerStyle={{borderBottomWidth: 0,paddingTop: 20}}
                />
              </View>
              <View style={{flex: 1}}>
                <Input
                  placeholder={'请输入分值'}
                  placeholderTextColor={'red'}
                  inputStyle={{fontSize: 16,textAlign: 'right'}}
                  inputContainerStyle={{borderBottomWidth: 0,paddingTop: 20}}
                />
              </View>
            </View>
            <Button
              icon={{name: 'add',color: '#4A90FF'}}
              title={'确认新增'}
              titleStyle={{color: '#4A90FF'}}
              buttonStyle={{backgroundColor: '#fff',marginTop: 15,borderRadius: 10,}} />
            <Button
              title={'发布'}
              titleStyle={{letterSpacing: 5}}
              buttonStyle={styles.button} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
