import {combineReducers} from 'redux';
import auth from './auth';
import myProject from './myProject';

export default combineReducers({
    auth,
    myProject
});
