// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/CreateAccountStyles';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createUserOnDatabase }  from '../actions/auth_actions'

// Required: name
// Optional: picture
// Optional: carColor
// Optional: carMake
// Optional: carModel
// Optional: phone

class CreateAccountScreen extends Component{

  onSubmit(data) {
    // this.setState({error: error}); //clear out error messages

    console.log(`user: ${this.props.user}`);
    // reorganize the data to to fit the database model
    const user_data = {
      phone: this.state.phone,
      name : this.props.user['name'],
      fb_id : this.props.user['id'],
      fbtoken : this.props.user['fbtoken'],
      car_info : this.state.carModel + '|' + this.state.carMake + '|' + this.state.carColor,
    };
    console.log(`submit: ${user_data}`);
    // create user on redux and gepu db
    this.props.createUserOnDatabase(this.props.db_token, user_data, this.onSuccess, this.onError);
  }

  onSuccess() {
    // if form successfully submits, go to home page
    Actions.Home()
  }

  onError(error) {
    console.log(`FORM error: ${error}`);

    //this.setState({error: this.state.error});
  }

  static navigationOptions = {
    title: 'Create Account',
    headerStyle: {
      height: 75,
      backgroundColor: '#FAEBD7',
    },
    headerTintColor: 'black',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  };

  constructor(props){
    super(props);
    this.state = {
      name: '',
      carColor: '',
      carMake: '',
      carModel: '',
      phone: '',
      clicked: false
    }
    tag: null

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);

  }
  render() {
    // async onSubmit(){
    //  Manage input entry validation and authentication
    //}
    return (
      <View style={styles.container}>
        <Text>BLANK</Text>
      </View>
    );
  } // end of render
} // end of class

// give db token from redux to the component
function mapStateToProps(state) {
  const { db_token,user } = state;
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

export default connect(mapStateToProps, { createUserOnDatabase })(CreateAccountScreen);
