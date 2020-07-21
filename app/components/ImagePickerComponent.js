/**
 * desc：  拍照/选择图片组件
 * author：DestinyJun
 * date：  2020/7/21 20:46
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Icon} from "react-native-elements";

export function ImagePickerComponent(props) {
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const handleCamera = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  };
  return (
    <TouchableOpacity>
      <View  style={styles.container}>
        <Icon type={'material'} name={'add'} color={'#E0E0E0'} size={100} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderColor: '#E5E5E5',
    borderWidth: 1
  }
});
