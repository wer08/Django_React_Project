import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux';
import { login } from "../actions/auth";
import axios from "axios";
import Modal from 'react-modal'


const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = formData
    const onChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e=>{

        e.preventDefault();
        login(email, password)

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
    //Is the User authenticated ?
    //Naviagte to Home
    if (isAuthenticated)
    {
        return <Navigate to='/'></Navigate>
    }

    return ( 
        <div className="container mt-5">
            <h1>Sign In</h1>
            <p>Sign into you account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input className="form-control mb-2" type='email' placeholder="Email" name="email" value={email} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control mb-2" type='password' placeholder="Password" name="password" minLength='6' value={password} onChange={e=>onChange(e)} required />
                </div>
                <button className="btn btn-primary" type='submit'>Login</button>
            </form>
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
                Don't have an account ? <Link to='/signup'>SignUp</Link>
            </p>
            <p className="mt-3">
                Forgot your password ? <Link to='/reset_password'>Reset Password</Link>
            </p>
        </div>
     );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
 
export default connect(mapStateToProps,{login})(Login);
