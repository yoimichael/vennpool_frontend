// First landing page upon opening app
import React, {Component} from 'react';
import {Linking, Alert, View, Text, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
import styles from '../styles/RideDetailStyles';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getPostDetail,join_quit_Ride}  from '../actions/home_actions'


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
      ...props,
      // 2019-10-14T06:00:00Z
      // destinationLocation: 'Gilman Drive',
      event_id: props.event_id,
      post_id: props.post_id,
      riders: [],
      riders_ready: false,
      clicked: false,
    }

    if (props.driver_fb_id)
      this.state.driver_photo = {uri: `https://graph.facebook.com/${props.driver_fb_id}/picture?type=large`};
    else
      this.state.driver_photo = require('../../assets/profile.png');
  
    // fetch riders data
    getPostDetail(this.state.db_token, this.state.post_id)
      .then((data) => {
        this.populatePostInfo(data)
      }).catch((message) => {
        alert('Error');
        console.log(message);
    });
    
    // bind this
    this.onToggleJoin = this.onToggleJoin.bind(this);
    this.populatePostInfo = this.populatePostInfo.bind(this);
  }

  populatePostInfo(data){
    var riders = []
    // populate users into a list
    data.users.forEach((user) => {
      var rider = {}
      rider.id = user.id;
      rider.name = user.name;
      rider.phone = user.phone;
      if (user.fb_id)
        rider.image = {uri: `https://graph.facebook.com/${user.fb_id}/picture?type=large`};
      else
        rider.image = require('../../assets/profile.png');

      riders.push(rider);
    });
    this.setState({riders: riders, riders_ready: true, seatsAvailable: data.seats})
    console.log(`Riders updated: ${JSON.stringify(riders)}`);
  }
  
  onUserInfo(info){
    // click on user info and copy phone number
    const user = JSON.parse(info);
    Alert.alert(
      'Contact',
      `${user.name}'s phone number is ${user.phone}`,
      [
        {text: 'Call', onPress: () => Linking.openURL(`tel:${user.phone}`)},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        }
      ],
      {cancelable: false},
    );
  }

  onToggleJoin(){ 

    // database update
    join_quit_Ride(this.state.db_token, this.state.post_id, this.state.event_id, this.state.user.id)
      .then((item) => {
        // update UI
        this.populatePostInfo(item);
        // update EventList
        this.props.callback(item);

        console.log(`Post info updated: ${JSON.stringify(item)}`);
      })
      .catch((message) => {
          console.log(message);
          alert("Error");
      });
  }

  render() {
    // async onSubmit(){
    //  Manage input entry validation and authentication
    //}
    return (
      <View style={styles.container}>
          <View style={styles.eventContainer}> 
            <Text style={styles.infoTxtTitle}>{this.props.title}</Text>
            <Text style={styles.infoTxtTitle}>Address: {this.props.to_addr}</Text>
            <Text style={styles.infoTxtTitle}>Time: {this.props.start_time}</Text>

            <View style={styles.rowContainer}>
              <Text style={styles.txtTitle}>Seats Available:</Text>
              <Text style={styles.txt}>{this.state.seatsAvailable}</Text>
            </View>
            <TouchableOpacity 
              style={styles.btn} 
              onPress={this.onToggleJoin}>
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
              <Text style={styles.txt}>{this.state.time_pickup}</Text>
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
                contentContainerStyle={styles.flatList}
                horizontal={true}
                data={this.state.riders}
                renderItem={({item}) => 
                <TouchableWithoutFeedback onPress={ () => this.onUserInfo(JSON.stringify(item))}>
                    <View style={styles.colContainer}>
                    <Image style={styles.img} source={item.image}/>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                  </View>
                </TouchableWithoutFeedback>

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
