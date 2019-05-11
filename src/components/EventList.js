import React,  { Component } from 'react';
import { ScrollView, RefreshControl, View, Text, SectionList, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles/EventCardStyles';
import {sectionListData} from '../data/sectionListData';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Actions } from 'react-native-router-flux';


class SectionHeader extends Component {

  constructor(props){
    super(props);

    console.log(`setting up header: ${JSON.stringify(this.props.section)}`);
    this.onOfferRide = this.onOfferRide.bind(this);
  }

  onOfferRide = () => {
    console.log("on test trigered");
    const postScreenData = {
      event:this.props.section.title,
      name: this.props.section.creator.name,
      car_info: this.props.section.creator.car_info,
      event_id: this.props.section.id,
      seats: this.props.section.seats,
      time_pickup: this.props.section.time,
    }
    Actions.OfferRide({post_data: postScreenData}); 
  }

  render() {
    return (
      <View style={styles.header}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>{this.props.section.title}</Text>
          </View>
          <View style={styles.headerShare}>
            <TouchableOpacity 
              style={styles.shareBtn} 
              onPress={this.onOfferRide}>
                <Text style={styles.btnTxt}>Share</Text>
            </TouchableOpacity>
            <Text style={styles.linkTxt}>{this.props.section.share}</Text>
          </View>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.offerBtn} 
              onPress={this.onOfferRide}>
                <Text style={styles.btnTxt}>Offer A Ride</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

class EventList extends Component{
  // Shows the SectionList component item click value using Alert
  GetSectionListItem = item => {
    return(Alert.alert(item));
  };
  constructor(props){
    super(props);
    // prepopulate demo data
    this.state = {
      sectionListData:sectionListData,
    }
    // if not a demo import it to section
    if (!props.demo)
      this.state.sectionListData = props.sectionData;        
    console.log(`EventList received: ${JSON.stringify(props)}`);
    
    // pass this to ride detail
    this.onRideDetail = this.onRideDetail.bind(this);
  }

  onRideDetail(item){
    item = JSON.parse(item);
    const postScreenData = {
      event: this.props.sectionData.title,
      driver: item.creator.name,
      driver_fb_id: item.creator.fb_id,
      pickupLocation: item.from_addr,
      driver_phone: item.creator.phone,
      car_info: item.creator.car_info,
      post_id: item.id,
      event_id: this.props.sectionData.id,
      seatsAvailable: item.seats,
      time_pickup: item.time,
    }
    Actions.RideDetail(postScreenData); 
  }

  render() {
    return (
      // <ScrollView style={styles.container} refreshControl={
      //     <RefreshControl
      //       refreshing={this.state.refreshing}
      //       onRefresh={this._onRefresh}
      //     />}>
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
                      Pickup Location: {item.from_addr}
                    </Text>
                    <Text style={styles.subCardTxt}>
                      Departure Time: {item.time}
                    </Text>
                  </View>
                </View>
            </TouchableOpacity>
          }
          renderSectionHeader={ ({section}) => {
            return(<SectionHeader section={section}/>);
          }}
          sections={this.state.sectionListData}
          keyExtractor={(item, index) => item.id}>
        </SectionList>
      // </ScrollView> 
    );
  }
}

export default EventList;