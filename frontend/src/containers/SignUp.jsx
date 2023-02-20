import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux';
import { sign_up } from "../actions/auth";


const SignUp = ({sign_up}) => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        re_password: ""
    })
    const [requestSent, setRequestSent]= useState(false)
    const { email, name, phone, password, re_password } = formData
    const onChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e=>{

        e.preventDefault();
        sign_up(email, name, phone, password, re_password);
        setRequestSent(true);

    }

    //Is the User created ?
    //Naviagte to Login
    if (requestSent)
    {
        return <Navigate to='/login'></Navigate>
    }

    return ( 
        <div className="container mt-5">
            <h1>Sign Up</h1>
            <p>Create new account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input className="form-control mb-2" type='email' placeholder="Email" name="email" value={email} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='name' placeholder="Name" name="name" value={name} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='tel' placeholder="Phone Number" name="phone" value={phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Password" name="password" minLength='6' value={password} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Confirm Password" name="re_password" minLength='6' value={re_password} onChange={e=>onChange(e)} required />
                </div>
                <button className="btn btn-primary" type='submit'>Sign Up</button>
            </form>
        </div>
     );
};
 
export default connect(null,{sign_up})(SignUp);
