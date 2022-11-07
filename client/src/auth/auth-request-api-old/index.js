/* Axios Library used to send HTTP requests to our back-end API
    The baseURL should be modified to fit the ec2 backe-end instead of localhost */

import axios from 'axios';
axios.defaults.withCredentials = false;
const api = axios.create({
    baseURL: 'https://ec2-3-94-193-80.compute-1.amazonaws.com:3000'
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /register). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const loggedIn = () => api.get(`/auth/loggedIn/`);
export const login = (username, password) => {
    return api.post(`/auth/login/`, {
        username : username,
        password : password
    })
}
export const logout = () => api.get(`/auth/logout/`)
export const register = (firstName, lastName, username, email, password, passwordVerify) => {
    return api.post(`/auth/register/`, {
        firstName : firstName,
        lastName : lastName,
        username : username,
        email : email,
        password : password,
        passwordVerify : passwordVerify
    })
}
export const changePassword = (password, passwordVerify) => {
    return api.put(`/auth/changePassword/`, {
        password : password,
        passwordVerify : passwordVerify
    })
}
// This should be modified to check input username and password before deleting
export const deleteAccount = () => api.delete(`/auth/deleteAccount/`)

/* Modified version. Front end and backend functions should be changed to fit this way
export const deleteAccount = (username, password) => {
    return api.delete(`/deleteAccount/`, {
        username : username,
        password : password
    })
}
*/

export const MapVerify = (mapId) => api.get(`/map/${mapId}/verify/`)

export const TilesetVerify = (tilesetId) => api.get(`/tileset/${tilesetId}/verify/`)

const apis = {
    loggedIn,
    login,
    logout,
    register,
    changePassword,
    deleteAccount,
    MapVerify,
    TilesetVerify
}

export default apis