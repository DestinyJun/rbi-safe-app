/**
 * desc：  分秒倒计时
 * author：DestinyJun
 * date：  2020/8/28 9:44
 */
import React, {Component} from 'react';
import {Text} from 'react-native';

export class CountdownComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: []
    };
    this.timeControl = null;
    this.countdown(this.props.duration);
  }
  render() {
    return (<Text>{`${this.state.duration[0]}分${this.state.duration[1]}秒`}</Text>);
  }
  componentWillUnmount() {
    clearInterval(this.timeControl)
  }

  // 考试倒计时
  countdown(timer) {
    clearInterval(this.timeControl);
    if (timer === 0) {
      return false
    }
    let totalTimer = timer*60;
    this.timeControl = setInterval(() => {
      totalTimer--;
      if (totalTimer === 0) {
        clearInterval(this.timeControl);
        this.props.timerStop();
      }
      this.setState({
        duration: [Math.trunc(totalTimer/60),totalTimer%60]
      })
    },1000);
  }
}
