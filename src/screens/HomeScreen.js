// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/HomeScreenStyles';
import EventCard from '../components/EventCard';

class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Rideshare Feed',
    headerStyle: {
      height: 75,
      backgroundColor: '#009ECE',
    },
    headerTintColor: 'white',
    headerTitleStyle:{
      fontWeight: 'bold'
    },
    headerLeft: null,
    gesturesEnabled: false // Check if it breaks the app
  };

  render() {
    return (
      <View style={styles.container}>
        <EventCard/>
      </View>
    );
  } // end of render
} // end of class



export default HomeScreen;
