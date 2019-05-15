import * as t from './actionTypes';

import {AsyncStorage} from 'react-native';
import {getPosts,getThisPost,offerRide,toggleJoin} from './droplet-api';

export const join_quit_Ride = (db_token, pid, eid, uid) => {
    return new Promise((resolve, reject) => {
        toggleJoin(db_token, pid, uid)
            .then((res) => {
                console.log(`Database reponse: ${JSON.stringify(res.data)}`);
                
                // update local storage 
                const post = res.data;
                AsyncStorage.getItem('events')
                .then((value) => {
                    var events = JSON.parse(value);
                    console.log(`Got from AsyncStorage: ${JSON.stringify(events)}`);
                    var i = 0;
                    while (i < events.length && events[i].id != eid){
                        i += 1
                    }
                    var ii = 0;
                    while(ii < events[i].data.length && events[i].data[ii].id != pid){
                                ii += 1;
                    }
                    if (i >= events.length || ii >= events[i].data.length){
                        reject(`Cannot find such index event ind: ${i}, post ind: ${ii}`)
                    }
                    // replace the data with updated post
                    events[i].data[ii] = post;
                    // console.log(`Updated Toggle data: ${JSON.stringify(events)}`);
                    AsyncStorage.setItem('events', JSON.stringify(events))
                        .then(()=> {
                            resolve(post);
                        })
                        .catch((message)=>{
                            console.log(message);
                            reject(message)
                        });
                });
            })
            .catch((message) => {
                console.log(message);
                reject(false);
        });
    });    
}

export const postRides = (db_token, posts) => {
    return new Promise((resolve, reject) => {
        offerRide(db_token,posts)
        .then((res) => {
            // save it locally 
            const created_posts = res.data
            console.log(created_posts);
            AsyncStorage.getItem('events')
                .then((value) => {
                    var events = JSON.parse(value);
                    var i = 0;
                    while (i < events.length){
                        if (events[i].id == posts.eid){
                            events[i].data = [...events[i].data, ...created_posts]
                            break;
                        }
                        i += 1;
                    }            
                    AsyncStorage.setItem('events', JSON.stringify(events))
                        .then(()=> {
                            resolve(true);
                        })
                        .catch((message)=>{
                            console.log(message);
                            reject(message)
                        });
                });
        })
        .catch((message) => {
            console.log(message);
            reject(message);
        })

    });
}

export const getPostDetail = (db_token, p_id) => {
    return new Promise((resolve, reject) => {
        console.log(`Getting ${p_id} from database`);
        getThisPost(db_token, p_id)
            .then((response) => {
                console.log(`Got gepu post data: ${JSON.stringify(response.data)}`);
                resolve(response.data);
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
            console.log('Force syncing');
            
            getPostsAndEventsOnline(db_token,fb_id, fbtoken, since, limit)
                .then((event_data) =>{resolve(event_data)})
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
                        .then((event_data) =>{resolve(event_data)})
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
            eid_to_info = {}
            // create fb_eid to timestamp mapping (timestamp is for database to clean up)
            eid_to_time = {}

            response.forEach((event) => {
                // const description = event['description'];
                // const start_time = event['start_time'];
                const name = event['name'];

                console.log(`${name} start_time:${event.start_time} end_time: ${event.end_time}`);
                
                // add event_id -> info
                // (${event['place']['street']})
                const address = `${event['place']['name']}`;
                eid_to_info[event.id] = {};
                eid_to_info[event.id].name = event['name'];
                eid_to_info[event.id].to_addr = address;
                eid_to_info[event.id].rsvp = event['rsvp_status'];
                eid_to_info[event.id].end_time = event.end_time;
                eid_to_info[event.id].start_time = event.start_time
                // add event_id -> time data
                // if no end time is specified, default event last 5 days
                if (event.end_time == null){
                    var estimated = new Date(event.start_time.substring(0,19));
                    estimated.setDate(estimated.getDate() + 5);                 
                    eid_to_time[event.id] = estimated.toISOString();
                }
                else{
                    eid_to_time[event.id] = event.end_time;
                }
                // console.log(`New Event:\nname:${name}\ndescription:${description.substring(0,10)}\nstart:${start_time}\naddress:${address}\nrsvp:${rsvp}\nid:${id}`);
            });

            // get post data from gepu db
            getPosts(db_token,eid_to_time)
                .then((response)=>{
                    // console.log(JSON.stringify(response));
                    
                    console.log(`GetPosts api response: ${JSON.stringify(response.data)}`);
                    // add title in each event
                    var event_data = response.data;
                    // re-format data from backend to fit the SectionList
                    event_data.forEach(event => {
                        const fb_eid = event['fb_eid'];
                        event.title = eid_to_info[fb_eid].name;
                        event.to_addr = eid_to_info[fb_eid].to_addr;
                        event.rsvp = eid_to_info[fb_eid].rsvp;
                        event.end_time = eid_to_info[fb_eid].end_time;
                        event.start_time = eid_to_info[fb_eid].start_time;
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

