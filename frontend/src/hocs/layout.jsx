import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { check_authentication, load_user} from '../actions/auth';

const Layout = ({check_authentication, load_user, children}) => {

    
    useEffect(()=>{
        check_authentication();
        load_user();
    },[])



    return (  
        <div>
            <Navbar />
            {children}
        </div>
    );
}
 
export default connect(null, {check_authentication, load_user})(Layout);