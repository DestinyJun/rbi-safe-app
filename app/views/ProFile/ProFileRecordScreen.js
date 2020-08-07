/**
 * desc：  我的隐患排查记录
 * author：DestinyJun
 * date：  2020/7/3 17:47
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ProFileRecordStyles as styles} from "./ProFileRecordStyles";
import {Button, Header, Image, ListItem} from "react-native-elements";
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {TroubleListComponent} from "../../components/TroubleListComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";
import {DialogContentComponent} from "../../components/DialogContentComponent";

export class ProFileRecordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      contentModalShow: false,
      detailContent: {},
    };
    this.detailFiled = [
      {name: '公司',keywords: 'companyName'},
      {name: '厂矿',keywords: 'factoryName'},
      {name: '车间',keywords: 'workshopName'},
      {name: '班组',keywords: 'className'},
      {name: '排查时间',keywords: 'troubleshootingTime'},
      {name: '隐患等级',keywords: 'hidDangerGrade'},
      {name: '隐患类型（人）',keywords: 'hidTypePerson'},
      {name: '隐患类型（物）',keywords: 'hidTypeThing'},
      {name: '隐患类型（管理）',keywords: 'hidTypeManage'},
      {name: '隐患描述',keywords: 'hidDangerContent'},
      {name: '隐患现场情况',keywords: 'beforePicture'},
    ]
  }

  render() {
    return (
      <View style={styles.Record}>
        <Header
          statusBarProps={{backgroundColor: '#226AD5'}}
          containerStyle={{backgroundColor: '#226AD5',zIndex: 1}}
          leftComponent={<HeaderLeftComponent headerLeftOnPress={() => {this.props.navigation.goBack()}} />}
          centerComponent={{text: `我的隐患排查记录`, style: {fontSize: 20, color: '#fff'}}}
        />
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.content}>
              {
                this.state.list.length>0?this.state.list.map((item,i) => {
                  let title = '';
                  if (item.workshopName) {
                    title = `${item.factoryName}${item.workshopName}`;
                  } else {
                    title = `${item.factoryName}`;
                  }
                  return (
                    <TroubleListComponent
                      key={`TroubleListComponent${i}`}
                      title={title}
                      color={item.color}
                      onPress={(() => {
                        this.setState({
                          contentModalShow: true,
                          detailContent: {...item}
                        })
                      })}
                      subtitle={item.hidDangerContent}
                      rightTitle={item.idt.split(' ')[0]}
                      processingStatus={item.processingStatus}
                    />
                  )
                }):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>亲，一切正常，没有任何隐患呢！</Text>
              }
            </View>
          </ScrollView>
          <DialogContentComponent isVisible={this.state.contentModalShow} title={'详细信息'}  onClose={(res) => {
            this.setState({
              contentModalShow: res
            })
          }}>
            <View style={styles.dialogContainer}>
              <ScrollView style={{flex: 1}}>
                {
                  Object.keys(this.state.detailContent).length>0?this.detailFiled.map((item,index) => {
                    if (item.keywords === 'hidTypePerson' || item.keywords === 'hidTypeThing' || item.keywords === 'hidTypeManage') {
                     return (
                       <ListItem
                         key ={index}
                         containerStyle={{backgroundColor: 'none'}}
                         bottomDivider={true}
                         title={item.name}
                         titleStyle={{color: '#9D9D9D'}}
                         rightTitle={this.state.detailContent&&(this.state.detailContent[item.keywords]?'有':'暂无')}
                         rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                         disabled={true}
                       />
                     )
                    } else if (item.keywords === 'beforePicture'){
                      {
                        if (this.state.detailContent.beforeImgs) {
                          return this.state.beforeImgs.map((l,i) => (
                            <Image key={i} source={{uri: l.beforePicture}} style={{
                              height: 100,
                              width: 100,
                              borderColor: '#E5E5E5',
                              borderWidth: 1,
                              marginRight: 10,}} resizeMode={'contain'} />
                          ))
                        }
                      }
                    } else {
                      return (
                        <ListItem
                          key ={index}
                          containerStyle={{backgroundColor: 'none'}}
                          bottomDivider={true}
                          title={item.name}
                          titleStyle={{color: '#9D9D9D'}}
                          rightTitle={this.state.detailContent&&(this.state.detailContent[item.keywords]?this.state.detailContent[item.keywords]:'暂无')}
                          rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                          disabled={true}
                        />
                        )
                    }
                  }):<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>
                      详情为空！
                  </Text>
                }

              </ScrollView>
              <Button title={'关闭'} buttonStyle={c_styles.button} onPress={() => {
                this.setState({
                  contentModalShow: false,
                })
              }}/>
            </View>
          </DialogContentComponent>
        </View>
      </View>
    );
  }

  // 组件挂载生命周期
  componentDidMount() {
    showLoading();
    post(ProFileApi.GET_RECORD_LIST,{pageNo: 1,pageSize: 100000})
      .then((res) => {
        hiddenLoading();
        this.setState({
          list: [...res.data.contents]
        },() => {});
      })
      .catch(err => {
        hiddenLoading();
      });
  }
}

