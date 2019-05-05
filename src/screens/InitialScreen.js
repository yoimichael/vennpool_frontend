// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, Animated, Keyboard, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, ThemeProvider } from 'react-native-elements';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }from '../styles/InitialStyles';
import CarouselView from '../components/CarouselView';

//router
import {Actions} from 'react-native-router-flux'
//redux
import {connect} from 'react-redux';
//actions
import {signInOnDatabase,signInWithFacebook} from '../actions/auth_actions'
import { ACTION_HARD_KEYBOARD_SETTINGS } from 'expo/build/IntentLauncherAndroid/IntentLauncherAndroid';

class InitialScreen extends Component{
  onSignInWithFacebook = async () => {
    // sign user in on fb
    const {type, token, data} = await signInWithFacebook();

    // sign user in on gepu
    this.props.signInOnDatabase(token, data).then(({exist, db_token}) => {
        // when a resolve is issued
        console.log(`signInOnDatabase success, exist: ${exist}, db_token: ${db_token}`);        
        if (exist)
          Actions.Home();
        else
          Actions.CreateAccount();
    }).catch((error) => {
          // when a reject is issued
// Actions.Home(); //TODO :Temporary (delete later when yang fixes login issue)
          alert('sign in on database error');
          console.log(error);
          
      });
  }

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
            onPress={this.onSignInWithFacebook}>
              <Text style={styles.txtBtn}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } // end of render
} // end of class


export default connect(null, {signInOnDatabase})(InitialScreen);
