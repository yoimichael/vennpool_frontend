// keys -> scene
import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';

// Total of 7 Screens
// Implemented
import InitialScreen from './src/screens/InitialScreen';  //welcome
import CreateAccountScreen from './src/screens/CreateAccountScreen';  //comlpeteprofile 
import HomeScreen from './src/screens/HomeScreen';
// Not Implemented
import RideDetailScreen from './src/screens/RideDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OfferRideScreen from './src/screens/OfferRideScreen';
import MyRidesScreen from './src/screens/MyRidesScreen';

//Import Store, actions
import store from './src/store'
import { checkLoginStatus } from "./src/actions/auth_actions";

import { color, navTitleStyle } from "./src/styles/theme";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,     //indicates if checkLoginStatus is called
            isLoggedIn: false,  //indicates if user has logged in using fb
            exist: false        //indicates if user data exist in the gepu db
        }
    }

    componentDidMount() {
        var _this = this;
        console.log("-----start redux state-----");
        console.log(store.getState());
        console.log("-----end redux state-----");
        store.dispatch(checkLoginStatus((exist, isLoggedIn) => {
            _this.setState({isReady: true, exist, isLoggedIn});
        }));
    }

    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar
                       navigationBarStyle={{backgroundColor: "#fff"}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.black}>
                    <Stack key="Auth" initial={this.state.isReady}> 
                        <Scene key="Welcome" component={InitialScreen} title="" hideNavBar/>
                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn && this.state.isReady} panHandlers={null} >
                        <Scene key="CreateAccount" initial={!this.state.exist} component={CreateAccountScreen} title="Complete Profile" back={false}/>                        
                        <Scene key="Home" component={HomeScreen} title="Home" type={ActionConst.REPLACE}/>
                        <Scene key="Profile" component={ProfileScreen} title="Profile"/>
                        <Scene key="MyRides" component={MyRidesScreen} title="MyRides"/>
                    </Stack>

                     <Stack key="Detail">
                        <Scene key="RideDetail" component={RideDetailScreen} title="Ride Detail" />
                    </Stack>
                </Scene>
            </Router>
        )
    }
}
