/**
 * desc：  CheckBoxes列表组
 * author：DestinyJun
 * date：  2020/7/21 16:17
 */
import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import {CheckBox} from "react-native-elements";

export class CheckBoxGroupsComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checked:props.options.map(() => false)
    };
    this.arr = props.options.map(() =>false);
  }
  render(){
    return (
      <View style={[styles.container]}>
        {
          this.state.checked.map((item,index) => (
            <CheckBox
              key={`checkBox${index}`}
              title={this.props.options[index]}
              titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
              size={20}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={this.checkOnPress.bind(this,index)}
              checked={item}
            />
          ))
        }
      </View>
    );
  }
  checkOnPress(index) {
    this.arr[index]?this.arr[index]=false : this.arr[index]=true;
    this.setState({
      checked: this.arr.map(item => item)
    },() => {
      this.props.onSelectData(this.arr.map(item => item));
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
