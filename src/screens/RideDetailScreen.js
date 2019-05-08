// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/RideDetailStyles';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createUserOnDatabase }  from '../actions/auth_actions'

// Required: name
// Optional: picture
// Optional: carColor
// Optional: carMake
// Optional: carModel
// Optional: phone

class RideDetailScreen extends Component{
  onLogout = async() =>{
    console.log("clicked");
    Actions.Welcome();
  }

  static navigationOptions = {
    title: 'Ride Details',
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
    this.state = {      
      ...this.props.user,
      event: 'OWL Viewing Party',
      seatsAvailable: '1',
      driver: 'Martin Magsombol', //'' or user_data.name(?)
      driverPhone: '415-123-4567',
      pickupLocation: 'Lebon Drive',
      destinationLocation: 'Gilman Drive',
      departureTime: '6:00pm',
      carColor: 'Silver',       //''
      carMake: 'Hyundai',       //''
      carModel: 'Sonata',       //''
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

          <View style={styles.eventContainer}> 
            <Text style={styles.infoTxtTitle}>{this.state.event}</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Seats Available:</Text>
              <Text style={styles.txt}>{this.state.seatsAvailable}</Text>
            </View>
            <TouchableOpacity 
              style={styles.btn} 
              onPress={this.onUpdateProfile}>
                <Text style={styles.txt}>Join/Leave</Text>
            </TouchableOpacity>          
          </View>

          <View style={styles.driverContainer}> 
            <Image style={styles.img} source={this.state.photoSource}/>
            <View style={styles.rowContainer}>
              <Text style={styles.driverTxtTitle}>Driver:</Text>
              <Text style={styles.driverTxt}>{this.state.driver}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.driverTxtTitle}>Phone:</Text>
              <Text style={styles.driverTxt}>{this.state.driverPhone}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Pickup Location:</Text>
              <Text style={styles.txt}>{this.state.meetupLocation}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Destination Location:</Text>
              <Text style={styles.txt}>{this.state.destinationLocation}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Departure Time:</Text>
              <Text style={styles.txt}>{this.state.departureTime}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Car Info:</Text>
              <Text style={styles.txt}>{this.state.carColor} | {this.state.carMake} | {this.state.carModel}</Text>
            </View>
          </View>

      <View style={styles.colContainer}>
          <View>
            <Text style={styles.infoTxtTitle}>Others in the Ride</Text>
          </View>

          <View style={styles.rideContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.colContainer}>
              <Image style={styles.img} source={this.state.photoSource}/>
              <Text style={styles.nameTxt}>Yang Liu</Text>
            </View>
            <View style={styles.colContainer}>
              <Image style={styles.img} source={this.state.photoSource}/>
              <Text style={styles.nameTxt}>Gabriel Ruiz</Text>
            </View>
            <View style={styles.colContainer}>
              <Image style={styles.img} source={this.state.photoSource}/>
              <Text style={styles.nameTxt}>Kimo Silva</Text>
            </View>
          </View>
          </View>
        </View>

      </View>
    );
  } // end of render
} // end of class

// give db token from redux to the component
function mapStateToProps(state) {
  const { db_token,user } = state;
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

export default connect(mapStateToProps, { createUserOnDatabase })(RideDetailScreen);
