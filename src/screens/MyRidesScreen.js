// First landing page upon opening app
import React, {Component} from 'react';
import { RefreshControl, ScrollView, View, Text, SectionList, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles/EventCardStyles';

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
      sectionListData: [{data:props.posts}],
      search: '',
    }
    
    // supporting using the variable: this 
    this.onRideDetail = this.onRideDetail.bind(this);
    this.onPostChanged = this.onPostChanged.bind(this);
  }

  onRideDetail(item){
    if (this.props.demo)
      Actions.RideDetail({demo:true});
    else{
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
      }

      // get event title from state
      var i = 0;
      while (i < this.state.sectionListData.length){
        if (this.state.sectionListData[i].id == item.event){
          postScreenData.event = this.state.sectionListData[i].title;
          postScreenData.to_addr = this.state.sectionListData[i].to_addr;
          postScreenData.event_time = this.state.sectionListData[i].start_time;
          break; 
        }
        i += 1;
      }

      // go to ride detail, passing in a callback function to update seatsAvailable 
      Actions.RideDetail({...postScreenData, callback:this.onPostChanged}); 
    }
  }

  onPostChanged(){
    // get event title from state
    var _this = this;
    getPostAndEvents(this.state.db_token, this.state.user['fb_id'],
                  this.state.user['fbtoken'],limit=10, forceSync=false)
      .then((event_data) => {
        _this.setState({sectionListData:event_data}); 
      })
      .catch((message) => {
        console.log(`error ${message}`);
      });
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

export default MyRides;
