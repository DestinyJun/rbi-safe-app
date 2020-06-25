import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {IconScreen} from "./app/views/IconScreen";

const instructions = Platform.select({
  ios: `这里是iOS看到的文字`,
  android: `这里是Android看到的文字`,
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>欢迎您，开发者！</Text>
      <Text style={styles.instructions}>{instructions}</Text>
      <View>
        <IconScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
