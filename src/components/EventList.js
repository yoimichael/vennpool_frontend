import React,  { Component } from 'react';
import { RefreshControl, ScrollView, View, Text, SectionList, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles/EventCardStyles';
import {sectionListData} from '../data/sectionListData';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getPostAndEvents}  from '../actions/home_actions'

class SectionHeader extends Component {

  constructor(props){
    super(props);
    console.log(`setting up header: ${JSON.stringify(this.props.section)}`);
    this.onOfferRide = this.onOfferRide.bind(this);
  }

  onOfferRide = () => {
    const postScreenData = {
      event: this.props.section.title,
      event_id: this.props.section.id,
      time_return: this.props.section.end_time,
      return_addr: this.props.section.to_addr,
    }
    console.log(`Offer a ride with ${JSON.stringify(this.props.section)}`);
    Actions.OfferRide(postScreenData); 
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

    this.state = {
      ...props,
      search: '',
      isReady: false,
      refreshing: false,
    }
    
    // supporting using the variable: this 
    this._onRefresh = this._onRefresh.bind(this)
    this.onRideDetail = this.onRideDetail.bind(this);
    this.onPostChanged = this.onPostChanged.bind(this);

    // prepopulate demo data else sync
    if (props.demo)
      this.state = {sectionListData:sectionListData}
    else
      this._onRefresh(forceSync = false);
  }

  _onRefresh(forceSync = true){
    // forceSync means syncing not from cache

    var _this = this;
    getPostAndEvents(this.state.db_token, this.state.user['fb_id'],
                  this.state.user['fbtoken'],limit=10, forceSync)
      .then((event_data) => {
        console.log(`SectionListData length:${event_data.length}: ${JSON.stringify(event_data)}`);
        console.log('\n------end events------');     
        _this.setState({sectionListData:event_data,isReady:true}); 
        console.log('Event data ready:');
      })
      .catch((message) => {
        console.log(`error ${message}`);
        alert("Oops, an error occured, my bad");
      });
  }

  onRideDetail(item){
    if (this.props.demo)
      Actions.RideDetail({demo:true});
    else{
      console.log(JSON.stringify(this.state));
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
        time_pickup: item.time,
      }

      // get event title from state
      var i = 0;
      while (i < this.state.sectionListData.length){
        if (this.state.sectionListData[i].id == item.event){
          postScreenData.event = this.state.sectionListData[i].title;
          break; 
        }
        i += 1;
      }

      // go to ride detail, passing in a callback function to update seatsAvailable 
      Actions.RideDetail({...postScreenData, callback:this.onPostChanged}); 
    }
  }

  onPostChanged(newPost){
    // get event title from state
    var i = 0;
    var newSectionListData = {...this.state.sectionListData};
    while (i < newSectionListData.length){
      if (newSectionListData[i].id == newPost.event){
        var ii = 0;
        while (i < newSectionListData[i].data.length){
          if (newSectionListData[i].data[ii].id == newPost.id){
            newSectionListData[i].data[ii] = newPost;
            break
          }
          ii += 1;
        }
        break; 
      }
      i += 1;
    }
    this.setState({sectionListData: newSectionListData});
  }


  render() {
    return (
      (this.state.isReady) &&
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}/>}>
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
        </ScrollView> 
      
    );
  }
}

function mapStateToProps(state) {
  const { db_token,user } = state;
  // console.log(`loading state: ${state['auth']['db_token']}`);
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

// TODO:: more dispatch functions
export default connect(mapStateToProps, {})(EventList);
