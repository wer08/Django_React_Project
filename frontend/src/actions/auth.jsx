import axios from 'axios';
import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCES,
    AUTHENTICATION_FAIL,
    AUTHENTICATION_SUCCESS,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_FAIL,
    GOOGLE_AUTH_SUCCESS,
    FACEBOOK_AUTH_SUCCES,
    FACEBOOK_AUTH_FAIL
} from "./types";

axios.defaults.withCredentials = true;



export const password_reset = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        email: email
    })
    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/reset_password/`,body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
    }catch(e){
        console.log(e)
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
}

export const password_reset_confirm = (uid,token,new_password,re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        uid: uid,
        token: token,
        new_password: new_password,
        re_new_password: re_new_password
    })


    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/reset_password_confirm/`,body,config)
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
            payload: res.data
        })

    }catch(e){
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}


export const check_authentication = () => async dispatch => {
    if (localStorage.getItem('access'))
    {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        })

        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/verify/`,body,config)
            if (res.data.code !== 'token_not_valid' )
            {            
                dispatch({
                type: AUTHENTICATION_SUCCESS
            })} else {
                dispatch({
                    type: AUTHENTICATION_FAIL
                })
            }

        }catch(e){
            dispatch({
                type: AUTHENTICATION_FAIL
            })
        }


    }
    else {
        dispatch({
            type: AUTHENTICATION_FAIL
        })
    }
}

export const sign_up = (email,first_name,last_name,phone,password,re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email,first_name,last_name,phone, password,re_password});
    try{
        res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/`,body,config)
        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: res.data
        })
    }catch(e){
        dispatch({
            type: SIGN_UP_FAIL
        })
    }
}

export const activate = (uid,token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({uid,token});

    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/users/activation/`,body,config)
        dispatch({
            type: ACTIVATION_SUCCESS
        })
    }catch(e){
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access'))
    {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };

        try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users/me/`,config)
            dispatch({
                type: LOAD_USER_SUCCES,
                payload: res.data
            })
        } catch(e){
            dispatch({
                type: LOAD_USER_FAIL
            })
        }
    }
    else{
        dispatch({
            type: LOAD_USER_FAIL
        })
    }

}




export const login = (email,password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt/create/`,body,config)
        dispatch({
            type: LOGIN_SUCCES,
            payload: res.data
        });

        dispatch(load_user());
    } catch(e){
        console.log(e)
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const facebookAuthenticate = (state,code) => async dispatch => {
    
    if (state && code && !localStorage.getItem('access'))
    {

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const details = {
            'state': state,
            'code': code
        };
        const formBody = Object.keys(details).map(key => encodeURIComponent(key)+"="+encodeURIComponent(details[key])).join('&');
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/o/facebook/?${formBody}`,config)

            dispatch({
                type: FACEBOOK_AUTH_SUCCES,
                payload: res.data
            });

            dispatch(load_user());
        }catch(e){
            console.log(e)
            dispatch({
                type: FACEBOOK_AUTH_FAIL,
            })
        }
    }
}

export const googleAuthenticate = (state,code) => async dispatch => {

    if (state && code && !localStorage.getItem('access'))
    {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const details = {
            'state': state,
            'code': code
        };
        const formBody = Object.keys(details).map(key => encodeURIComponent(key)+"="+encodeURIComponent(details[key])).join('&');
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/o/google-oauth2/?${formBody}`,config)

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());
        }catch(e){
            console.log(e)
            dispatch({
                type: GOOGLE_AUTH_FAIL,
            })
        }
    }
}

export const logout = () => dispatch => {

    dispatch({
        type: LOGOUT
    });
}