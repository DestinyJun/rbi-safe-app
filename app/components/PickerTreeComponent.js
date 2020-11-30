/**
 * desc：  树结构选择组件
 * author：DestinyJun
 * date：  2020/7/28 11:33
 */
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback, Text} from 'react-native';
import {Button, Icon} from "react-native-elements";
import TreeSelect from 'react-native-tree-select';
import Modal from 'react-native-translucent-modal'
import {treeInit} from "../util/ToolFunction";
const {width, height} = Dimensions.get('window');

export class PickerTreeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      treeselectData: treeInit(props.treeData,props.flag?props.flag: null),
      selectData: null
    };
  }

  render() {
    const treeselectData = treeInit(this.props.treeData,this.props.flag?this.props.flag: null);
    return (
      <View>
        <Button
          buttonStyle={this.props.buttonStyle}
          titleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
          title={this.props.title}
          titleStyle={this.props.titleStyle} onPress={() => {
          this.setState({
            isVisible: true
          })
        }}/>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => this.setState({
            isVisible: false
          })}>
          {/*弹窗容器*/}
          <View style={styles.container}>
            {/*START 遮罩层*/}
            <TouchableWithoutFeedback onPress={() => this.setState({isVisible: false})}>
              <View style={styles.maskLayer}/>
            </TouchableWithoutFeedback>
            {/*END 遮罩层*/}
            <View style={styles.content}>
              <View style={styles.contentTitle}>
                <Button title={'取消'} buttonStyle={{backgroundColor: 'unset'}} onPress={() => {
                  this.setState({isVisible: false});
                }} />
                <Text style={{fontSize: 16,color: '#fff'}}>{this.props.centerTitle}</Text>
                <Button title={'确定'} buttonStyle={{backgroundColor: 'unset'}} onPress={() => {
                  this.setState({isVisible: false});
                  this.props.confirmPress(this.state.selectData);
                }} />
              </View>
              <View style={{flex: 1}}>
                <TreeSelect
                  data={treeselectData}
                  isShowTreeId={false}
                  selectType={this.props.selectType}
                  itemStyle={{
                    fontSize: 16,
                    color: '#8A8B8C'
                  }}
                  selectedItemStyle={{
                    backgroudColor: '#23344E',
                    fontSize: 16,
                    color: '#fff'
                  }}
                  onClick={(res) => {
                    if (this.props.selectType === 'multiple') {
                      this.setState({selectData: res.currentNode})
                    } else {
                      this.setState({selectData: res.item})
                    }
                  }}
                  treeNodeStyle={{
                    openIcon: <Icon type={'font-awesome'} size={20} color="#24292E" name="angle-down"/>,
                    closeIcon: <Icon type={'font-awesome'} size={20} color="#24292E" name="angle-right"/>
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'relative'
  },
  maskLayer: {
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  content: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    bottom: 0,
    paddingBottom: 30
  },
  contentTitle: {
    backgroundColor: '#23344E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  }
});
