/**
 * desc：  图表统计
 * author：DestinyJun
 * date：  2020/4/3 14:06
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {HTML} from "../util/Constant";
import {renderChart} from "../util/ToolFunction";

export default class EchartsLinerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {}
    };
    this.HTML = {
      html: HTML,
    };
  }

  render() {
    const option =  this.chartsInit(this.props.option);
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={this.HTML}
          useWebKit={true}
          geolocationEnabled={true}
          mixedContentMode={'always'}
          scrollEnabled={false}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          injectedJavaScript={renderChart(this.props,option)}
          startInLoadingState={true}
          automaticallyAdjustContentInsets={false}
          onMessage={(event) => {
            console.log(event.nativeEvent.data);
          }}
        />
      </View>
    );
  }

  chartsInit(data) {
    const xAxis = [];
    const datas = [];
    if (data) {
      Object.keys(data).reverse().forEach((item) => {
        xAxis.push(item);
        datas.push(data[item])
      })
    }
    return  {
      grid: {
        top: '11%',
        left: '1%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            opacity: 0.3
          },
        },
        formatter: (params) => {
          return '<div>' +
            '<p style="padding: 0 5px 0 5px;margin: 0">' + params[0].name + ':00</p>' +
            '<p style="padding: 0 5px 0 5px;margin: 0">' +
            '<span style="display: inline-block;width: 10px;height: 10px;border-radius: 50%;background-color: #468F80"></span>' +
            '<span style="margin-left:5px">' + params[0].seriesName + params[0].value + '</span>' +
            '</p>' +
            '</div>';
        },
        backgroundColor: '#FFFFFF',
        textStyle: {
          color: '#6A6A6A'
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
        axisLabel: {
          // margin: 30,
          color: '#575757'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#DDEAE7',
            opacity: 0.2
          },
        },
      },
      yAxis: [{
        type: 'value',
        position: 'left',
        axisLabel: {
          color: '#575757'
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#DDEAE7',
            opacity: 0.2,
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 2
          }
        }
      }],
      series: [
        {
          name: '月隐患数',
          type: 'line',
          showSymbol: false,
          smooth: true, //是否平滑曲线显示
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 2,
          lineStyle: {
            color: "#609E91", // 线条颜色
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#434343',
            }
          },
          itemStyle: {
            color: "#468F80",
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#eb64fb' // 0% 处的颜色
                }, {
                  offset: 1, color: '#3fbbff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            }
          },
          data: datas
        }]
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
