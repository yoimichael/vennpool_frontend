//import {auth, database, provider} from "../../config/firebase";
import * as t from './actionTypes';

import {AsyncStorage,Alert} from 'react-native';
import {Facebook} from 'expo';
import * as c from "./constants";
import {getAuthToken,createUser,removeAuthToken, updateUser} from './droplet-api';

const getFacebookEvents = async(fb_id, fbtoken) => {
    const since = new Date().toISOString().split('T')[0];
    console.log('------start fb events------');
    const response = await fetch(`https://graph.facebook.com/${fb_id}/events?access_token=${token}&since=${since}&limit=25`);
    try{
        response.data.forEach((event) => {
            const description = event.description;
            const start_time = event.start_time;
            const name = event.name;
            const address = `${event.place.name} (${event.place.street})`;
            const rsvp = event.rsvp_status;
            const id = event.id;
            console.log(`New Event:${description}\n${start_time}\n${name}\n${address}\n${rsvp}\n${id}`);
        });
    }
    catch({message}){
        Alert.alert(`AsyncStorage Error: ${message}`)
                return {type:null, token:null, data:null}
    }

    console.log('------end fb events------');
}

const signInWithFacebook = async() => {
    try{
        // sign user in, get user token
        const {type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync(c.FACEBOOK_APP_ID, c.FB_OPTIONS);
        console.log('------start fb response------');
        console.log(`type: ${type}`);
        console.log(`token: ${token}`);
        console.log(`expires: ${expires}`);
        console.log(`permissions: ${permissions}`);
        console.log(`declinedPermissions: ${declinedPermissions}`);
        console.log('------end fb response------');
        // get user info using token
        if (type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const data = await response.json();
            console.log(JSON.stringify(data));
            // store the data in local storage
            try{
                await AsyncStorage.setItem('fbtoken', token)
                console.log('Logged in!', `Hi ${data.name}!`);

                // change the id attributes to fb_id
                const fb_id = data.id;
                delete data.id;
                data.fb_id = fb_id;
                return {type, token, data};
            } catch ({message}){
                Alert.alert(`AsyncStorage Error: ${message}`)
                return {type:null, token:null, data:null}
            }
        }
        else{
            Alert.alert('Cannot retrive user info');
            return {type, token, data:null}
        }
    } catch ({message}){
        Alert.alert(`Facebook Login Error: ${message}`)
        return {type:null, token:null, data:null}
    }
}
export {signInWithFacebook};

//Sign user out
export function signOut(db_token,fb_id,onSuccess,onError) {
    return (dispatch) => {
        removeAuthToken(db_token, fb_id).then((response)=>{
            console.log(JSON.stringify(response));
            dispatch({type: t.LOGGED_OUT});
            onSuccess();
        }).catch((error)=>{
            const e = JSON.stringify(error);
            console.log(e);
            onError(e);
        })
    };
}

export function updateUserOnDatabase(db_token, user_data, onSuccess, onError) {
    return (dispatch) => {
        updateUser(db_token,user_data).then((response)=>{
            // get user's new data (with user id on gepu)
            const user = response.data;
            dispatch({type: t.LOGGING_IN, exist: true, user: user, db_token: db_token});
            onSuccess();
        }).catch(error => {
            onError(JSON.stringify(error));
        })
    };
}

export function createUserOnDatabase(db_token, user_data, onSuccess, onError) {
    return (dispatch) => {
        createUser(db_token,user_data).then((response)=>{
            // get user's new data (with user id on gepu)
            const user = response.data;
            dispatch({type: t.LOGGING_IN, exist: true, user: user, db_token: db_token});
            onSuccess();
        }).catch(error => {
            onError(JSON.stringify(error));
        })
    };
}

export function signInOnDatabase(token,data) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            // get db token from gepu api
            let user_data = {...data, 'fbtoken':token};
            console.log(`User data sent to db: ${JSON.stringify(user_data)}`);
            
            console.log('------start database response------');
            getAuthToken(user_data).then((response) => {
                const exist= response.data.exist;
                const db_token= response.data.db_token;
                // update the user data if it exist in the database
                user_data = (exist) ? response.data.user: user_data;
                // console.log(`database response: ${JSON.stringify(response)}`);
                console.log(`exist: ${exist}`+`\ndb_token: ${db_token}`+`\nuser_data: ${JSON.stringify(user_data)}`);
                console.log('------end database response------');
                dispatch({type: t.LOGGING_IN, exist: exist, user: user_data, db_token: db_token});
                resolve({exist,db_token}); //TODO:: do need to pass dbtoken?
            }).catch(error => {
                e = JSON.stringify(error.response);
                console.log(`error: ${e}`);
                dispatch({type: t.LOGGED_OUT});
                reject(e)
                console.log('------end database response------');
            });

        });
    };
}

// check session, when user re-opens the app
export function checkLoginStatus(callback) {
    return (dispatch) => {
        console.log("-----start Check Login Status---");
        AsyncStorage.multiGet(['user','db_token']).then((arr) => {
            // make stategs according to the asyncstorage
            const user = JSON.parse(arr[0][1]);
            const db_token = arr[1][1];
            try{
                const fbtoken = user.fbtoken;
                console.log(`test getting fbtoken from user: ${fbtoken}`);
            }catch({message}){
                console.log(`fbtoken: ${message}`);
            }

            let exist = (user != null && user['id'] != null && user['fb_id'] != null);
            let isLoggedIn = (db_token != null);
            console.log(`user: ${JSON.stringify(user)}`);
            console.log(`db_token: ${db_token}`);
            console.log(`exist: ${exist}, isLoggedIn: ${isLoggedIn}`);
            // update states
            if (!isLoggedIn){
                dispatch({type: t.LOGGED_OUT});
            }
            else{
                dispatch({type: t.LOGGED_IN, exist: exist, user: user, db_token: db_token})
            }
            console.log("-----end Check Login Status---");
            // send exsit, isLoggedIn to routes
            callback(exist, isLoggedIn);

        }).catch(({message}) => {
            console.log(`error ${message}`);
        });

    };
}
