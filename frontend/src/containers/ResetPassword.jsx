import { useState } from "react";
import { Navigate } from "react-router-dom";
import {connect} from 'react-redux';
import { password_reset } from "../actions/auth";


const ResetPassword = ({password_reset}) => {
    const [formData, setFormData] = useState({
        email: "",
    })
    const [requestSent, setRequestSent] = useState(false)
    const { email } = formData
    const onChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e=>{
        console.log('sumbit')
        e.preventDefault();
        password_reset(email);
        setRequestSent(true)
    }

    if(requestSent){
        return <Navigate to='/' />
    }

    return ( 
        <div className="container mt-5">
            <h1>Reset your password:</h1>

            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input className="form-control mb-2" type='email' placeholder="Email" name="email" value={email} onChange={e=>onChange(e)} required />
                </div>
                <button className="btn btn-primary" type='submit'>Reset Password</button>
            </form>

        </div>
     );
};

export default connect(null,{password_reset})(ResetPassword);
