/**
 * desc：  拍照/选择图片组件
 * author：DestinyJun
 * date：  2020/7/21 20:46
 */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Badge, Icon, Image} from "react-native-elements";

export class PickerImageComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: []
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}} horizontal={true}>
          <TouchableOpacity onPress={this.handleCamera}>
            <View style={styles.content}>
              <Icon type={'material'} name={'add'} color={'#E0E0E0'} size={80} />
            </View>
          </TouchableOpacity>
          {
            this.state.avatarSource.length>0&& this.state.avatarSource.map((item,index) =>{
              return (
                <View key={index} style={styles.content}>
                  <Badge
                    onPress={this.delCamera.bind(this,index)}
                    containerStyle={styles.imageBadge}
                    badgeStyle={{height: 20,width: 20,borderRadius: 20}}
                    value={<Icon type={'font-awesome'} name={'minus'} color={'#fff'} size={12} />}
                    status="error" />
                  <Image source={{uri: item.uri}} style={{height: 100}} resizeMode={'cover'} />
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
  // 选取图片
   handleCamera = () => {
     if (this.state.avatarSource.length>6) {
       return;
     }
     ImagePicker.launchImageLibrary({}, (response) => {
       if (response.didCancel || this.state.avatarSource.length>6) {
         return;
       }
       const source = { uri: 'data:image/jpeg;base64,' + response.data,fileName: response.fileName };
       this.setState({
         avatarSource: this.state.avatarSource.concat(source)
       },() =>{
         if (this.props.onSelect) {
           this.props.onSelect(this.state.avatarSource);
         }
       });
     });
  };

  // 删除图片
  delCamera (index){
    this.setState({
      avatarSource: this.state.avatarSource.filter((l,i) => i!==index)
    },() =>{
      if (this.props.onSelect) {
        this.props.onSelect(this.state.avatarSource);
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  content: {
    width: 100,
    height: 100,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    marginRight: 10,
    position: 'relative'
  },
  imageBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  }
});
