// First landing page upon opening app
// Status: Still need to fix Logout button
import React, {Component} from 'react';
import { StyleSheet, Alert, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/HomeScreenStyles';
import EventList from '../components/EventList';
import CarouselView from '../components/CarouselView';
import TodoApp from '../TodoApp';

//actions
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {getPostAndEvents}  from '../actions/home_actions'


class HomeScreen extends Component{

  // re-format data from backend to fit the SectionList
  processDataFromDB(data){
    return data;
  }

  constructor(props){
    super(props);
    
    // getPostAndEvents(this.props.db_token, this.props.user['fb_id'], this.props.user['fbtoken'],limit=2)
    //   .then((data) => {
    //     this.state.sectionData = data
    //     this.state.isReady = true;
    //     // send response to database
    //   })
    //   .catch((message) => {
    //     console.log(`error ${message}`);
    //     alert("Oops, an error occured, my bad");
    //   });

    this.state = {
      search: '',
      isReady: false,
      sectionData: {}

    }
    tag: null
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
      screen = <EventList sectionData={this.state.sectionData}/>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.spacer}/>
        {screen}
      </View>
      );
    // return (
    //   <TodoApp/>
    // );
  } // end of render
} // end of class

function mapStateToProps(state) {
  const { db_token,user } = state;
  // console.log(`loading state: ${state['auth']['db_token']}`);
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

// TODO:: more dispatch functions
export default connect(mapStateToProps, {})(HomeScreen);
