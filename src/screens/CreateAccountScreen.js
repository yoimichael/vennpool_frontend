// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated, Keyboard, KeyboardAvoidingView  } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/CreateAccountStyles.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createUserOnDatabase }  from '../actions/auth_actions'

class CreateAccountScreen extends Component{
 onSubmit(data) {
    // this.setState({error: error}); //clear out error messages

    console.log(`user: ${this.props.user}`);
    // reorganize the data to to fit the database model
    const user_data = {
      phone: this.state.phone,
      name : this.state.name,
      fb_id : this.props.user['fb_id'],
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
      backgroundColor: '#D86512',
    },
    headerTintColor: 'white',
    headerTitleStyle:{
      fontSize: 20,
      fontWeight: 'bold'
    }
  };

  constructor(props){
    super(props);
    this.state = {
      ...this.props.user,
      db_token: this.props.db_token,
      carColor: '',
      carMake: '',
      carModel: '',
      phone: '',
      clicked: false,
      photoUrl: ""
    }
    
    if (this.state.fb_id)
      this.state.photoSource = {uri: `https://graph.facebook.com/${this.state.fb_id}/picture?type=large`};
    else
      this.state.photoSource = require('../../assets/profile.png');

    tag: null

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }


  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Image style={styles.img} source={this.state.photoSource}/>
          </View>
                
          <View style={styles.container}> 
            <Text style={styles.txtTitle}>Profile Info</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(name) => this.setState({name})}
              keyboardType='default'
              value={this.state.name}
              placeholder={"First Name Last Name"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
            <Text style={styles.txtExtra}>(Only shared to people in the same ride)</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(phone) => this.setState({phone})}
              keyboardType='numeric'
              value={this.state.phone}
              placeholder={"Enter your Phone Number"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />        
          </View>

          <View style={styles.container}>
            <Text style={styles.txtTitle}>Car Info</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(carModel) => this.setState({carModel})}
              keyboardType='default'
              value={this.state.carModel}
              placeholder={"Enter your Car Model (i.e. Honda)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />   
            <TextInput
              style={styles.txt}
              onChangeText={(carMake) => this.setState({carMake})}
              keyboardType='default'
              value={this.state.carMake}
              placeholder={"Enter your Car Make (i.e. Civic)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />             
            <TextInput
              style={styles.txt}
              onChangeText={(carColor) => this.setState({carColor})}
              keyboardType='default'
              value={this.state.carColor}
              placeholder={"Enter your Car Color (i.e. Silver)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />   
          </View>

          <View style={styles.container}>
            <TouchableOpacity 
              style={styles.submitBtn} 
              onPress={this.onSubmit}>
                <Text style={styles.txtBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  } // end of render
} // end of class

// give db token from redux to the component
function mapStateToProps(state) {  
  return {db_token: state['auth']['db_token'], user: state['auth']['user']}
}

export default connect(mapStateToProps, { createUserOnDatabase })(CreateAccountScreen);
