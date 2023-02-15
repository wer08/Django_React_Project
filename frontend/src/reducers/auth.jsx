import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCES
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
        case LOGIN_SUCCES:
            localStorage.setItem('access',payload.access)
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
            return{
                ...state,
                user: null
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh')
            return{
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }
        default:
            return state
    }
}