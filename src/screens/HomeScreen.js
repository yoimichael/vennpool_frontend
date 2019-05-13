// First landing page upon opening app
// Status: Still need to fix Logout button
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, } from 'react-native';
import styles from '../styles/HomeScreenStyles';
import EventList from '../components/EventList';

//actions
import {Actions} from 'react-native-router-flux';

class HomeScreen extends Component{

  constructor(props){
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    return{
      title: 'Feed',
      headerLeft: (
        <TouchableOpacity
          style={styles.btn}
          onPress={()=>{Actions.Profile()}}>
            <Text style={styles.txtBtn}>Profile</Text>
        </TouchableOpacity>
      )
      ,
      headerRight: (
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => {Actions.MyRides()}}>
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
          <EventList demo={false}/>    
        <View style={styles.spacer}/>
      </View>
      );
  } // end of render
} // end of class
export default HomeScreen;
