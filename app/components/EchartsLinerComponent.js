/**
 * desc：  月隐患数量统计
 * author：DestinyJun
 * date：  2020/4/3 14:06
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default class EchartsLinerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {}
    };
  }

  render() {
    const option =  this.chartsInit(this.props.option);
    return (
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
            <!DOCTYPE html>
            <html>
            <head>
              <title>综合监测预警</title>
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
              <div id="main" class="line-box"></div>
            </body>
            </html>
            `
          }}
          mixedContentMode={'always'}
          allowUniversalAccessFromFileURLs={true}
          injectedJavaScript={`
            var myChart = echarts.init(document.getElementById('main'));
            myChart.setOption(${JSON.stringify(option)});
            window.addEventListener("resize", function () {
              myChart.resize();
            });
            myChart.on('click', function (params) {
              window.ReactNativeWebView.postMessage(params.dataIndex);
            });
          `}
          javaScriptEnabled={true}
          startInLoadingState={true}
          onMessage={(event) => {
            this.props.chartClick(event.nativeEvent.data)
          }}
        />
      </View>
    );
  }
  chartsInit(data) {
    const colors = ['#00FF00','#9F0099','#5B9BD5','#FFC000','#ff6c6a'];
    const line0 = {name: null, value: null, isShowDotted: null};
    const line1 = {name: null, value: null, isShowDotted: null};
    const bottoms = {name: null, value: null, isShowDotted: null};
    const middle = {name: null, value: null, isShowDotted: null};
    const top = {name: null, value: null, isShowDotted: null};
    data.data.forEach((item, index) => {
      if (index === 0) {
        line0.name = item.name;
        line0.value = item.value;
        line0.isShowDotted = item.isShowDotted;
      }
      else if (index === 1) {
        line1.name = item.name;
        line1.value = item.value;
        line1.isShowDotted = item.isShowDotted;
      }
      else if (index === 2) {
        bottoms.name = item.name;
        bottoms.value = item.value;
        bottoms.isShowDotted = item.isShowDotted;
      }
      else if (index === 3) {
        middle.name = item.name;
        middle.value = item.value;
        middle.isShowDotted = item.isShowDotted;
      }
      else {
        top.name = item.name;
        top.value = item.value;
        top.isShowDotted = item.isShowDotted;
      }
    });
    const series = [
      {
        name: top.name,
        type: 'line',
        smooth: true, // 是否平滑曲线显示
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#fff',
          }
        },
        lineStyle: {
          type: top.isShowDotted ? 'dashed' : 'solid'
        },
        areaStyle: {
          color: '#fea96d',
          origin: 'start',
          opacity: 1
        },
        data: top.value,
      },
      {
        name: middle.name,
        type: 'line',
        smooth: true, // 是否平滑曲线显示
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#fff',
          }
        },
        lineStyle: {
          type: middle.isShowDotted ? 'dashed' : 'solid'
        },
        areaStyle: {
          color: '#fefe9f',
          origin: 'start',
          opacity: 1
        },
        data: middle.value,
      },
      {
        name: bottoms.name,
        type: 'line',
        smooth: true, // 是否平滑曲线显示
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#fff',
          }
        },
        lineStyle: {
          type: bottoms.isShowDotted ? 'dashed' : 'solid'
        },
        areaStyle: {
          color: '#97b9fc',
          origin: 'start',
          shadowColor: '#F3F3F3',
          shadowOffsetX: 1
        },
        data: bottoms.value,
      },
      {
        name: line1.name,
        type: 'line',
        smooth: true, // 是否平滑曲线显示
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#fff',
          }
        },
        lineStyle: {
          type: line1.isShowDotted ? 'dashed' : 'solid'
        },
        data: line1.value,
      },
      {
        name: line0.name,
        type: 'line',
        smooth: true, // 是否平滑曲线显示
        symbol: 'circle',
        symbolSize: 8,
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#fff',
          }
        },
        lineStyle: {
          type: line0.isShowDotted ? 'dashed' : 'solid'
        },
        data: line0.value,
      }
    ];
    return  {
      color: colors.reverse(),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (val) => {
          let str = '';
          val.forEach((item) => {
            if (!(item.seriesName)) {
              str += ``;
            } else {
              str += `<span style="color:${item.color};">●</span><span style="font-size: 6px">${item.seriesName}: ${parseFloat((item.data).toFixed(3))}</span><br/>`;
            }
          });
          return `<span style="font-size: 8px">${val[0].name}</span><br/>${str}`;
        }
      },
      grid: {
        top: '15%',
        left: '7%',
        right: '5%',
        bottom: '8%',
        show: false,
        containLabel: false
      },
      legend: [
        {
          show: true,
          right: '5%',
          top: '3%',
          itemWidth: 15,
          itemHeight: 8,
          textStyle: {
            color: '#AAAAAA',
            fontSize: 8
          },
          data: [
            {name: 'SPI实际值'}
          ]
        },
        {
          show: true,
          right: '30%',
          top: '3%',
          itemWidth: 15,
          itemHeight: 8,
          textStyle: {
            color: '#AAAAAA',
            fontSize: 8
          },
          data: [
            {name: 'SPI预测值'}
          ]
        },
      ],
      dataZoom: [
        {
          type: 'slider',
          show: true, //flase直接隐藏图形
          xAxisIndex: [0],
          left: '3%', //滚动条靠左侧的百分比
          right: '6%',
          height: 15,
          top: '94%',
          start: 50,//滚动条的起始位置
          end: 100 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        }
      ],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitNumber: 50,
        axisLabel: {
          margin: 10,
          color: '#B8B8B8',
          fontSize: 8,
          width: 5
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: '#ff6c6a'
          }
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        data: data.xData,
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
          splitArea: {
            show: true,
            areaStyle: {
              color: '#ff6c6a'
            }
          },
          axisTick: {
            show: true,
            length: 15,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
        }
      ],
      series: series
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
