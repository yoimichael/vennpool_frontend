import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './src/styles/styles.js'  // imports 'styles' variable from ./styles.js

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Venn Pool!</Text>
      </View>
    );
  }
}
