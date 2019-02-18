// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/Styles';
import CarouselView from '../components/CarouselView';

class InitialScreen extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>V E N N P O O L</Text>
        </View>

        <View style={styles.carousel}>
          <Text>Find people to share rides!</Text>
          <CarouselView/>
        </View>
        
        <View style={styles.containerbtn}>
          <Button 
            style={styles.btn} 
            title="Login"
            onPress={() => this.props.navigation.navigate('CreateAccount')}
          />
          <Button style={styles.btn} title="Sign-Up"/>
        </View>
      </View>
    );
  } // end of render
} // end of class


export default InitialScreen;
