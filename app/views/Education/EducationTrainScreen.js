/**
 * desc：  培训计划界面
 * author：DestinyJun
 * date：  2020/7/2 16:12
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {EducationTrainStyles as styles} from "./EducationTrainStyles";
import {ListItem} from "react-native-elements";

export class EducationTrainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.navigation.setOptions({
      title: `${this.props.route.params.title}`
    })
  }

  render() {
    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
        icon: 'av-timer'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
        icon: 'av-timer'
      },
    ];
    return (
      <View style={styles.Train}>
        <Text>EducationTrainScreen</Text>
        {
          list.map((l, i) => (
            <ListItem
              activeScale={1} //
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              rightIcon={{ name: l.icon }}
              subtitle={l.subtitle}
              bottomDivider
            />
          ))
        }
      </View>
    );
  }
}
