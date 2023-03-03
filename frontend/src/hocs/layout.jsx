import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { check_authentication, load_user} from '../actions/auth';
import { get_users } from '../actions/myProject';

const Layout = ({check_authentication, load_user, children, get_users}) => {

    
    useEffect(()=>{
        check_authentication();
        load_user();
        get_users();
    },[])



    return (  
        <div style={{position: 'relative',height: '87vh'}}>
            <Navbar />
            {children}
        </div>
    );
}
 
export default connect(null, {check_authentication, load_user, get_users})(Layout);