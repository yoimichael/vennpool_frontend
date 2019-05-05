// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/RideDetailsStyles';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createUserOnDatabase }  from '../actions/auth_actions'

// Required: name
// Optional: picture
// Optional: carColor
// Optional: carMake
// Optional: carModel
// Optional: phone

class CreateAccountScreen extends Component{
  onLogout = async() =>{
    console.log("clicked");
    Actions.Auth();
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
      event: 'OWL Viewing Party',
      seatsAvailable: '1',
      driver: 'Martin Magsombol', //'' or user_data.name(?)
      driverPhone: '415-123-4567',
      pickUpLocation: 'Lebon Drive',
      destinationLocation: 'Gilman Drive',
      departureTime: '6:00pm',
      carColor: 'Silver',       //''
      carMake: 'Hyundai',       //''
      carModel: 'Sonata',       //''
      clicked: false
    }
  }

  render() {
    // async onSubmit(){
    //  Manage input entry validation and authentication
    //}
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.txtEvent} >{this.state.event}</Text>
          <Text style={styles.txtTitle}>Seats Available: {this.state.seatsAvailable}</Text>
        </View>

        <View>
          <Image style={styles.img} source={require('../../assets/profile.png')}/>
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

export default connect(mapStateToProps, { createUserOnDatabase })(CreateAccountScreen);
