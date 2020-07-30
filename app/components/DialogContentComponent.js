/**
 * desc：  内容提醒框
 * author：DestinyJun
 * date：  2020/7/30 14:32
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions} from 'react-native';
import Modal from 'react-native-translucent-modal';
import {Button} from "react-native-elements";
const {width, height} = Dimensions.get('window');
export class DialogContentComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.isVisible,
      examNotes: props.examNotes
    };
    console.log(props);
  }
  render() {
    return (
      <Modal
        visible={this.state.isVisible}
        transparent={true}
        onRequestClose={() => {
          this.setState({
            isVisible: false
          })
        }}
      >
        <View style={styles.container}>
          {/*START 遮罩层*/}
          <TouchableWithoutFeedback onPress={() => this.setState({isVisible: false})}>
            <View style={styles.maskLayer}/>
          </TouchableWithoutFeedback>
          {/*END 遮罩层*/}
          <View style={styles.content}>
            <View style={styles.contentTitle}>
              <Text style={{fontSize: 18,color: '#fff'}}>
                考前阅读
              </Text>
            </View>
            <View style={styles.contentText}>
              <ScrollView style={{flex: 1}}>
                <Text style={{fontSize: 16,color: '#878787'}}>
                  {`  ${this.state.examNotes}`}
                </Text>
              </ScrollView>
            </View>
            <View style={styles.buttons}>
              <Button title={'确定考试'} buttonStyle={{backgroundColor: '#226AD5'}} onPress={() =>this.setState({isVisible: false})} />
              <Button title={'取消考试'} buttonStyle={{backgroundColor: '#FFA347'}} onPress={() =>this.setState({isVisible: false})} />
            </View>
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
  contentTitle:{
    height: 50,
    backgroundColor: '#226AD5',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    height: '40%',
    width: '90%',
    backgroundColor: '#FFFFFF',
    bottom: 0,
    paddingBottom: 30,
    borderRadius: 10
  },
  contentText: {
    padding: 15,
    flex: 4,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
