/**
 * desc：  安全管理培训计划统计
 * author：DestinyJun
 * date：  2020/4/3 14:06
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default class EchartsBarDoubleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.timer = null;
    this.webRef = React.createRef();
  }

  render() {
    const option =  this.chartsInit(this.props.option);
    this.timer = setTimeout(() => {
      clearInterval(this.timer);
      this.webRef.current.reload();
    }, 1000);
    return (
      <View style={styles.container}>
        <WebView
          ref={this.webRef}
          originWhitelist={['*']}
          source={{html: `
         <!DOCTYPE html>
         <html>
         <head>
          <title>echarts</title>
          <meta http-equiv="content-type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=320, user-scalable=no">
          <script src="https://libs.cdnjs.net/echarts/4.7.0/echarts.min.js"></script>
          <style type="text/css">
            body {
              margin: 0;
              padding: 0;
            }
            .line-box{
              width: 100vw;
              height: 100vh;
            }
          </style>
         </head>
         <body>
         <div id="main" class="line-box" ></div>
         </body>
         </html>
        `}}
          useWebKit={true}
          geolocationEnabled={true}
          mixedContentMode={'always'}
          scrollEnabled={false}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          injectedJavaScript={`
           var data = ${JSON.stringify(option)};
           var myChart = echarts.init(document.getElementById('main'));
           myChart.setOption(${JSON.stringify(option)});
           window.addEventListener("resize", function () {
            myChart.resize();
           });
           window.ReactNativeWebView.postMessage(JSON.stringify(data))
        `}
          startInLoadingState={true}
          automaticallyAdjustContentInsets={false}
          onMessage={(event) => {
            // console.log(JSON.parse(event.nativeEvent.data));
          }}
        />
      </View>
    );
  }

  // eecharts初始化
  chartsInit(item) {
    const bardata = [];
    const barBottomData = [];
    const barTopData = [];
    item.barData.forEach((item) => {
      if (item < 0) {
        bardata.push({
          value: item,
          itemStyle: {
            normal: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(59,134,255)'
                }, {
                  offset: 1,
                  color: '#58C1F9'
                }]
              }
            }
          },
          label: {
            show: true,
            color: '#448BFF',
            position: item > -10 ? ['10%', 20] : ['10%', '150%'],
            formatter: '{c}%',
            fontSize: 8
          },
        });
        barBottomData.push({
          value: item,
          symbolOffset: [0, -10],
          itemStyle: {
            normal: {
              color: 'rgba(61,138,254,1)'
            }
          },
        });
        barTopData.push({
          value: item,
          symbolOffset: [0, 10],
        });
      } else {
        bardata.push({
          value: item,
          itemStyle: {
            normal: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [{
                  offset: 0,
                  color: '#58C1F9'
                }, {
                  offset: 1,
                  color: 'rgba(59,134,255)'
                }]
              }
            }
          },
          label: {
            show: true,
            color: '#448BFF',
            position: [0, -25],
            formatter: '{c}%',
            fontSize: 8
          },
        });
        barBottomData.push({
          value: item,
          symbolOffset: [0, 10],
        });
        barTopData.push({
          value: item,
          symbolOffset: [0, -10],
        });
      }
    });
    return {
      tooltip: {
        trigger: 'axis',
        formatter: '{b} : {c}%',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '7%',
        top: '15%',
        right: '5%',
        bottom: '15%',
      },
      legend: {
        show: true,
        icon: 'circle',
        orient: 'horizontal',
        top: '90.5%',
        right: 'center',
        itemWidth: 16.5,
        itemHeight: 6,
        textStyle: {
          color: '#C9C8CD',
          fontSize: 14
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          margin: 30,
          color: '#B8B8B8',
          fontSize: 8,
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,0,0,0.5)',
            width: 2
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        data: item.xdata,
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisLabel: {
            margin: 8,
            color: '#B8B8B8',
            fontSize: 8
          },
          axisTick: {
            show: true,
            length: 15,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          splitLine: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 2
            }
          }
        }
      ],
      series: [
        // 柱底圆片
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 15],
          z: 12,
          itemStyle: {
            normal: {
              color: 'rgba(61,138,254,1)'
            }
          },
          data: barBottomData
        },
        // 柱体
        {
          name: '',
          type: 'bar',
          barWidth: 20,
          barGap: '0%',
          data: bardata
        },
        // 柱顶圆片
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 15],
          z: 12,
          symbolPosition: 'end',
          'itemStyle': {
            'normal': {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#58C1F9'
                  },
                  {
                    offset: 1,
                    color: '#3F8EFE'
                  }
                ],
                global: false // 缺省为 false
              },
            }
          },
          data: barTopData
        }
      ]
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
