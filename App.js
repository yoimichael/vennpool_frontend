import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Font, AppLoading } from 'expo';
//redux
import { Provider } from 'react-redux';
import Router from './routes'
import store from './src/store';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

// const RootStack = createStackNavigator(
//   {
//     Initial: InitialScreen,
//     CreateAccount: CreateAccountScreen,
//     Home: HomeScreen,
//     RideDetail: RideDetailScreen
//   },
//   {
//     initialRouteName: 'Initial',
//   }
// );

// const HomeStack = createStackNavigator{
//   {
//     Home: HomeScreen,
//     //OfferRide: OfferRideScreen, 
//     //RideDetail: RideDetailScreen,
//     //EventDetail: EventDetailScreen,
//   }
// }


// const AppContainer = createAppContainer(RootStack);

export default class App extends Component {

  constructor() {
          super();
          this.state = {
          isReady: false,
      }
   }

  async _loadAssetsAsync() {
       const fontAssets = cacheFonts([
           {RobotoExtraBold: require('./assets/fonts/Roboto-Black.ttf')},
           {RobotoBold: require('./assets/fonts/Roboto-Bold.ttf')},
           {RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf')},
           {RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf')},
           {RobotoLight: require('./assets/fonts/Roboto-Light.ttf')}
       ]);

       await Promise.all([...fontAssets]);
  }

  render() {
      if (!this.state.isReady) {
         return (
             <AppLoading
                 startAsync={this._loadAssetsAsync}
                 onFinish={() => this.setState({isReady: true})}
                 onError={console.warn}
             />
         );
     }
    return (
      <Provider store={store}>
        <Router/>
      </Provider>

      )
  }
}


