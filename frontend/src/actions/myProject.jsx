import axios from 'axios';
import {
    PROFILE_CHANGE_SUCCESS,
    PROFILE_CHANGE_FAIL
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