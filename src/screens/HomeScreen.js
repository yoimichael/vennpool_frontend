// First landing page upon opening app
// Status: Still need to fix Logout button
import React, {Component} from 'react';
import { RefreshControl, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../styles/HomeScreenStyles';
import EventList from '../components/EventList';

//actions
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {getPostAndEvents}  from '../actions/home_actions'


class HomeScreen extends Component{

  constructor(props){
    super(props);

    this.state = {
      ...props,
      search: '',
      isReady: false,
      sectionData: {},
      refreshing: false,
    }
    
    // supporting using this is onRefresh function 
    this._onRefresh = this._onRefresh.bind(this)
    
    // syn when ever visiting home
    this._onRefresh(forceSync = false);
    tag: null
  }


  _onRefresh(forceSync = true){
    // sync from online
    var _this = this;
    
    // console.log(`db: ${this.state.db_token}\n fb_id:${this.state.user['fb_id']}\n fbtoken:${this.state.user['fbtoken']}`);
    getPostAndEvents(this.state.db_token, this.state.user['fb_id'], this.state.user['fbtoken'],limit=10, forceSync)
      .then((event_data) => {
        console.log(`SecitonListData: ${JSON.stringify(event_data)}\nlength:${event_data.length}`);
        console.log('\n------end events------');     
        _this.setState({sectionData:event_data,isReady:true}); 
        console.log('Event data ready:');
      })
      .catch((message) => {
        console.log(`error ${message}`);
        alert("Oops, an error occured, my bad");
      });
  }

  static navigationOptions = ({navigation}) => {
    return{
      title: 'Feed',
      headerLeft: (
        <TouchableOpacity
          style={styles.btn}
          onPress={()=>{Actions.Profile();}}>
            <Text style={styles.txtBtn}>Profile</Text>
        </TouchableOpacity>
      )
      ,
      headerRight: (
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => {Actions.MyRides();}}>
            <Text style={styles.txtBtn}>My Rides</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        height: 75,
        backgroundColor: '#D86512',
      },
      headerTintColor: 'white',
      headerTitleStyle:{
        fontSize: 30,
        fontWeight: 'bold'
      },
      gesturesEnabled: false // Check if it breaks the app
    }
  }

  
  render() {
    if (!this.state.isReady) {
      screen = <Text>Hold on</Text>;
    } else {
      screen = <EventList sectionData={this.state.sectionData} demo={false}/>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.spacer}/>
        <ScrollView  refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>}>
            {screen}      
        </ScrollView>
        <View style={styles.spacer}/>
        
      </View>
      );
  } // end of render
} // end of class

function mapStateToProps(state) {
  const { db_token,user } = state;
  // console.log(`loading state: ${state['auth']['db_token']}`);
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

// TODO:: more dispatch functions
export default connect(mapStateToProps, {})(HomeScreen);
