// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/RideDetailStyles';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getPostDetail }  from '../actions/home_actions'

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
      ...this.props,
      // destinationLocation: 'Gilman Drive',
      event_id: props.event_id,
      post_id: props.post_id,
      riders: [],
      riders_ready: false,
      clicked: false
    }
    if (props.driver_fb_id)
      this.state.driver_photo = {uri: `https://graph.facebook.com/${props.driver_fb_id}/picture?type=large`};
    else
      this.state.driver_photo = require('../../assets/profile.png');

    var _this = this;
    // fetch riders data
    getPostDetail(this.state.db_token, this.state.post_id)
      .then((data) => {
        console.log(`Got gepu post data: ${JSON.stringify(data)}`);
        var riders = []
        // populate users into a list
        data.users.forEach((user) => {
          var rider = {}
          rider.id = user.id;
          if (user.fb_id)
            rider.image = {uri: `https://graph.facebook.com/${user.fb_id}/picture?type=large`};
          else
            rider.image = require('../../assets/profile.png');
          rider.name = user.name;
          riders.push(rider);
        });
        _this.setState({..._this.state, riders, riders_ready: true})
        console.log(`Riders updated: ${JSON.stringify(riders)}`);
        
      }).catch((message) => {
        alert('Error');
        console.log(message);
      });

  }

  render() {
    // async onSubmit(){
    //  Manage input entry validation and authentication
    //}
    return (
      <View style={styles.container}>

          <View style={styles.eventContainer}> 
            <Text style={styles.infoTxtTitle}>{this.props.event}</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Seats Available:</Text>
              <Text style={styles.txt}>{this.props.seatsAvailable}</Text>
            </View>
            <TouchableOpacity 
              style={styles.btn} 
              onPress={this.onUpdateProfile}>
                <Text style={styles.txt}>Join/Leave</Text>
            </TouchableOpacity>          
          </View>

          <View style={styles.driverContainer}> 
            <Image style={styles.img} source={this.state.driver_photo}/>
            <View style={styles.rowContainer}>
              <Text style={styles.driverTxtTitle}>Driver:</Text>
              <Text style={styles.driverTxt}>{this.props.driver}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.driverTxtTitle}>Phone:</Text>
              <Text style={styles.driverTxt}>{this.props.driver_phone}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Pickup Location:</Text>
              <Text style={styles.txt}>{this.props.pickupLocation}</Text>
            </View>
            {/* <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Destination Location:</Text>
              <Text style={styles.txt}>{this.state.destinationLocation}</Text>
            </View> */}
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Departure Time:</Text>
              <Text style={styles.txt}>{this.props.time_pickup}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Car Info:</Text>
              <Text style={styles.txt}>{this.props.car_info}</Text>
            </View>
          </View>

      <View style={styles.colContainer}>
          <View>
            <Text style={styles.infoTxtTitle}>Others in the Ride</Text>
          </View>
          <View style={styles.rideContainer}>
          <View style={styles.rowContainer}>
          {this.state.riders_ready &&
            <FlatList
                contentContainerStyle={styles.rowContainer}
                horizontal={true}
                data={this.state.riders}
                renderItem={({item}) => 
                  <View style={styles.colContainer}>
                    <Image style={styles.img} source={item.image}/>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                  </View>
                }

                ItemSeparatorComponent={() => {
                    return (
                        <View
                            style={{
                            height: "100%",
                            width: 20,
                            backgroundColor: "#CED0CE",

                            }}
                        />
                    );
                }}

                keyExtractor={(item, index) => item.id.toString()}
            />
          }
                      {/* <View style={styles.colContainer}>
              <Image style={styles.img} source={this.state.driver_photo}/>
              <Text style={styles.nameTxt}>Yang Liu</Text>
            </View>
            <View style={styles.colContainer}>
              <Image style={styles.img} source={this.state.driver_photo}/>
              <Text style={styles.nameTxt}>Gabriel Ruiz</Text>
            </View>
            <View style={styles.colContainer}>
              <Image style={styles.img} source={this.state.driver_photo}/>
              <Text style={styles.nameTxt}>Kimo Silva</Text>
            </View> */}
          </View>
          </View>
        </View>

      </View>
    );
  } // end of render
} // end of class

// give db token from redux to the component
function mapStateToProps(state) {
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

export default connect(mapStateToProps, { })(RideDetailScreen);
