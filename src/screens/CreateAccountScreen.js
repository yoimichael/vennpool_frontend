// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/CreateAccountStyles';

// Required: name
// Optional: picture
// Optional: carColor
// Optional: carMake
// Optional: carModel
// Optional: contact

class CreateAccountScreen extends Component{
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
      contact: '',
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
            <View style={styles.spacer}/>   
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
            <Text style={styles.inputTitle}>Car Color: </Text>
            <View style={styles.spacer}/> 
            <TextInput
              style={styles.txtInput}
              onChangeText={(carColor) => this.setState({carColor})}
              keyboardType='default'
              value={this.state.carColor}
              placeholder='Silver'
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>

          <View style={styles.spacer}/>   

          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}>Car Make: </Text>
            <View style={styles.spacer}/>      
            <TextInput
              style={styles.txtInput}
              onChangeText={(carMake) => this.setState({carMake})}
              keyboardType='default'
              value={this.state.carMake}
              placeholder='Hyundai'
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>
          
          <View style={styles.spacer}/>   

          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}>Car Model: </Text>
            <View style={styles.verticalSpacer}/>      
            <TextInput
              style={styles.txtInput}
              onChangeText={(carModel) => this.setState({carModel})}
              keyboardType='default'
              value={this.state.carModel}
              placeholder='Sonata'
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>

          <View style={styles.spacer}/>   

          <View style={styles.inputRow}>
            <Text style={styles.inputTitle}>Contact: </Text>
            <View style={styles.spacer}/>      
            <TextInput
              style={styles.txtInput}
              onChangeText={(contact) => this.setState({contact})}
              keyboardType='default'
              value={this.state.contact}
              placeholder='(xxx) - xxx - xxxxx'
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
          </View>

          <View style={styles.container}>
            <TouchableOpacity 
              style={styles.btn} 
              onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.txtBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>       
      </View>
    );
  } // end of render
} // end of class



export default CreateAccountScreen;
