import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// some functions use useHistory to redirect to a different page
// check if this is necessary
import api from './auth-request-api/index';

const AuthContext = createContext();

export const AuthActionType = {
    GET_LOGGED_IN: 'GET_LOGGED_IN',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
    ERROR_MESSAGE: 'ERROR_MESSAGE'
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
        loggedIn: false,
        errorMessage: null
    });

    //useHistory hase been replaced with useNavigate
    const history = useNavigate();

    useEffect(() => {
        auth.loggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: null
                })
            }
            case AuthActionType.LOGIN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: null
                })
            }
            case AuthActionType.LOGOUT: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null
                })
            }
            case AuthActionType.REGISTER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: null
                })
            }
            case AuthActionType.CHANGE_PASSWORD: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: null
                })
            }
            case AuthActionType.DELETE_ACCOUNT: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null
                })
            }
            case AuthActionType.ERROR_MESSAGE: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: payload.errorMessage
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
                    loggedIn: response.data.loggedIn
                }
            });
        }
    }
    // setting to username, password. Requires changes in backend
    // as backend is expecting email, password
    auth.login = async (username, password) => {
        const response = await api.login(username, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN,
                payload: {
                    user: response.data.user
                }
            });
            history.push('/profile');
        }
        if (response.status === 401) {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: response.data.errorMessage
                }
            });
        }
    }
    auth.logout = async () => {
        const response = await api.logout();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT,
                payload: null
            });
            history.push('/');
        }
    }
    auth.register = async (firstName, lastName, username, password) => {
        const response = await api.register(firstName, lastName, username, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER,
                payload: {
                    user: response.data.user
                }
            });
            // a registered user is automatically logged in
            history.push('/profile');
        }
        if (response.status === 401) {
            authReducer({
                type: AuthActionType.ERROR_MESSAGE,
                payload: {
                    errorMessage: response.data.errorMessage
                }
            });
        }

    }
    // changing password should logout user (this can be done on the backend OR just calling logout here)
    // in the backend, there is a functionality where it re-logins the user. If the feature is changed, then make sure to change that too
    auth.changePassword = async (currentPassword, newPassword) => {
        const response = await api.changePassword(currentPassword, newPassword);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.CHANGE_PASSWORD,
                payload: {
                    user: response.data.user
                }
            });
            history.push('/');
        }
    }
    auth.deleteAccount = async (password) => {
        const response = await api.deleteAccount(password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.DELETE_ACCOUNT,
                payload: null
            });
            history.push('/');
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