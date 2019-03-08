// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, Animated, Keyboard, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, ThemeProvider } from 'react-native-elements';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }from '../styles/InitialStyles';
import CarouselView from '../components/CarouselView';

class InitialScreen extends Component{
  static navigationOptions = {
    headerStyle: {
      height: 0,
      backgroundColor: '#FAEBD7',
    }
  };

  constructor(props){
    super(props);
  }

  render() {
    return (
    <View style={styles.container}>
        <View style={styles.carousel}>
          <CarouselView/>
        </View>
        
        <View style={styles.container}>
          <View style={styles.spacer}></View>
          <Text>Please Login with Facebook</Text>
          <TouchableOpacity 
            style={styles.btn} 
            onPress={() => this.props.navigation.navigate('CreateAccount')}>
              <Text style={styles.txtBtn}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } // end of render
} // end of class


export default InitialScreen;
