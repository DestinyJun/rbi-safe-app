/**
 * desc：  一岗双责清单待审核
 * author：DestinyJun
 * date：  2020/7/3 11:18
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {DoubleInventoryCheckStyles as styles} from "./DoubleInventoryCheckStyles";
import {Header} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";

export class DoubleInventoryCheckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.InventoryCheck}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `${this.props.route.params.title}`, style: {fontSize: 20, color: '#fff'}}}
        />
        <Text>一岗双责清单待审核</Text>
      </View>
    );
  }
}
