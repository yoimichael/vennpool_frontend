// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/HomeScreenStyles';
import EventCard from '../components/EventCard';

class HomeScreen extends Component{
  static navigationOptions = ({navigation}) => {
    return{
      title: 'RideShare',
      headerLeft: null,
      headerRight: 
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => navigation.navigate('Initial')}>
            <Text style={styles.txtBtn}>Logout</Text>
        </TouchableOpacity>,

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

  constructor(props){
    super(props);
    this.state = {
      search: '',
    }
    tag: null
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.txtInput}
          onChangeText={(search) => this.setState({search})}
          keyboardType='default'
          value={this.state.name}
          placeholder='Search Event (Placeholder)'
          placeholderTextColor='gray'
          borderBottomColor='gray'
          borderBottomWidth={1}
        />        
        <EventCard/>
      </View>
    );
  } // end of render
} // end of class



export default HomeScreen;
