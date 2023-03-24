import {
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
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
    GET_FILES_FAIL,
    GET_FILES_SUCCESS,
} from "../actions/types";

const initialState = {
    users: null,
    messages: null,
    files: null,
    receiver: null,
    contacts: null,
    statuses: null,
    numberOfPages: null,
}

export default (state = initialState, action) => {
    const {type,payload} = action;

    switch(type){

        case GET_USERS_SUCCESS:
            return{
                ...state,
                users: payload
            }
        case GET_CONVO_SUCCESS:
            return{
                ...state,
                messages: payload.messages,
                receiver: payload.receiver,
                numberOfPages: payload.number_of_pages
            }
        case GET_FILES_SUCCESS:
            return{
                ...state,
                files: payload
            }
        case GET_CONTACTS_SUCCESS:
            return{
                ...state,
                contacts: payload
            }
        case GET_STATUSES_SUCCESS:
            return{
                ...state,
                statuses: payload
            }
        case GET_USERS_FAIL:
        case GET_CONVO_FAIL:
        case ADD_MESSAGE_FAIL:
        case ADD_MESSAGE_SUCCESS:
        case GET_CONTACTS_FAIL:
        case DELETE_MESSAGE_FAIL:
        case DELETE_MESSAGE_SUCCESS:
        case GET_STATUSES_FAIL:
        case GET_FILES_FAIL:
            return{
                ...state,
            }
        default:
            return state
    }
}