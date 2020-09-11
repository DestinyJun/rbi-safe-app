/**
 * desc：  班主考试
 * author：DestinyJun
 * date：  2020/7/2 14:51
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Button, Icon} from "react-native-elements";
import {hiddenLoading, showLoading} from "../../util/ToolFunction";
import {post} from "../../service/Interceptor";
import {EducationApi} from "../../service/EducationApi";

export class EducationClassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      seExamList: [], // 需要加载的数据列表
      pageNo: 1, // 当前页
      dataFlag: true, // 判断是否还有下一页
    };
    this.unfocus = null;
  }
  render() {
    return (
      <View style={{flex: 1,paddingBottom: 20}}>
        <FlatList
          data={this.state.seExamList}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item,index) => {
            return item.id.toString();
          }}
          ItemSeparatorComponent={({highlighted,leadingItem }) => {
            return (<View style={{height: 2,backgroundColor: 'red'}}/>)
          }}
          ListEmptyComponent={<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>您还没有任何班主考试！</Text>}
          ListFooterComponent={this.renderListFooter()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              colors={['#226AD5']}
              progressBackgroundColor={"#ffffff"}
              size={'default'}
              onRefresh={() => {
                this.setState({
                  pageNo: 1,
                  seExamList: [],
                  dataFlag: true,
                  refreshing: true
                },() => {
                  this.classEducationInit(this.state.pageNo);
                });
              }}
            />
          }
          removeClippedSubviews={true}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (this.state.dataFlag) {
              this.setState({
                pageNo: this.state.pageNo+1
              },() => {
                this.classEducationInit(this.state.pageNo);
              });
            }
          }}
        />
        {/*<ScrollView style={{flex: 1}}>
          {
            this.state.seExamList.length>0?this.state.seExamList.map((item,index) => (
                <View style={styles.content} key={index}>
                  <View style={[styles.examCard]}>
                    <View style={styles.title}>
                      <Icon type={'font-awesome'} name={'list-alt'} size={20} color={'#3B86FF'} raised={true}/>
                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 20, color: '#333333', marginLeft: 6}} numberOfLines={1} ellipsizeMode={'tail'}>{item.testPaperName}</Text>
                      </View>
                    </View>
                    <View style={[c_styles.pl_5,c_styles.pt_3]}>
                      {
                        item.idt &&  <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'calendar'} size={16} color={'#3B86FF'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>创建时间：{item.idt}</Text>
                        </View>
                      }
                      {
                        item.operatingStaff && <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'user-o'} size={18} color={'#3B86FF'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>发布人：{item.operatingStaff}</Text>
                        </View>
                      }
                      {
                        item.testResults && <View style={[styles.timerBox]}>
                          <Icon type={'font-awesome'} name={'diamond'} size={16} color={'#3B86FF'}/>
                          <Text style={[c_styles.h6, c_styles.ml_2]}>考试结果：{item.testResults}</Text>
                        </View>
                      }
                    </View>
                    <View style={[styles.buttons]}>
                      <Button
                        disabled={item.processingStatus === 2}
                        disabledStyle={{backgroundColor: '#BABABA'}}
                        disabledTitleStyle={{color: '#fff'}}
                        title={item.processingStatus === 2?`考试完成`:`开始考试`}
                        onPress={() => {
                          Alert.alert('考前须知', item.examNotes, [
                            {
                              text: '取消考试', onPress: () => {
                              }, style: "cancel"
                            },
                            {
                              text: '开始考试', onPress: () => {
                                this.examStart(item);
                              }
                            },
                          ], {cancelable: false});
                        }}
                        />
                    </View>
                  </View>
                </View>
              ))
              :<Text style={[c_styles.pt_5,c_styles.text_center,c_styles.text_secondary,c_styles.h5]}>您还没有任何班主考试！</Text>
          }
        </ScrollView>*/}
      </View>
    );
  }

  // 组件挂载
  componentDidMount() {
    this.unfocus = this.props.navigation.addListener('focus',() => {
      showLoading();
      this.setState({
        seExamList: [],
        refreshing: true,
        pageNo: 1, // 当前页
        dataFlag: true, // 判断是否还有下一页
      },() => {
        this.classEducationInit(this.state.pageNo);
      });
    });
  }

  // 组件卸载
  componentWillUnmount() {
    this.unfocus();
  }

  // 数据初始化
  classEducationInit(pageNo) {
    // 分页查询班主试卷
    post(EducationApi.GET_GRAND_EXAM, {pageNo, pageSize: 5})
      .then((train) => {
        hiddenLoading();
        this.setState({
          seExamList: [...this.state.seExamList,...train.data.contents],
          refreshing: false,
          dataFlag: this.state.pageNo !== train.data.totalPage
        })
      })
      .catch((err) => {
        this.setState({ refreshing: false });
        hiddenLoading();
      });
  }

  // 渲染列表
  renderItem({item,index,separators}) {
    return (
      <View style={styles.content} key={index}>
        <View style={[styles.examCard]}>
          <View style={styles.title}>
            <Icon type={'font-awesome'} name={'list-alt'} size={20} color={'#3B86FF'} raised={true}/>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20, color: '#333333', marginLeft: 6}} numberOfLines={1} ellipsizeMode={'tail'}>{item.testPaperName}</Text>
            </View>
          </View>
          <View style={[c_styles.pl_5,c_styles.pt_3]}>
            {
              item.idt &&  <View style={[styles.timerBox]}>
                <Icon type={'font-awesome'} name={'calendar'} size={16} color={'#3B86FF'}/>
                <Text style={[c_styles.h6, c_styles.ml_2]}>创建时间：{item.idt}</Text>
              </View>
            }
            {
              item.operatingStaff && <View style={[styles.timerBox]}>
                <Icon type={'font-awesome'} name={'user-o'} size={18} color={'#3B86FF'}/>
                <Text style={[c_styles.h6, c_styles.ml_2]}>发布人：{item.operatingStaff}</Text>
              </View>
            }
            {
              item.testResults && <View style={[styles.timerBox]}>
                <Icon type={'font-awesome'} name={'diamond'} size={16} color={'#3B86FF'}/>
                <Text style={[c_styles.h6, c_styles.ml_2]}>考试结果：{item.testResults}</Text>
              </View>
            }
          </View>
          <View style={[styles.buttons]}>
            <Button
              disabled={item.processingStatus === 2}
              disabledStyle={{backgroundColor: '#BABABA'}}
              disabledTitleStyle={{color: '#fff'}}
              title={item.processingStatus === 2?`考试完成`:`开始考试`}
              onPress={() => {
                Alert.alert('考前须知', item.examNotes, [
                  {
                    text: '取消考试', onPress: () => {
                    }, style: "cancel"
                  },
                  {
                    text: '开始考试', onPress: () => {
                      this.examStart(item);
                    }
                  },
                ], {cancelable: false});
              }}
            />
          </View>
        </View>
      </View>
    )
  }

  // 渲染滚动到底部时的组件
  renderListFooter() {
    const { dataFlag } = this.state;
    return (
      <View style={styles.footerItem}>
        {
          dataFlag ? <Text style={{fontSiz: 16,paddingTop: 10,color: 'red',textAlign: 'center'}}>加载中......</Text>:
            <Text style={{fontSiz: 16,paddingTop: 10,color: 'red',textAlign: 'center'}}>已全部加载</Text>
        }
      </View>
    )
  }

  // 开始考试
  examStart(item) {
    this.props.navigation.navigate(
      'EducationExamScreen',
      {
        title: item.testPaperName,
        name: '班主考试',
        exam: item
      }
    );
  };
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  examCard: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
    paddingLeft: 12,
    paddingRight: 15
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F8F8F8',
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  progressTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    paddingBottom: 20,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonsStyles: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20
  }
});
