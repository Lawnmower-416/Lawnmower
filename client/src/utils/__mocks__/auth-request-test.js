const defaultUser = { //send all back except password hash
    firstName: "JohnTest",
    lastName: "Test",
    username: "jdoe123",
    email: "email",
    joinDate: "joinDate",
    maps: "maps",
    tilesets: "tilesets",
    comments: "comments",
    _id: "_id"
};
const mockUsername = "jdoe123";
const mockPassword = "test1234";

const loggedIn = (cookie) => {
    return new Promise((resolve, reject) => {
        const user = cookie.substring("token=".length);
        process.nextTick(() => {
            if (user) return resolve({
                loggedIn: true,
                user: { //send all back except password hash
                    firstName: "firstName",
                    lastName: "lastName",
                    username: "username",
                    email: "email",
                    joinDate: "joinDate",
                    maps: "maps",
                    tilesets: "tilesets",
                    comments: "comments",
                    _id: "_id"
                }
            })
            else return reject({
                loggedIn: false,
                user: null,
                errorMessage: ""
            });
        });
    });
};
const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            if (mockUsername === username && mockPassword === password) {
                return resolve({
                    success: true,
                    user: defaultUser,
                    cookie: "token=tokenstoredincookie"
                });
            } else {
                return reject({
                    success: false, 
                    errorMessage: "Wrong email address or password provided"
                });
            }
        });

    });
}
const logout = () => {
    return new Promise((resolve, reject) => resolve("token="));
};
const register = (firstName, lastName, username, email, password, passwordVerify) => {
    return new Promise((resolve, reject) => {
        if (!firstName || !lastName || !username || !email || !password || !passwordVerify) {
            return reject({
                success: false,
                errorMessage: "Please enter all required fields."
            });
        }
        process.nextTick(() => {
            return resolve({
                success: true,
                user: defaultUser,
                cookie: "token=tokenstoredincookie"
            });
        });
    });
}
const changePassword = (password, passwordVerify) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            if (password !== passwordVerify) {
                return reject({
                    success: false,
                    errorMessage: "Passwords don't match"
                });
            } else {
                return resolve({
                    success: true,
                    user: defaultUser
                });
            }
        });
    });
}

export const authRequest = (url, values) => {
    if (url.contains("/auth/loggedIn/")) {
        return loggedIn(value.cookie);
    } else if (url.contains("/auth/login/")) {
        return login(value.username, value.password);
    } else if (url.contains("/auth/logout/")) {
        return logout();
    } else if (url.contains("/auth/register/")) {
        return register(value.firstName, value.lastName, value.username, value.email, value.password, value.passwordVerify);
    } else if (url.contains("/auth/changePassword/")) {
        return changePassword(value.password, value.passwordVerify);
    }
}

// This should be modified to check input username and password before deleting
// export const deleteAccount = () => baseAPI.delete(`/auth/deleteAccount/`)