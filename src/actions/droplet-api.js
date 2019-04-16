import axios from 'axios';
const API_URL = 'http://178.128.177.5';

// same as sign in
export function getAuthToken(user){
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
    return axios.post(url,{id: fb_id, db_token: db_token});
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
    const url = `${API_URL}/api/user/${user.id}`;
    return axios.delete(url);
}

export function getGroups(group_ids){
    const url = `${API_URL}/api/group/`;
    return axios.get(url).then(response => response.data);
}
