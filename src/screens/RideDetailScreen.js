// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, Animated, Keyboard, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import styles from '../styles/InitialStyles';


class RideDetail extends Component{
  static navigationOptions = {
    title: 'Ride Details',//({ state }) => `${state.params.name()}`,
    headerStyle: {
      height: 75,
      backgroundColor: '#FAEBD7',
    },
    headerTintColor: 'black',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  };

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>HI</Text>
      </View>
    );
  } // end of render
} // end of class


export default RideDetail;
