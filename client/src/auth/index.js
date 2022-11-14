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
                    loggedInBool: true,
                    errorMessage: null,
                    guestMode: auth.guestMode
                })
            }
            case AuthActionType.CHANGE_PASSWORD: {
                return setAuth({
                    user: null,
                    loggedInBool: false,
                    errorMessage: null
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
            default:
                return auth;
        }
    }

    auth.loggedIn = async () => {
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
    }
    // setting to username, password. Requires changes in backend
    // as backend is expecting email, password
    auth.login = async (username, password) => {
        const response = await api.login(username, password).catch((error) => {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: error.response.data.errorMessage
                }
            }
        )});

        if (response.status === 200) {
            console.log("response", response);
            authReducer({
                type: AuthActionType.LOGIN,
                payload: {
                    user: response.data.user
                }
            });
            history('/profile');
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
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: error.response.data.errorMessage
                }
            }
        )});

        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER,
                payload: {
                    user: response.data.user
                }
            });
            // a registered user is automatically logged in
            history('/profile');
        }
    }
    // changing password should logout user (this can be done on the backend OR just calling logout here)
    // in the backend, there is a functionality where it re-logins the user. If the feature is changed, then make sure to change that too
    auth.changePassword = async (email, newPassword, newPasswordVerify) => {
        const response = await api.changePassword(email, newPassword, newPasswordVerify);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.CHANGE_PASSWORD,
                payload: { }
            });
            history('/');
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