import axios from 'axios';
import {
    PROFILE_CHANGE_SUCCESS,
    PROFILE_CHANGE_FAIL,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_FAIL,
    GET_CONVO_FAIL,
    GET_CONVO_SUCCESS,
    ADD_MESSAGE_FAIL,
    ADD_MESSAGE_SUCCESS,
    GET_CONTACTS_FAIL,
    GET_CONTACTS_SUCCESS,
    GET_STATUSES_FAIL,
    GET_STATUSES_SUCCESS,
    DELETE_MESSAGE_FAIL,
    DELETE_MESSAGE_SUCCESS,
} from "./types";

axios.defaults.withCredentials = true;


export const change_profile_data = (data) => async dispatch => {

    if(localStorage.getItem('access'))
    {
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        const json_body = JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
        })

        const formData = new FormData();
        formData.append("picture", data.profile_pic)
        formData.append("body", json_body)

        try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/change_data/${data.id}`,formData,config)
            dispatch({
                type: PROFILE_CHANGE_SUCCESS,
                payload: res.data
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

export const get_contacts = (id) => async dispatch => {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/get_contacts?id=${id}`);
        dispatch({
            type: GET_CONTACTS_SUCCESS,
            payload: res.data
        })
    }catch(e){
        console.log(e)
        dispatch({
            type: GET_CONTACTS_FAIL
        })
    }
}

export const get_statuses = (id) => async dispatch => {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/get_statuses?id=${id}`);
        dispatch({
            type: GET_STATUSES_SUCCESS,
            payload: res.data
        })
    }catch(e){
        console.log(e)
        dispatch({
            type: GET_STATUSES_FAIL
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

export const get_convo = (user_id, contact_id, page) => async dispatch => {
    console.log('get_convo')
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/get_convo?user_id=${user_id}&contact_id=${contact_id}&page=${page}`);
        dispatch({
            type: GET_CONVO_SUCCESS,
            payload: res.data
        })
    }catch(e){
        console.log(e)
        dispatch({
            type: GET_CONVO_FAIL
        })
    }
}

export const add_message = (id, contact_id, text) => async dispatch => {

    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body = {
            contact_id: contact_id,
            pk: id,
            text: text
        }
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/add_message`,body,config);
        dispatch({
            type: ADD_MESSAGE_SUCCESS
        })

        dispatch(get_convo(id, contact_id, 1))
    }catch(e){
        console.log(e);
        dispatch({
            type: ADD_MESSAGE_FAIL
        })
    }
}

export const delMessage = (message_id,user_id, contact_id) => async dispatch => {
    try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/delete_message/${message_id}`)

        dispatch({
            type: DELETE_MESSAGE_SUCCESS
        })
        dispatch(get_convo(user_id, contact_id))
    }
    catch{
        dispatch({
            type: DELETE_MESSAGE_FAIL
        })
    }

}


