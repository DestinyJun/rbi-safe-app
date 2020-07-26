/**
 * desc：  文件下载
 * author：DestinyJun
 * date：  2020/7/26 17:09
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Header, Icon} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import RNFS from 'react-native-fs';

export class DownloadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.file = {...props.route.params}
  }

  render() {
    console.log(this.file);
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          backgroundColor={'#226AD5'}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `文件下载`,style: {fontSize: 20,color: '#fff'}}}
        />
        <View style={styles.fileInfo}>
          <View style={styles.fileInfoTop}>
            <Icon type={'font-awesome'} name={'file'} color={'#207347'} size={50} />
            <Text style={{textAlign: 'center',marginTop: 10,fontSize: 18}}>{this.file.resourceName}</Text>
          </View>
          <Button buttonStyle={c_styles.button} title={'使用其他应用打开'} />
        </View>
      </View>
    );
  }

  componentDidMount() {
    let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath ;
    RNFS.downloadFile({
      fromUrl: this.file.resourcePath,
      toFile:  `${dirs}/${this.file.resourceName}`,
      background: true,
    }).promise
      .then(res => {
        console.log(res);
        console.log(`${dirs}/${this.file.resourceName}`);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fileInfoTop: {

  },
  fileInfo: {
    flex: 1,
    justifyContent: 'space-around'
  }
});
