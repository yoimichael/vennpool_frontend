// First landing page upon opening app
import React, {Component} from 'react';
import {Clipboard, Alert, View, Text, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native';
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
      ...this.props,
      // destinationLocation: 'Gilman Drive',
      event_id: props.event_id,
      post_id: props.post_id,
      riders: [],
      riders_ready: false,
      clicked: false,
      joined: false
    }
    if (props.driver_fb_id)
      this.state.driver_photo = {uri: `https://graph.facebook.com/${props.driver_fb_id}/picture?type=large`};
    else
      this.state.driver_photo = require('../../assets/profile.png');
  
    console.log(`RideDetail: ${JSON.stringify(this.state)}`);
    
    // fetch riders data
    getPostDetail(this.state.db_token, this.state.post_id)
      .then((data) => {
        this.populateRidersInfo(data)
      }).catch((message) => {
        alert('Error');
        console.log(message);
      });

      this.onToggleJoin = this.onToggleJoin.bind(this);
      this.populateRidersInfo = this.populateRidersInfo.bind(this);
  }

  populateRidersInfo(data){
    var riders = []
    // populate users into a list
    data.users.forEach((user) => {
      var rider = {}
      if (this.props.user.id == user.id)
        this.setState({joined: true});
      rider.id = user.id;
      if (user.fb_id)
        rider.image = {uri: `https://graph.facebook.com/${user.fb_id}/picture?type=large`};
      else
        rider.image = require('../../assets/profile.png');
      rider.name = user.name;
      rider.phone = user.phone;
      riders.push(rider);
    });
    this.setState({riders: riders, riders_ready: true})
    console.log(`Riders updated: ${JSON.stringify(riders)}`);
  }
  
  onUserInfo(info){
    const user = JSON.parse(info);
    Alert.alert(
      user.name,
      `${user.name}'s phone number is ${user.phone}`,
      [
        {text: 'Copy Cell #', onPress: () => Clipboard.setString(user.phone)},
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
        console.log('Toggle updated!');
        this.populateRidersInfo(item)
        // UI update increment/decreament user 
        if (this.state.joined){
          this.setState({
            seatsAvailable: item.seats,
            joined:false,
          });
        }
        else{
          this.setState({
            seatsAvailable:this.state.seatsAvailable+1,
            joined:true
          });
        }   
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
            <Text style={styles.infoTxtTitle}>{this.props.event}</Text>
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
