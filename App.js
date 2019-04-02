import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Implemented
import InitialScreen from './src/screens/InitialScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import HomeScreen from './src/screens/HomeScreen';
// Not Implemented
import RideDetailScreen from './src/screens/RideDetailScreen';
//import OfferRideScreen from './src/screens/OfferRideScreen';
//import EventDetailScreen from './src/screens/EventDetailScreen';

// Routes
const RootStack = createStackNavigator(
  {
    Initial: InitialScreen,
    CreateAccount: CreateAccountScreen,
    Home: HomeScreen,
    RideDetail: RideDetailScreen
  },
  {
    initialRouteName: 'Initial',
  }
);

// const HomeStack = createStackNavigator{
//   {
//     Home: HomeScreen,
//     //OfferRide: OfferRideScreen, 
//     //RideDetail: RideDetailScreen,
//     //EventDetail: EventDetailScreen,
//   }
// }


const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}