import { baseAPI } from ".";

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /register). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const loggedIn = () => baseAPI.get(`/auth/loggedIn/`, {withCredentials: true});
export const login = async (username, password) => {
    const result = await baseAPI.post(`/auth/login/`, {
        username : username,
        password : password
    }, {withCredentials: true});
    return result;
}
export const logout = () => baseAPI.post(`/auth/logout/`, {}, {withCredentials: true});
export const register = (firstName, lastName, username, email, password, passwordVerify) => {
    return baseAPI.post(`/auth/register/`, {
        firstName : firstName,
        lastName : lastName,
        username : username,
        email : email,
        password : password,
        passwordVerify : passwordVerify
    }, {withCredentials: true});
}
export const changePassword = (email, password, passwordVerify) => {
    return baseAPI.put(`/auth/changePassword/`, {
        email: email,
        password : password,
        passwordVerify : passwordVerify
    })
}
// This should be modified to check input username and password before deleting
export const deleteAccount = (username, password) => {
    return baseAPI.put(`/auth/deleteAccount/`, {
        username : username,
        password : password
    }, {withCredentials: true});
}

export const getAUser = (userId) => {
    return baseAPI.get(`/auth/users/${userId}`);
}   

export const updateAvatar = (userId, avatarString) => {
    return baseAPI.put(`/auth/users/${userId}/avatar`, {
        avatarString: avatarString
    }, {withCredentials: true});
}

export const MapVerify = (mapId) => baseAPI.get(`/map/${mapId}/verify/`);

export const TilesetVerify = (tilesetId) => baseAPI.get(`/tileset/${tilesetId}/verify/`);

const apis = {
    loggedIn,
    login,
    logout,
    register,
    changePassword,
    deleteAccount,
    getAUser,
    updateAvatar,
    MapVerify,
    TilesetVerify
}

export default apis;