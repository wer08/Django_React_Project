import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { check_authentication, load_user, googleAuthenticate } from '../actions/auth';
import { useLocation } from 'react-router-dom';
import querystring from 'querystring'
const Layout = (props) => {

    let location = useLocation();
    
    useEffect(()=>{
        const values = new URLSearchParams(location.search);
        const state = values.get('state') ? values.get('state') : null;
        const code = values.get('code') ? values.get('code') : null

        if(state && code)
        {
            props.googleAuthenticate(state,code)
        }else{
            props.check_authentication();
            props.load_user();
    
        }

    },[location])



    return (  
        <div>
            <Navbar />
            {props.children}
        </div>
    );
}
 
export default connect(null, {check_authentication, load_user, googleAuthenticate})(Layout);