import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCES,
    AUTHENTICATION_FAIL,
    AUTHENTICATION_SUCCESS,
    LOGOUT,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    GOOGLE_AUTH_FAIL,
    GOOGLE_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCES,
    PROFILE_CHANGE_FAIL,
    PROFILE_CHANGE_SUCCESS,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS
} from "../actions/types";

const initialState = {
    access: localStorage.getItem('access'),
    refresh : localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
}

export default (state = initialState, action) => {
    const {type,payload} = action;

    switch(type){
        case SIGN_UP_SUCCESS:
        case AUTHENTICATION_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATION_SUCCESS:
            return{
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCES:
        case FACEBOOK_AUTH_SUCCES:
        case GOOGLE_AUTH_SUCCESS:
            localStorage.setItem('access',payload.access);
            localStorage.setItem('refresh',payload.refresh);
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOAD_USER_SUCCES:
            return{
                ...state,
                user: payload
            }
        case LOAD_USER_FAIL:
            localStorage.removeItem('access')
            return{
                ...state,
                access: null,
                user: null
            }
        case SIGN_UP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case FACEBOOK_AUTH_FAIL:
        case GOOGLE_AUTH_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }
        case PROFILE_CHANGE_SUCCESS:
            return{
                ...state,
                user: {...state.user, first_name: payload.first_name, last_name: payload.last_name, phone: payload.phone}
            }
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PROFILE_CHANGE_FAIL:
        case GET_USERS_FAIL:
        case GET_USERS_SUCCESS:
            return{
                ...state,
            }
        default:
            return state
    }
}