/**
 * desc：  安全管理培训计划统计
 * author：DestinyJun
 * date：  2020/4/3 14:06
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {HTML} from "../util/Constant";
import {renderChart} from "../util/ToolFunction";

export default class EchartsBarDoubleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  chartsInit(item) {
    const {seriesName, threshold, avgTime, baseNum} = {...item};
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: (val) => {
          let color = '';
          if ((val[0].axisValue === 'E' || val[0].axisValue === 'G') && val[0].value > threshold[val[0].dataIndex]) {
            color = '#FCE149';
          } else {
            color = '#37C611';
          }
          return `${val[0].name}<br/>
										<span style="color:${color};">   ● </span>${val[0].seriesName}: ${parseFloat((val[0].data - baseNum).toFixed(3))}<br/>
										<span style="color:#3AB6EB;">   ● </span>${val[1].seriesName}: ${parseFloat((val[1].data - baseNum).toFixed(3))}`;
        }
      },
      grid:  {
        left: '5%',
        right: '12%',
        bottom: '10%',
      },
      legend: {
        data: ['平均成绩', '平均学时'],
        right: '10%',
        top: '3%',
        textStyle: {
          color: '#AAAAAA'
        },
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 10,  // borderRadius最大为宽高最小值的一半，即为5
      },
      yAxis: [
        {
          type: 'value',
          gridIndex: 0,
          min: (value) => {
            return baseNum * 10;
          },
          max: (value) => {
            return value.max > 10 ? value.max : 10;
          },
          axisLine: {
            show: false,
            onZero: true
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          }
        }
      ],
      xAxis: [
        {
        type: 'category',
        gridIndex: 0,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          align: 'center',
          lineStyle: {
            color: '#A3',
            fontSize: '14px'
          }
        },
        axisLabel: {
          show: true,
          color: '#A7A7A7',
        },
        data: seriesName,
        zlevel: 2
      },
      ],
      series: [
        {
          name: '平均成绩',
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            normal: {
              color: '#226AD5',
              barBorderRadius: 12,
            },
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              fontSize: 11,
              color: '#3AC712',
              formatter: (val) => {
                return `${val.value}s`;
              }
            }
          },
          data: avgTime,
        },
        {
          name: '平均学时',
          type: 'bar',
          barWidth: 8,
          barGap: '40%', // 不同系列的柱间距离  为barWidth的 1.5倍
          // barCateGoryGap: 40,  //同一系列的柱间距离，默认为类目间距的20%，可设固定值
          itemStyle: {
            normal: {
              color: '#63DCAF',
              barBorderRadius: 11,
            }
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              fontSize: 11,
              color: '#48FAB1',
              formatter: (val) => {
                return `${val.value}s`;
              }
            }
          },
          data: threshold,
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
