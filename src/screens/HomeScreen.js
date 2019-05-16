// First landing page upon opening app
// Status: Still need to fix Logout button
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, } from 'react-native';
import styles from '../styles/HomeScreenStyles';
import EventList from '../components/EventList';

//actions
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import {get_my_posts}  from '../actions/home_actions'


class HomeScreen extends Component{

  constructor(props){
    super(props);
    this.onMyRides = this.onMyRides.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({onMyRides: this.onMyRides});
  }
  onMyRides(){
    get_my_posts(this.props.uid)
      .then(posts => {
        Actions.MyRides({posts: posts})
      })
      .catch((message) => {
        console.log(message);
        alert("ERROR");
      })
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
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
          onPress={params.onMyRides}>
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

function mapStateToProps(state) {
  const { db_token,user } = state;
  // console.log(`loading state: ${state['auth']['db_token']}`);
  return { uid: state['auth']['user']['id'] }
}

export default connect(mapStateToProps, {})(HomeScreen);
