import { AsyncStorage } from 'react-native';

import * as t from '../actions/actionTypes';
import { AuthSession } from 'expo';

const initialState = {isLoggedIn: false, user: null, db_token:null, exist: false};

const authReducer = (state = initialState, action) => {
    
    console.log('------start reducer ------');
    switch (action.type) {
        case t.LOGGED_IN:
            console.log('state updated');
            console.log('------end reducer ------');
            return {...state, isLoggedIn: true, user:action.user, db_token:action.db_token, exist:action.exist};

        case t.LOGGING_IN:
            console.log('logging in');

            const user = JSON.stringify(action.user);
            console.log(`user: ${user}`);
            console.log(`user exist: ${action.exist}`);
            console.log(`db token: ${action.db_token}`);
            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['user', user],
                ['db_token', action.db_token]
            ]).then(()=>{
                console.log('Async user, dbtoken saved');
            });
            console.log('------end reducer ------');
            return {...state, isLoggedIn: true, user:action.user, db_token:action.db_token, exist:action.exist};

        case t.LOGGED_OUT:
            let keys = ['user','fbToken','db_token','last_update'];
            AsyncStorage.multiRemove(keys).then(()=>{
                console.log('Async: user, dbtoken removed');
            });
            console.log('------end reducer ------');
            return initialState;

        default:
            return state;
    }
};

export default authReducer;

// TODO:: maybe not need to re-save db_token: new action types to optimize?
