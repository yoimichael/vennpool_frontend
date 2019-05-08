// First landing page upon opening app
import React, {Component} from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/OfferRideStyles';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {signOut,updateUserOnDatabase} from "../actions/auth_actions";

// Required: name
// Optional: picture
// Optional: carColor
// Optional: carMake
// Optional: carModel
// Optional: phone 

class OfferRideScreen extends Component{

  onSubmit(){
    console.log("CLICKED");
  }

  static navigationOptions = {
    title: 'Offer a Ride',
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
      carMake: car_info[0],       //''
      carModel: car_info[1],       //''
      carColor: car_info[2],       //''
      phone: phone,    //''
      seatsAvailable: '4',
      clicked: false
    }
    if (this.state.fb_id)
      this.state.photoSource = {uri: `https://graph.facebook.com/${this.state.fb_id}/picture?type=large`};
    else
      this.state.photoSource = require('../../assets/profile.png');
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
         
                
          <View style={styles.container}> 
            <Text style={styles.txt}>Your Info</Text>
            <Text style={styles.txtTitle}>{this.state.name}</Text>
            <Text style={styles.txt}>Silver Hyundai Sonata</Text>
            <Text style={styles.txt}>Phone #: {this.state.phone}</Text>
            <Text style={styles.txt}>Seats Available: {this.state.seatsAvailable}</Text>
            <Text style={styles.txtTitle}>Meetup Location</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.txtTitle}>Car Info</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(carMake) => this.setState({carMake})}
              keyboardType='default'
              value={this.state.carMake}
              placeholder={"Enter your Car Make (i.e. Honda)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />  
            <TextInput
              style={styles.txt}
              onChangeText={(carModel) => this.setState({carModel})}
              keyboardType='default'
              value={this.state.carModel}
              placeholder={"Enter your Car Model (i.e. Civic)"}
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
              style={styles.submitBtn} 
              onPress={this.onSignOut}>
                <Text style={styles.txtBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  } // end of render
} // end of class

// give db token from redux to the component
function mapStateToProps(state) {
  // const { db_token,user } = state;
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

export default connect(mapStateToProps, {signOut, updateUserOnDatabase })(OfferRideScreen);
