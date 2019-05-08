// First landing page upon opening app
import React, {Component} from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated, DatePickerIOS  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, CheckBox, ThemeProvider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/OfferRideStyles';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {signOut,updateUserOnDatabase} from "../actions/auth_actions";

// Required: name
// Optional: picture
// Optional: carMake
// Optional: carModel
// Optional: carColor
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
      location_pickup: '',
      location_return: '',
      time_pickup: new Date(Date.now()), // initializes to current time
      time_return: new Date(Date.now()),
      event: 'EVENT TITLE',
      carMake: car_info[0],       //''
      carModel: car_info[1],       //''
      carColor: car_info[2],       //''
      phone: phone,    //''
      seatsAvailable: '4',
      clicked: true,
    }
    this.setDate = this.setDate.bind(this);

    if (this.state.fb_id)
      this.state.photoSource = {uri: `https://graph.facebook.com/${this.state.fb_id}/picture?type=large`};
    else
      this.state.photoSource = require('../../assets/profile.png');
  }

  toggleCheckbox =() => {
    this.setState({clicked: !this.state.clicked});
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          
          <View style={styles.yourinfoContainer}> 
            <Text style={styles.infoTxtTitle}>{this.state.event}</Text>
          </View>

          <View style={styles.yourinfoContainer}> 
            <Text style={styles.infoTxt}>Your Info</Text>
            <Text style={styles.infoTxtTitle}>{this.state.name}</Text>
            <Text style={styles.infoTxt}>Silver Hyundai Sonata</Text>
            <Text style={styles.infoTxt}>Phone #: {this.state.phone}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.txtTitle}>Pickup Location</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(location) => this.setState({location_pickup})}
              keyboardType='default'
              value={this.state.location_pickup}
              placeholder={"e.g. Gilman Drive"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.txtTitle}>Departure Time</Text>
            <DatePickerIOS
              date={this.state.time_pickup}
              onDateChange={this.setDate}
              mode='time'
              minuteInterval={5}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.txtTitle}>Initial Available Seats:</Text>
            <TextInput
              style={styles.txtInputSeats}
              onChangeText={(seatsAvailable) => this.setState({seatsAvailable})}
              keyboardType='numeric'
              value={this.state.seatsAvailable}
              borderBottomColor='gray'
              borderBottomWidth={1}
              clearTextOnFocus={true}
              maxLength={2}
            />  
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.txtTitle}>Willing to drive back?</Text>
            <CheckBox
              checked={this.state.clicked}
              onPress={this.toggleCheckbox}
              checkedColor='orange'
              uncheckedColor='red'
            />
          </View>

          {this.state.clicked && // hides these two components if checkbox unclicked
          <View style={styles.locationContainer}>
            <Text style={styles.txtTitle}>Return Pickup Location</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(location) => this.setState({location_return})}
              keyboardType='default'
              value={this.state.location_return}
              placeholder={"back at the car"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>}
          {this.state.clicked &&
          <View style={styles.timeContainer}>
            <Text style={styles.txtTitle}>Return Time</Text>
            <DatePickerIOS
              date={this.state.time_return}
              onDateChange={this.setDate}
              mode='time'
              minuteInterval={5}
            />
          </View>
          }

          <View>
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
