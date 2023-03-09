import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { check_authentication, load_user} from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_signals, get_users, get_statuses } from '../actions/myProject';

const Layout = ({check_authentication, load_user, children, get_users, get_signals, get_statuses, signals, user, users}) => {

    const [signalsLength, setSignalsLength] = useState(null)
    const [isNew, setIsNew] = useState(false)
    
    const notify = (message) => {
        const user = users.find(user=>user.id == message.sender)
        toast.info(<><p className='fw-bold ms-2'>
            {user.first_name} {user.last_name}</p>
            <p className='ms-2'>{message.file ? <img src={`${import.meta.env.VITE_API_URL}/${message.file}`} alt="Can't display" width="50" height="50" className="me-2"></img> : message.body}</p>
            </>);
    }
    useEffect(()=>{
        check_authentication();
        load_user();
        get_users();
        if(signals){
            setSignalsLength(signals.length)
        }
        const interval = setInterval(() => {
            get_signals();
          }, 500);
        return () => clearInterval(interval);
    },[])

    useEffect(()=>{
        if(signals && signalsLength < signals.length)
        {
            setIsNew(true)
        }
        signals && setSignalsLength(signals.length)
    },[signals])

    useEffect(()=>{
        if(isNew && user && signals[signals.length -1] && signals[signals.length -1].receiver == user.id){
            notify(signals[signals.length -1]);
        }
        user && get_statuses(user.id)
    },[signalsLength])







    return (  
        <div style={{position: 'relative',height: '87vh'}}>
            <Navbar />
            <ToastContainer />
            {children}
        </div>
    );
}
const mapStateToProps = state => ({
    signals: state.auth.signals,
    user: state.auth.user,
    users: state.auth.users
})
 
export default connect(mapStateToProps, {check_authentication, load_user, get_users, get_signals, get_statuses})(Layout);