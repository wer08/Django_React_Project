import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { facebookAuthenticate} from '../actions/auth';
import { Link, useLocation } from 'react-router-dom';

const Facebook = ({facebookAuthenticate, isAuthenticated}) => {

    let location = useLocation()
    
    useEffect(()=>{
        const values = new URLSearchParams(location.search);
        const state = values.get('state') ? values.get('state') : null;
        const code = values.get('code') ? values.get('code') : null
        if(state&&code){
            facebookAuthenticate(state,code)
        }

    },[location])



    const logged = () => {
        return(
            <h2>You are logged</h2>
        )
    }
    
    const not_logged = () => {
        return ( 
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to messenger</h1>
                    <p className="lead">This is a messenger</p>
                    <hr className="my-4" />
                    <p>Click the LogIn button to login</p>
                    <p className="lead">
                        <Link className="btn btn-primary btn-lg" to="/login" role="button">LogIn</Link>
                    </p>
                </div>
            </div>
            
         );
    }

    return (
        <>
        {isAuthenticated ? logged() : not_logged()}
        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
 
export default connect(mapStateToProps, {facebookAuthenticate})(Facebook);