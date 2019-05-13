// First landing page upon opening app
import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, DatePickerIOS  } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/OfferRideStyles';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {postRides} from "../actions/home_actions";

// Required: name
// Optional: picture
// Optional: carMake
// Optional: carModel
// Optional: carColor
// Optional: phone 

class OfferRideScreen extends Component{

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
    // const car_info = this.props.user.car_info.split('|');
    const phone = (this.props.user.phone != null) ? this.props.user.phone : "";    
    if (props.time_return!=null){
      var ret_time = new Date(props.time_return.substring(0,19));
      ret_time.setMinutes( ret_time.getMinutes() + ret_time.getTimezoneOffset());
      console.log(`return time ${ret_time}`);
    }
    else
      ret_time = new Date();
    
    this.state = {
      ...this.props,
      location_pickup: '',
      time_pickup: new Date(Date.now()), // initializes to current time
      time_return: ret_time,
      event: props.event,
      phone: phone,    //''
      seatsAvailable: '4',
      clicked: true,
    }

    if (this.state.fb_id)
      this.state.photoSource = {uri: `https://graph.facebook.com/${this.state.fb_id}/picture?type=large`};
    else
      this.state.photoSource = require('../../assets/profile.png');

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = () => {    
    var posts = {
      eid: this.state.event_id,
      uid: this.state.user.id,
    };
    const post_going = {
      from_addr: this.state.location_pickup,
      seats: this.state.seatsAvailable,
      time: this.state.time_pickup
    };
    posts.post1 = post_going;
    if (this.state.clicked){
      posts.post2 = {
        from_addr: this.state.return_addr,
        seats: this.state.seatsAvailable,
        time: this.state.time_return
      }
    }
    console.log(`sending posts ${JSON.stringify(posts)}`);
    
    // send request to database
    postRides(this.state.db_token,posts)
      .then((response)=>{
        Actions.reset('Home');    
      })
      .catch((message) => {
        alert("error");
      })
  }
  

  toggleCheckbox =() => {
    this.setState({clicked: !this.state.clicked});
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          
          <View style={styles.yourinfoContainer}> 
            <Text style={styles.infoTxtTitle}>{this.props.event}</Text>
          </View>

          <View style={styles.yourinfoContainer}> 
            <Text style={styles.infoTxt}>Your Info</Text>
            <Text style={styles.infoTxtTitle}>{this.state.user.name}</Text>
            <Text style={styles.infoTxt}>{this.state.user.car_info}</Text>
            <Text style={styles.infoTxt}>Phone #: {this.state.phone}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.txtTitle}>Pickup Location</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(location) => this.setState({location_pickup:location})}
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
              onDateChange={(newTime) => this.setState({time_pickup: newTime})}
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
              onChangeText={(location) => this.setState({return_addr:location})}
              keyboardType='default'
              value={this.state.return_addr}
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
              onDateChange={(newTime) => this.setState({time_return: newTime})}
              mode='time'
              minuteInterval={5}
            />
          </View>
          }

          <View>
            <TouchableOpacity 
              style={styles.submitBtn} 
              onPress={this.onSubmit}>
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

export default connect(mapStateToProps, { })(OfferRideScreen);
