/**
 * desc：  月隐患数量统计
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
    const series = [];
    const colors = ['#00FF00','#9F0099','#5B9BD5','#FFC000','#FF0000'];
    data.data.forEach((item, index) => {
      if (index === 0) {
        series.push({
          name: item.name,
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
            type: item.isShowDotted ? 'dashed' : 'solid'
          },
          data: item.value,
        });
      }
      else if (index === 1) {
        series.push({
          name: item.name,
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
            type: item.isShowDotted ? 'dashed' : 'solid'
          },
          data: item.value,
        });
      }
      else if (index === 2) {
        series.push({
          name: item.name,
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
          stack: '阈值',
          areaStyle: {
            color:  'rgb(0,0,255)',
            origin: 'start',
            opacity: 1
          },
          lineStyle: {
            type: item.isShowDotted ? 'dashed' : 'solid'
          },
          data: item.value,
        });
      }
      else if (index === 3) {
        series.push({
          name: item.name,
          type: 'line',
          smooth: true, // 是否平滑曲线显示
          symbol: 'circle',
          stack: '阈值',
          symbolSize: 8,
          label: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#fff',
            }
          },
          areaStyle: {
            color: 'rgb(255,255,0)',
            opacity: 1
          },
          lineStyle: {
            type: item.isShowDotted ? 'dashed' : 'solid'
          },
          data: item.value,
        });
      }
      else {
        series.push({
          name: item.name,
          type: 'line',
          smooth: true, // 是否平滑曲线显示
          symbol: 'circle',
          stack: '阈值',
          symbolSize: 8,
          label: {
            show: false,
            position: 'top',
            textStyle: {
              color: '#fff',
            }
          },
          areaStyle: {
            color: 'rgb(255,97,0)',
            opacity: 1
          },
          lineStyle: {
            type: item.isShowDotted ? 'dashed' : 'solid'
          },
          data: item.value,
        });
      }
    });
    return  {
      color: colors,
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
        left: '2%',
        right: '3%',
        bottom: '8%',
        containLabel: true,
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
          right: '3%',
          height: 15,
          top: '94%',
          start: 0,//滚动条的起始位置
          end: 50 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
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
              color: 'red'
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
