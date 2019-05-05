// First landing page upon opening app
import React, {Component} from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/ProfileStyles.js';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {signOut} from "../actions/auth_actions";

// Required: name
// Optional: picture
// Optional: carColor
// Optional: carMake
// Optional: carModel
// Optional: phone 

class ProfileScreen extends Component{

  onSignOutSuccess(){
    console.log("log out success");
    Actions.reset("Auth");
  }
  onSignOutError(message){
      console.log(`log out error: ${message}`);
      Alert.alert('Log out error.');
  }
  onSignOut = () => {
      console.log("Trying to log out.")
      this.props.signOut(
          this.props.db_token,
          this.props.user['fb_id'],
          this.onSignOutSuccess,
          this.onSignOutError
      );
  }

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      height: 75,
      backgroundColor: '#D86512',
    },
    headerTintColor: 'white',
    headerTitleStyle:{
      fontSize: 20,
      fontWeight: 'bold'
    }
  };

  constructor(props){
    super(props);
    // name: this.props.user['name'], //'' or user_data.name(?)
    const car_info = this.props.user.car_info.split('|');
    
    const phone = (this.props.user.phone != null) ? this.props.user.phone : "";

    this.state = {
      ...this.props.user,
      carColor: car_info[2],       //''
      carMake: car_info[0],       //''
      carModel: car_info[1],       //''
      phone: phone,    //''
      clicked: false
    }
    if (this.state.fb_id)
      this.state.photoSource = {uri: `https://graph.facebook.com/${this.state.fb_id}/picture?type=large`};
    else
      this.state.photoSource = require('../../assets/profile.png');
  }

  render() {
    // async onSubmit(){
    //  Manage input entry validation and authentication
    //}
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Image style={styles.img} source={this.state.photoSource}/>
          </View>
                
          <View style={styles.container}> 
            <Text style={styles.txtTitle}>Profile Info</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(name) => this.setState({name})}
              keyboardType='default'
              value={this.state.name}
              placeholder={"First Name Last Name"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
            <Text style={styles.txtExtra}>(Only shared to people in the same ride)</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(phone) => this.setState({phone})}
              keyboardType={"number-pad"}
              value={this.state.phone}
              placeholder={"Enter your Phone Number"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />        
          </View>

          <View style={styles.container}>
            <Text style={styles.txtTitle}>Car Info</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(carModel) => this.setState({carModel})}
              keyboardType='default'
              value={this.state.carModel}
              placeholder={"Enter your Car Model (i.e. Honda)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />   
            <TextInput
              style={styles.txt}
              onChangeText={(carMake) => this.setState({carMake})}
              keyboardType='default'
              value={this.state.carMake}
              placeholder={"Enter your Car Make (i.e. Civic)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />             
            <TextInput
              style={styles.txt}
              onChangeText={(carColor) => this.setState({carColor})}
              keyboardType='default'
              value={this.state.carColor}
              placeholder={"Enter your Car Color (i.e. Silver)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />   
          </View>

          <View style={styles.container}>
            <TouchableOpacity 
              style={styles.signoutBtn} 
              onPress={this.onSignOut}>
                <Text style={styles.txtBtn}>Logout</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  } // end of render
} // end of class

// give db token from redux to the component
function mapStateToProps(state) {
  const { db_token,user } = state;
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

export default connect(mapStateToProps, {signOut, })(ProfileScreen);
