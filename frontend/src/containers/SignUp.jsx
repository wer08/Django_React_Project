import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux';
import { sign_up } from "../actions/auth";
import axios from "axios";

const SignUp = ({sign_up, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        password: "",
        re_password: ""
    })
    const [requestSent, setRequestSent]= useState(false)
    const { email, first_name, last_name, phone, password, re_password } = formData
    const onChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e=>{

        e.preventDefault();
        if (password === re_password)
        {
            sign_up(email, first_name,last_name, phone, password, re_password);
            setRequestSent(true);
        }
    }
    const continueWithGoogle = async () => {
        try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:5173/google`)
            window.location.replace(res.data.authorization_url)
        }catch(e){
            console.log(e)
        }
    }

    const continueWithFacebook = async () => {
        try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/o/facebook/?redirect_uri=http://localhost:5173/facebook`)
            window.location.replace(res.data.authorization_url)
        }catch(e){
            console.log(e)
        }
    }

    //Is the User created ?
    //Navigate to Login
    if (requestSent)
    {
        return <Navigate to='/login'></Navigate>
    }

    if(isAuthenticated)
    {
        return <Navigate to="/" />
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
                    <input className="form-control mb-2" type='text' placeholder="First Name" name="first_name" value={first_name} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='text' placeholder="Last Name" name="last_name" value={last_name} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='tel' placeholder="Phone Number ( ***-***-*** )" name="phone" value={phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Password" name="password" minLength='6' value={password} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Confirm Password" name="re_password" minLength='6' value={re_password} onChange={e=>onChange(e)} required />
                </div>
                <button className="btn btn-primary" type='submit'>Sign Up</button>
                <div>
                    <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
                        Continue with Google
                    </button>
                </div>
                <div>
                    <button className="btn btn-primary mt-3" onClick={continueWithFacebook}>
                        Continue with Facebook
                    </button>
                </div>

                <p className="mt-3">
                    Already an user ? <Link to='/login'>Sign In</Link>
                </p>
            </form>
        </div>
     );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{sign_up})(SignUp);
