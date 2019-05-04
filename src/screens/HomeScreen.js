// First landing page upon opening app
// Status: Still need to fix Logout button
import React, {Component} from 'react';
import { StyleSheet, Alert, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/HomeScreenStyles';
import EventCard from '../components/EventCard';
import TodoApp from '../TodoApp';

//actions
import {signOut} from "../actions/auth_actions";
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

class HomeScreen extends Component{
  onSignOutSuccess(){
      console.log("log out success");
      Actions.reset("Auth");
  }
  onSignOutError(message){
      console.log(`log out error: ${message}`);
      Alert.alert('Log out error.');
  }
  onSignOut = () => {
      console.log("Trying to log out.")
      this.props.signOut(
          this.props.db_token,
          this.props.user['fb_id'],
          this.onSignOutSuccess,
          this.onSignOutError
      );
  }
  constructor(props){
    super(props);
    this.state = {
      search: '',
    }
    tag: null
  }
  static navigationOptions = ({navigation}) => {
    return{
      title: 'RideShare',
      headerLeft: null,
      headerRight: (
            <Text style={styles.txtBtn}>Logout</Text>
        
      ),

      headerStyle: {
          height: 75,
          backgroundColor: '#009ECE',
      },
      headerTintColor: 'white',
      headerTitleStyle:{
        fontWeight: 'bold'
      },
      gesturesEnabled: false // Check if it breaks the app
    }
  }
  render() {
    return (
      <View>
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={this.onSignOut}>
            <Text style={styles.txtBtn}>Logout</Text>
        </TouchableOpacity>
        
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
export default connect(mapStateToProps, {signOut, })(HomeScreen);
