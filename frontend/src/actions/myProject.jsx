import axios from 'axios';
import {
    PROFILE_CHANGE_SUCCESS,
    PROFILE_CHANGE_FAIL,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_FAIL,
    GET_CONVO_FAIL,
    GET_CONVO_SUCCESS

} from "./types";

axios.defaults.withCredentials = true;


export const change_profile_data = (data) => async dispatch => {

    if(localStorage.getItem('access'))
    {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body = {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
        }
        try{
            await axios.put(`${import.meta.env.VITE_API_URL}/change_data/${data.id}`,body,config)
            dispatch({
                type: PROFILE_CHANGE_SUCCESS,
                payload: body
            })

        }catch(e){
            console.log(e)
            dispatch({
                type: PROFILE_CHANGE_FAIL
            })
        }
    }
}

export const get_users = () => async dispatch => {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: res.data
        })
    }catch(e){
        console.log(e)
        dispatch({
            type: GET_USERS_FAIL
        })
    }
}

export const add_contact = (id_user, contact_email) => async dispatch => {
    try{

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body = {
            email: contact_email
        }
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/add_contact/${id_user}`,body,config);
        dispatch({
            type: ADD_CONTACT_SUCCESS,
            payload: res.data
        })
    }catch(e){
        console.log(e)
        dispatch({
            type: ADD_CONTACT_FAIL
        })
    }
}

export const get_convo = (id, contact_email) => async dispatch => {

}

