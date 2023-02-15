import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux';


const Login = () => {
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
        //login(email, password)

    }

    //Is the User authenticated ?
    //Naviagte to Home

    return ( 
        <div className="container mt-5">
            <h1>Sign In</h1>
            <p>Sign into you account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input className="form-control" type='email' placeholder="Email" name="email" value={email} onChange={e=>onChange(e)} required />
                </div>
                <div className="form-group">
                    <input className="form-control" type='password' placeholder="Password" name="password" minLength='6' value={password} onChange={e=>onChange(e)} required />
                </div>
                <button className="btn btn-primary mt-2" type='submit'>Login</button>
            </form>
            <p className="mt-3">
                Don't have an account ? <Link to='/signup'>SignUp</Link>
            </p>
            <p className="mt-3">
                Forgot your password ? <Link to='/reset_password'>Reset Password</Link>
            </p>
        </div>
     );
};
// const mapStateToProps = state => {
//     //is authenticated?
// };
 
export default connect(null,{})(Login);
