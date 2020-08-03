/**
 * desc：  一岗双责清单填写
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DoubleInventoryFillStyles as styles} from "./DoubleInventoryFillStyles";
import {Button, Header, Icon, Input} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {CardInputComponent} from "../../components/CardInputComponent";

export class DoubleInventoryFillScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  render() {
    return (
      <View style={styles.InventoryFill}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `一岗双责清单待填写`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={[styles.content]}>
          <ScrollView style={{flex: 1}}>
            {
              this.state.list.map((item,i) => (<CardInputComponent {...item} index={i} key={i} />))
            }
            <Button title={'提交'} buttonStyle={c_styles.button}/>
          </ScrollView>
        </View>
      </View>
    );
  }
}
