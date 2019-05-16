import React,  { Component } from 'react';
import { RefreshControl, ScrollView, View, Text, SectionList, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles/EventCardStyles';
import {sectionListData} from '../data/sectionListData';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getPostAndEvents}  from '../actions/home_actions';
import { CheckBox } from 'react-native-elements';


class SectionHeader extends Component {
  
  constructor(props){
    super(props);
    console.log(`setting up header: ${JSON.stringify(this.props.section)}`);
    this.onOfferRide = this.onOfferRide.bind(this);

    this.state = {};    
    // Formatting Date and Time
    var date_time = this.props.section.start_time.split('T');
    this.state.date = date_time[0];
    this.state.time = date_time[1].substring(0,5);
    
    this.state.clicked = false;
    this.state.toggleCheckbox = this.toggleCheckbox.bind(this);

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

  toggleCheckbox =() => {
    this.setState({clicked: !this.state.clicked});
    console.log(this.state.clicked);
  }
  
  render() {
    return (
      <View style={styles.header}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>{this.props.section.title}</Text>
            <Text style={styles.detailHeaderTxt}>Address: {this.props.section.to_addr}</Text> 
            <Text style={styles.detailHeaderTxt}>Date: {this.state.date}</Text>
            <Text style={styles.detailHeaderTxt}>Time: {this.state.time}</Text>
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
    this.state.clicked = true;

    // supporting using the variable: this 
    this._onRefresh = this._onRefresh.bind(this)
    this.onRideDetail = this.onRideDetail.bind(this);
    this.onPostChanged = this.onPostChanged.bind(this);

    // prepopulate demo data else sync
    if (props.demo)
      this.state = {sectionListData:sectionListData}
    else
      this._onRefresh(forceSync = false);

      this.state.clicked = false;
      this.state.toggleCheckbox = this.toggleCheckbox.bind(this);
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
          postScreenData.title = this.state.sectionListData[i].title;
          postScreenData.to_addr = this.state.sectionListData[i].to_addr;
          postScreenData.start_time = this.state.sectionListData[i].start_time;
          break; 
        }
        i += 1;
      }

      // go to ride detail, passing in a callback function to update seatsAvailable 
      Actions.RideDetail({...postScreenData, callback:this.onPostChanged}); 
    }
  }

  onPostChanged(unUsedParam){
    // get event title from state
    var _this = this;
    getPostAndEvents(this.state.db_token, this.state.user['fb_id'],
                  this.state.user['fbtoken'],limit=10, forceSync=false)
      .then((event_data) => {
        _this.setState({sectionListData:event_data,isReady:true}); 
      })
      .catch((message) => {
        console.log(`error ${message}`);
      });
  }
  toggleCheckbox =() => {
    this.setState({clicked: !this.state.clicked});
    console.log(this.state.clicked);
  }
  render() {
    return (
      
      
      (this.state.isReady) &&
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}/>}>
            <View style={styles.rowContainer}>
              <Text style={styles.subCardTxt}>Show/Hide All Rides</Text> 
              <CheckBox
                checked={this.state.clicked}
                onPress={this.toggleCheckbox}
                checkedColor='orange'
                uncheckedColor='orange'
              />
              </View>
          <SectionList onPress={this.state.clicked}
            renderItem={( {item} ) =>
              <TouchableOpacity onPress={()=>{
                this.onRideDetail(JSON.stringify(item))
                }}>
                {this.state.clicked &&
                  <View>
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
                  </View>}
                  
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
