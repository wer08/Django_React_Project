import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import {connect} from 'react-redux';
import { password_reset_confirm } from "../actions/auth";


const ResetPasswordConfirm = ({ password_reset_confirm}) => {
    
    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: ""
    })
    const [requestSent, setRequestSent] = useState(false)
    const { new_password, re_new_password } = formData

    const routeParams = useParams();

    const onChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e=>{
        const uid = routeParams.uid;
        const token = routeParams.token

        e.preventDefault();
        password_reset_confirm(uid,token,new_password,re_new_password);
        setRequestSent(true)
    }

    if(requestSent){
        return <Navigate to='/login' />
    }

    return ( 
        <div className="container mt-5">
            <h1>Reset your password:</h1>

            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="New Password" name="new_password" value={new_password} onChange={e=>onChange(e)} minLength='6' required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Confirm new password" name="re_new_password" value={re_new_password} onChange={e=>onChange(e)} minLength='6' required />
                </div>
                <button className="btn btn-primary" type='submit'>Confirm</button>
            </form>

        </div>
     );
};

export default connect(null,{password_reset_confirm})(ResetPasswordConfirm);
