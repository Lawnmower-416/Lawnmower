import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// some functions use useHistory to redirect to a different page
// check if this is necessary
import api from './../requests/auth-request';

const AuthContext = createContext();

export const AuthActionType = {
    GET_LOGGED_IN: 'GET_LOGGED_IN',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
    ERROR_MESSAGE: 'ERROR_MESSAGE',
    GUEST_MODE: 'GUEST_MODE',
    UPDATE_AVATAR: 'UPDATE_AVATAR',
}
/*
    errorMessage:
    0: not all filled in
    1: invalid login credentials
    2: password too short
    3: password not repeated correctly
    4: email already in use
    5: username already in use
*/
function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedInBool: false,
        errorMessage: null,
        guestMode: false
    });

    useEffect(() => {
        auth.loggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //useHistory hase been replaced with useNavigate
    const history = useNavigate();

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedInBool: payload.loggedInBool,
                    errorMessage: null,
                    guestMode: auth.guestMode
                })
            }
            case AuthActionType.LOGIN: {
                return setAuth({
                    user: payload.user,
                    loggedInBool: true,
                    errorMessage: null,
                    guestMode: false
                })
            }
            case AuthActionType.LOGOUT: {
                return setAuth({
                    user: null,
                    loggedInBool: false,
                    errorMessage: null,
                    guestMode: auth.guestMode
                })
            }
            case AuthActionType.REGISTER: {
                return setAuth({
                    user: payload.user,
                    loggedInBool: false,
                    errorMessage: payload.message,
                    guestMode: auth.guestMode
                })
            }
            case AuthActionType.CHANGE_PASSWORD: {
                return setAuth({
                    user: null,
                    loggedInBool: false,
                    errorMessage: payload.message
                })
            }
            case AuthActionType.DELETE_ACCOUNT: {
                return setAuth({
                    user: null,
                    loggedInBool: false,
                    errorMessage: null,
                    guestMode: auth.guestMode
                })
            }
            case AuthActionType.ERROR_MESSAGE: {
                return setAuth({
                    user: null,
                    loggedInBool: false,
                    errorMessage: payload.errorMessage,
                    guestMode: auth.guestMode
                })
            }
            case AuthActionType.GUEST_MODE: {
                return setAuth({
                    user: null,
                    loggedInBool: false,
                    errorMessage: null,
                    guestMode: true
                })
            }
            case AuthActionType.UPDATE_AVATAR: {
                return setAuth({
                    user: payload.user,
                    loggedInBool: auth.loggedInBool,
                    errorMessage: auth.errorMessage,
                    guestMode: auth.guestMode
                })
            }
            default:
                return auth;
        }
    }

    auth.loggedIn = async () => {
        try {
            const response = await api.loggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        user: response.data.user,
                        loggedInBool: response.data.loggedIn
                    }
                });
            }
        } catch (error) {
            console.log("Error in loggedIn");
        }
    }
    // setting to username, password. Requires changes in backend
    // as backend is expecting email, password
    auth.login = async (username, password) => {
        const response = await api.login(username, password).catch((error) => {
            let message = error.message;
            if(error.response && error.response.data && error.response.data.errorMessage) {
                message = error.response.data.errorMessage;
            }
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: message
                }
            });
            console.log(error.response);
            return;
        });
        if (response && response.status === 200) {
            console.log("response", response);
            authReducer({
                type: AuthActionType.LOGIN,
                payload: {
                    user: response.data.user
                }
            });
            history('/profile/' + response.data.user._id);
        }
    }
    auth.logout = async () => {
        const response = await api.logout();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT,
                payload: null
            });
            history('/');
        }
    }
    auth.register = async (firstName, lastName, username, email, password, passwordVerify) => {
        const response = await api.register(firstName, lastName, username, email, password, passwordVerify).catch((error) => {
            let message = error.message;
            if(error.response && error.response.data && error.response.data.message) {
                message = error.response.data.errorMessage;
            }
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: message
                }
            });
        });
        if (response && response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER,
                payload: {
                    user: null,
                    message: response.data.message
                }
            });
            // a registered user is NOT automatically logged in. They must login after verifying their email
            history('/login');
        }
    }
    // changing password should logout user (this can be done on the backend OR just calling logout here)
    // in the backend, there is a functionality where it re-logins the user. If the feature is changed, then make sure to change that too
    auth.changePassword = async (email, newPassword, newPasswordVerify) => {
        const response = await api.changePassword(email, newPassword, newPasswordVerify);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.CHANGE_PASSWORD,
                payload: {
                    message: response.data.message
                }
            });
            history('/login');
        } else {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: response.data.errorMessage
                }
            }
        )
        }
    }
    auth.deleteAccount = async (username, password) => {
        try {
            const response = await api.deleteAccount(username, password)
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.DELETE_ACCOUNT,
                    payload: null
                });
                history('/');
            } else {
                authReducer({
                    type: AuthActionType.ERROR_MESSAGE,
                    payload: {
                        errorMessage: response.data.errorMessage
                    }
                });
            }
        } catch (error) {
            console.log('error with delete account');
        }
    }

    auth.setErrorMessage = (errorMessage) => {
        authReducer({
            type: AuthActionType.ERROR_MESSAGE,
            payload: {
                errorMessage: errorMessage
            }
        });
    }

    auth.getAUser = async (userId) => {
        try {
            const response = await api.getAUser(userId);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("Error in getting a user's public details");
        }
    }

    auth.wipeErrorMessage = () => {
        authReducer({
            type: AuthActionType.ERROR_MESSAGE,
            payload: {
                errorMessage: null
            }
        });
    }

    auth.updateAvatar = async (avatorString) => {
        //possible avatar strings are: "black, red, green, blue, alien, monkey, pirate, poro"
        try {
            console.log(auth.user)
            const userId = auth.user._id;
            const response = await api.updateAvatar(userId, avatorString);
            if (response.status === 200) {
                let updatedUser = auth.user
                updatedUser.avatar = avatorString;
                console.log("updated user", updatedUser)
                authReducer({
                    type: AuthActionType.UPDATE_AVATAR,
                    payload: {
                        user: updatedUser
                    }
                });
            }
        } catch (error) {
            console.log("Error in updating avatar");
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };