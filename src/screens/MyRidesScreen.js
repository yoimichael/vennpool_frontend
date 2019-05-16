// First landing page upon opening app
import React, {Component} from 'react';
import { ScrollView, View, Text, SectionList, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles/EventCardStyles';
import {getPostAndEvents}  from '../actions/home_actions'
import {connect} from 'react-redux';

import { Actions } from 'react-native-router-flux';


class MyRides extends Component{

  static navigationOptions = {
    title: 'My Rides',
    headerStyle: {
      height: 75,
      backgroundColor: '#FAEBD7',
    },
    headerTintColor: 'black',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  };

  // Shows the SectionList component item click value using Alert
  GetSectionListItem = item => {
    return(Alert.alert(item));
  };
  constructor(props){
    super(props);

    this.state = {
      ...props.user,
      db_token: props.db_token,
      sectionListData: [{data:props.posts}],
      search: '',
    }
    
    // supporting using the variable: this 
    this.onRideDetail = this.onRideDetail.bind(this);
    this.onPostChanged = this.onPostChanged.bind(this);
  }

  onRideDetail(item){
    // console.log(JSON.stringify(this.state));
    item = JSON.parse(item);
    
    // compose data needed in RideDetailScreen
    const postScreenData = {
      driver: item.creator.name,
      driver_fb_id: item.creator.fb_id,
      pickupLocation: item.from_addr,
      driver_phone: item.creator.phone,
      car_info: item.creator.car_info,
      post_id: item.id,
      event_id: item.event,
      seatsAvailable: item.seats,
      time_pickup: item.time.split('T')[1].substring(0,5),

      title: item.title,
      to_addr: item.to_addr,
      start_time: item.start_time
    }

    // go to ride detail, passing in a callback function to update seatsAvailable 
    Actions.RideDetail({...postScreenData, callback:this.onPostChanged}); 
  
  }

  onPostChanged(newPost){
    // get event title from state
    var new_sectionListData = this.state.sectionListData;
    var i = 0;
    while(i < new_sectionListData[0].data.length){
      const cur_post = new_sectionListData[0].data[i];
      console.log(cur_post);
      
      if (cur_post.id == newPost.id){
        // persist event information
        newPost.title = cur_post.title;
        newPost.to_addr = cur_post.to_addr;
        newPost.start_time = cur_post.start_time;
        new_sectionListData[0].data[i] = newPost;
        break;
      }
      i += 1
    }
    this.setState({sectionListData:new_sectionListData}); 

  }


  render() {
    return (
        <ScrollView>
          <SectionList
            renderItem={( {item} ) =>
              <TouchableOpacity onPress={()=>{
                this.onRideDetail(JSON.stringify(item))
                }}>
                  <View style={styles.itemContainer}>
                    <View style={styles.rideCardContainer}>
                      <Text style={styles.subCardHeader}>
                        Driver: {item.creator.name}
                      </Text>
                      <Text style={styles.subCardHeader}>
                        Seats Available: {item.seats}
                      </Text>
                      <Text style={styles.subCardTxt}>
                        Pickup Location: {item.from_addr.replace('(undefined)', '')}
                      </Text>
                      <Text style={styles.subCardTxt}>
                        Departure Time: {item.time.split('T')[1].substring(0,5)}
                      </Text>
                    </View>
                  </View>
              </TouchableOpacity>
            }
            sections={this.state.sectionListData}
            keyExtractor={(item, index) => item.id}>
          </SectionList>
        </ScrollView> 
      
    );
  }
}

function mapStateToProps(state) {
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}
export default connect(mapStateToProps, {})(MyRides);
