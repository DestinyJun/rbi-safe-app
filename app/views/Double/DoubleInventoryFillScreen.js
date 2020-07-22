/**
 * desc：  一岗双责清单填写
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {DoubleInventoryFillStyles as styles} from "./DoubleInventoryFillStyles";
import {Header} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";

export class DoubleInventoryFillScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.InventoryFill}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `一岗双责清单制定`, style: {fontSize: 20, color: '#fff'}}}
        />
        <Text>一岗双责清单待填写</Text>
      </View>
    );
  }
}
