import axios from 'axios';
const API_URL = 'http://178.128.177.5';

// same as sign in
export function getAuthToken(user){
    axios.defaults.headers.common['Authorization'] = null;
    const url = `${API_URL}/api/login/`;
    return axios.post(url,user);
}
export function createUser(db_token,user){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/user/`;
    return axios.post(url,user);
}

// same as sign out
export function removeAuthToken(db_token,fb_id){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/logout/`;
    return axios.post(url,{fb_id: fb_id, db_token: db_token});
}

export function getUser(db_token,userid){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/user/${userid}`;
    return axios.get(url).then(response => response.data);
}
export function updateUser(db_token,user){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/user/${user.id}`;
    return axios.put(url,user);
}

export function deleteUser(db_token,user){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/user/${user.id}`;
    return axios.delete(url);
}

export function getPosts(db_token, event_time_map){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/event/`;
    console.log(`Sending:\n ${JSON.stringify(event_time_map)}`);
    return axios.post(url,event_time_map); // it's a post because data is attached
}

export function getThisPost(db_token, post_id){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/post/${post_id}`;
    return axios.get(url); 
}

export function offerRide(db_token, posts){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/post/`;
    return axios.post(url,posts); // it's a post because data is attached
}

export function toggleJoin(db_token, post_id, uid){
    axios.defaults.headers.common['Authorization'] = "Token " + db_token;
    const url = `${API_URL}/api/post/${post_id}`;
    return axios.put(url, {id: uid}); 
}
