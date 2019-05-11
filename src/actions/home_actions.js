import * as t from './actionTypes';

import {AsyncStorage,Alert} from 'react-native';
import {getPosts,getThisPost} from './droplet-api';

const joinRide = () => {
    
}

const postRide = () => {
    
}

export const getPostDetail = (db_token, p_id) => {
    return new Promise((resolve, reject) => {
        console.log(`Getting ${p_id} from database`);
        
        getThisPost(db_token, p_id)
            .then((response) => {
                resolve(response.data.data[0]);
            })
            .catch((message) => {
                reject(message);
            })
    })
}

// get events from facebook or from cache
const getPostAndEvents = async(db_token, fb_id, fbtoken, limit, forceSync=false) => {
    return new Promise(async (resolve, reject) => {
        
        // get current time
        const since = new Date().toISOString().split('T')[0]; 

        if (forceSync){
            getPostsAndEventsOnline(db_token,fb_id, fbtoken, since, limit)
                .then((events_qs, event_title) =>{resolve(events_qs,event_title)})
                .catch((message) => {reject(message)});
        }
        else{
            // get posts and events from cache
            AsyncStorage.multiGet(['last_update','events'])
            .then((arr) => {
                const last_update_date = arr[0][1];
                const eventsData = arr[1][1];
                console.log(`Last events update: ${last_update_date}`);
                
                // if the last update happened in the same day
                if (since == last_update_date && eventsData != null){
                    // get it from cache
                    console.log('------start cache events------');
                    resolve(JSON.parse(eventsData));
                }
                else{
                    // get them from facebook 
                    getPostsAndEventsOnline(db_token,fb_id, fbtoken, since, limit)
                        .then((events_qs,event_title) =>{resolve(events_qs,event_title)})
                        .catch((message) => {reject(message)});
                }
            })
            .catch(({message}) => {
                reject(message);
            });
        } 
    });
}
export {getPostAndEvents};

const getPostsAndEventsOnline = (db_token, fb_id, fbtoken,since,limit) => {
    return new Promise(async (resolve, reject) => {

        // get events from facebook
        console.log('------start fb events------');
        const url = `https://graph.facebook.com/${fb_id}/events?access_token=${fbtoken}&since=${since}&limit=${limit}`;
        console.log(`URL: ${url}\n`);
        var response = await fetch(url);
        try{                        
            response = await JSON.parse(response['_bodyInit'])['data']
            console.log('Got events:');
            
            // create fb_id to title mapping
            eid_to_title = {}
            // create fb_eid to timestamp mapping (timestamp is for database to clean up)
            eid_to_time = {}

            response.forEach((event) => {
                // const description = event['description'];
                // const start_time = event['start_time'];
                
                const name = event['name'];
                // add event_id -> title
                eid_to_title[event.id] = event['name'];
                // add event_id -> time data
                eid_to_time[event.id]=event.end_time;
                // const address = `${event['place']['name']} (${event['place']['street']})`;
                // const rsvp = event['rsvp_status'];
                // const id = event['id'];
                // console.log(`New Event:\nname:${name}\ndescription:${description.substring(0,10)}\nstart:${start_time}\naddress:${address}\nrsvp:${rsvp}\nid:${id}`);
                console.log(name);
            });

            // get post data from gepu db
            getPosts(db_token,eid_to_time)
                .then((response)=>{
                    console.log(`GetPosts api response: ${JSON.stringify(response.data)}`);
                    // add title in each event
                    var event_data = response.data;
                    // re-format data from backend to fit the SectionList
                    event_data.forEach(event => {
                        const fb_eid = event['fb_eid'];
                        event.title = eid_to_title[fb_eid];
                        var data = event.posts;
                        event.data = data;
                        delete event.posts;
                    })

                    // Store to Async 
                    AsyncStorage.multiSet([
                        ['events', JSON.stringify(event_data)],
                        ['last_update', since]
                    ]).then(()=>{
                        console.log('Async: events saved');
                    });

                    resolve(event_data);
                }).catch(error => {
                    reject(JSON.stringify(error));
            });
        }
        catch({message}){
            // Alert.alert('Event fetch Error');
            console.log(`Event fetch  Error: ${message}`);
            reject(message);
        }

    });
}

