// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/CreateAccountStyles';

// Photo (Optional)
// Name (required)
// Car Info (Optional)
// Email (Optional)

class CreateAccountScreen extends Component{
  static navigationOptions = {
    title: 'Create Account',
    headerStyle: {
      height: 100,
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
      carInfo: '',
      email: '',
      clicked: false
    }
    tag: null

  }
  render() {
    // async onSubmit(){
    //  Manage input entry validation and authentication
    //}
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <ResponsiveImage
            style={styles.img}
            source={require('../../assets/profile.png')}
          />
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}>Name: </Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(name) => this.setState({name})}
              keyboardType='default'
              value={this.state.name}
              placeholder='Name'
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>


          <View style={styles.spacer}/>

          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}>Car Info: </Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={(carInfo) => this.setState({carInfo})}
              keyboardType='default'
              value={this.state.carInfo}
              placeholder='Silver Hyundai Sonata 2013'
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>

          <View style={styles.spacer}/>   

          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}>Email: </Text>     
            <TextInput
              style={styles.txtInput}
              onChangeText={(email) => this.setState({email})}
              keyboardType='default'
              value={this.state.email}
              placeholder='Email'
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>
        </View>       
      </View>
    );
  } // end of render
} // end of class



export default CreateAccountScreen;
