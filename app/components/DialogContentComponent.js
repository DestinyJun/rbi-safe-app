/**
 * desc：  内容提醒框
 * author：DestinyJun
 * date：  2020/7/30 14:32
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions} from 'react-native';
import Modal from 'react-native-translucent-modal';
const {width, height} = Dimensions.get('window');
export class DialogContentComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.isVisible,
      prevPropsIsVisible: null,
    };
  }

  static getDerivedStateFromProps(props,state) {
    if (props.isVisible !== state.prevPropsIsVisible) {
      return {
        isVisible: props.isVisible,
        prevPropsIsVisible: props.isVisible,
      }
    }
    if (props.isVisible !== state.isVisible) {
      return {
        isVisible: state.isVisible,
        prevPropsIsVisible: state.isVisible,
      }
    }
    return null;
  }
  render() {
    return (
      <Modal
        visible={this.state.isVisible}
        transparent={true}
        onRequestClose={() => {
          this.setState({isVisible: false},() => {
            this.props.onClose(false);
          });
        }}
      >
        <View style={styles.container}>
          {/*START 遮罩层*/}
          <TouchableWithoutFeedback onPress={() => {
            this.setState({isVisible: false},() => {
              this.props.onClose(false);
            });
          }}>
            <View style={styles.maskLayer}/>
          </TouchableWithoutFeedback>
          {/*END 遮罩层*/}
          <View style={styles.content}>
            <View style={styles.contentTitle}>
              <Text style={{fontSize: 18,color: '#fff'}}>
                {this.props.title}
              </Text>
            </View>
            <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={"always"}>
              {this.props.children}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
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
    minHeight: '40%',
    width: '90%',
    backgroundColor: '#fff',
    bottom: 0,
    paddingBottom: 10,
    borderRadius: 10
  },
  contentTitle:{
    height: 50,
    backgroundColor: '#23344E',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
