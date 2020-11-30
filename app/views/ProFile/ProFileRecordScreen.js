/**
 * desc：  我的隐患排查记录
 * author：DestinyJun
 * date：  2020/7/3 17:47
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ProFileRecordStyles as styles} from "./ProFileRecordStyles";
import {Button, Header, Image, ListItem} from "react-native-elements";
// 自定义组件
import {HeaderLeftComponent} from "../../components/HeaderLeftComponent";
import {TroubleListComponent} from "../../components/TroubleListComponent";
import {DialogContentComponent} from "../../components/DialogContentComponent";
import {CheckMultipleComponent} from "../../components/CheckMultipleComponent";
import {CheckSingleComponent} from "../../components/CheckSingleComponent";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
// 自定义工具类
import {post} from "../../service/Interceptor";
import {ProFileApi} from "../../service/ProFileApi";
import {TROUBLE_ARR_GRADE, TROUBLE_ARR_TYPE} from "../../util/Constant";


export class ProFileRecordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      contentModalShow: false,
      info: {},
      beforeImgs: [],
      afterImgs: [],
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
          statusBarProps={{backgroundColor: '#23344E'}}
          containerStyle={{backgroundColor: '#23344E',zIndex: 1}}
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
                        this.getRecordDetail(item.hidDangerCode);
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
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'公司'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.companyName}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'厂矿'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.factoryName}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'车间'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.workshopName}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'班组'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.className}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'排查时间'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info&&this.state.info.troubleshootingTime}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                  disabled={true}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true} title={'治理资金'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.info.governanceFunds?this.state.info.governanceFunds.toString():'无'}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                />
                <ListItem
                  containerStyle={{backgroundColor: 'none'}}
                  bottomDivider={true}
                  title={'完成时间'}
                  titleStyle={{color: '#9D9D9D'}}
                  rightTitle={this.state.timeTitle?this.state.timeTitle:'无'}
                  rightTitleProps={{numberOfLines: 1,ellipsizeMode: 'tail'}}
                />
                <View style={[c_styles.pt_4,c_styles.pb_4,styles.borderBottom]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患类型</Text>
                  <CheckMultipleComponent
                    value={{
                      hidTypePerson: this.state.info.hidTypePerson,
                      hidTypeThing: this.state.info.hidTypeThing,
                      hidTypeManage: this.state.info.hidTypeManage
                    }}
                    disabled={true}
                    options={TROUBLE_ARR_TYPE}
                  />
                </View>
                <View style={[c_styles.pt_4,c_styles.pb_4,styles.borderBottom]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患等级</Text>
                  <ScrollView horizontal={true}>
                    <CheckSingleComponent
                      value={this.state.info.hidDangerGrade}
                      disabled={true}
                      options={TROUBLE_ARR_GRADE}
                    />
                  </ScrollView>
                </View>
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患描述</Text>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#4B4B4B'}}>{this.state.info&&this.state.info.hidDangerContent}</Text>
                </View>
                <View style={[{paddingTop: 15}]}>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>整改意见</Text>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#4B4B4B'}}>{this.state.info&&this.state.info.rectificationOpinions}</Text>
                </View>
                <View>
                  <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患现场情况</Text>
                  <View style={[styles.siteBox,c_styles.mb_3]}>
                    {
                      this.state.beforeImgs&&this.state.beforeImgs.map((item,index) => (
                        <Image key={index} source={{uri: item.beforePicture}} style={{
                          height: 100,
                          width: 100,
                          borderColor: '#E5E5E5',
                          borderWidth: 1,
                          marginRight: 10,}} resizeMode={'contain'} />
                      ))
                    }
                  </View>
                  {
                    this.state.afterImgs.length>0&&<View>
                      <Text style={{paddingLeft: 15,paddingBottom: 10,fontSize: 16,color: '#9D9D9D'}}>隐患现场情况：整改后</Text>
                      <View style={[styles.siteBox,c_styles.mb_3]}>
                        {
                          this.state.afterImgs.map((item,index) =>{
                            return (
                              <Image key={index} source={{uri: item.afterPicture}} style={{
                                height: 100,
                                width: 100,
                                borderColor: '#E5E5E5',
                                borderWidth: 1,
                                marginRight: 10,}} resizeMode={'contain'} />
                            )
                          })
                        }
                      </View>
                    </View>
                  }
                </View>
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

  // 获取隐患排查详情
  getRecordDetail(code) {
    showLoading();
    post(ProFileApi.GET_RECORD_DETAIL,{hidDangerCode: code})
      .then((res) => {
        hiddenLoading();
        this.setState({
          info: res.data.hidDangerDO,
          afterImgs:  res.data.afterImgs,
          beforeImgs:  res.data.beforImgs,
        },() => {
          this.setState({
            contentModalShow: true,
          })
        })
      })
      .catch(err => {
        hiddenLoading();
      });
  }
}

