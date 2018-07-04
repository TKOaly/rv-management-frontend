import { errorMessage } from './notificationReducer';
import axios from 'axios';

export const authenticationActions = {
    SET_AUTHENTICATING: 'SET_AUTHENTICATING',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
    AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE',
    LOGOUT: 'LOGOUT'
};

export const initialState = {
    isAuthenticating: false,
    isAuthenticated: false,
    accessToken: null,
    authenticationError: null
};

export const setAuthenticating = (authenticating) => {
    return {
        type: authenticationActions.SET_AUTHENTICATING,
        isAuthenticating: authenticating
    };
};

export const authenticationSuccess = (token) => {
    return {
        type: authenticationActions.AUTHENTICATION_SUCCESS,
        accessToken: token
    };
};

export const authenticationFailure = (error) => {
    return {
        type: authenticationActions.AUTHENTICATION_FAILURE,
        error: error
    };
};

export const authenticate = (username, password) => {
    return async (dispatch) => {
        dispatch(setAuthenticating(true));
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/authenticate`, {
                username: username,
                password: password
            });

            // store token in session storage
            window.sessionStorage.setItem('rvadmintoken', res.data.access_token);
            dispatch(setAuthenticating(false));
            dispatch(authenticationSuccess(res.data.access_token));
        } catch (error) {
            dispatch(setAuthenticating(false));

            const errorCode = error.response ? error.response.data.error_code : null;

            switch (errorCode) {
                case 'invalid_credentials':
                    dispatch(errorMessage('Väärä käyttäjätunnus tai salasana'));
                    break;
                case 'not_authorized':
                    dispatch(errorMessage('Ei käyttöoikeutta'));
                    break;
                default:
                    dispatch(errorMessage('Tuntematon virhe kirjautumisessa'));
                    break;
            }
        }
    };
};

export const logout = () => {
    // delete token
    window.sessionStorage.removeItem('rvadmintoken');

    return {
        type: authenticationActions.LOGOUT
    };
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case authenticationActions.SET_AUTHENTICATING:
            return Object.assign({}, state, {
                isAuthenticating: action.isAuthenticating
            });

        case authenticationActions.AUTHENTICATION_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                accessToken: action.accessToken,
                authenticationError: null
            });

        case authenticationActions.AUTHENTICATION_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                accessToken: null,
                authenticationError: action.error
            });

        case authenticationActions.LOGOUT:
            return Object.assign({}, state, {
                isAuthenticated: false,
                accessToken: null,
                authenticationError: null
            });

        default:
            return state;
    }
};

export default authenticationReducer;
