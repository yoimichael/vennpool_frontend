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
import {getFacebookEvents}  from '../actions/auth_actions'

class HomeScreen extends Component{


  constructor(props){
    super(props);

    // getFacebookEvents(this.props.user['fb_id'], this.props.user['fbtoken'],limit=2)
    //   .then((response) => {
        
    //     // send response to database
    //   })
    //   .catch((message) => {
    //     //do nothing
    //   });

    this.state = {
      search: '',
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
    return (
      <View style={styles.container}>
        <View style={styles.spacer}/>
        <EventList/>
        
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
