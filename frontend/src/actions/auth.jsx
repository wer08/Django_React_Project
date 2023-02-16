import axios from 'axios';
import {
    LOGIN_SUCCES,
    LOGIN_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCES,
    AUTHENTICATION_FAIL,
    AUTHENTICATION_SUCCESS,
    LOGOUT
} from "./types";


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
            console.log(body)
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
            console.log(e)
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
        console.log("here")
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

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT

    });
}