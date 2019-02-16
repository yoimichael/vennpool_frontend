import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import InitialScreen from './src/screens/InitialScreen';


const RootStack = createStackNavigator(
  {
    Initial: InitialScreen,
    // List any other screens below as 'routes'
  },
  {
    initialRouteName: 'Initial',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}