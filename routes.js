// keys -> scene
import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';


// Implemented
import InitialScreen from './src/screens/InitialScreen';  //welcome
import CreateAccountScreen from './src/screens/CreateAccountScreen';  //comlpeteprofile 
import HomeScreen from './src/screens/HomeScreen';
// Not Implemented
import RideDetailScreen from './src/screens/RideDetailScreen';
//import OfferRideScreen from './src/screens/OfferRideScreen';
//import EventDetailScreen from './src/screens/EventDetailScreen';

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
        let _this = this;
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
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={InitialScreen} title="" initial={true} hideNavBar/>
                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={HomeScreen} initial={this.state.exist} title="Home" type={ActionConst.REPLACE}/>
                        <Scene key="CompleteProfile" component={CreateAccountScreen} title="Complete Profile" back={false}/>
                        <Scene key="RideDetailScreen" component={RideDetailScreen} title="Ride Details"/>
                    </Stack>

                     <Stack key="Detail">
                        <Scene key="RideDetail" component={RideDetailScreen} title="Ride Detail" type={ActionConst.REPLACE}/>
                    </Stack>
                </Scene>
            </Router>
        )
    }
}
