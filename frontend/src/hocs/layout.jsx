import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { check_authentication, load_user } from '../actions/auth';

const Layout = (props) => {
    useEffect(()=>{
        props.check_authentication(),
        props.load_user()
    },[])
    return (  
        <div>
            <Navbar />
            {props.children}
        </div>
    );
}
 
export default connect(null, {check_authentication, load_user})(Layout);