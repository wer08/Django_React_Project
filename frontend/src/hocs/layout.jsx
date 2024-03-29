import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { check_authentication, load_user} from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";
import 'react-toastify/dist/ReactToastify.css';
import { get_users, get_statuses, get_convo } from '../actions/myProject';
import {Helmet} from "react-helmet"



const SOCKET_URL = 'http://localhost:8080';
const Layout = ({check_authentication, load_user, children, get_users, user,get_statuses, users, get_convo, receiver}) => {

    const [chatMessage, setChatMessage] = useState("")
    const [newMessage, setNewMessage] = useState(false)
    const [sender, setSender] = useState(null)
    const socket = io(SOCKET_URL);
    
    const notify = (message) => {
        console.log(newMessage)
        const user = users.find(user=>user.id == message.sender)
        setSender(user)
        const body = message.body.length > 50 ? `${message.body.slice(0,50)}...` : message.body
        toast.info(<><p className='fw-bold ms-2'>
            {user.first_name} {user.last_name}</p>
            <p className='ms-2'>{message.isFile ? <img src={message.image} alt={`${import.meta.env.VITE_API_URL}/${message.image}`} width="50" height="50" className="me-2"></img> : body}</p>
            </>)
    }
    useEffect(()=>{
        document.addEventListener('visibilitychange',()=>{
            if(document.visibilityState === 'visible'){
                setNewMessage(false);
            }
        })
        check_authentication();
        load_user();
        get_users();
        user && get_statuses(user.id);
        socket.connect();

        return ()=>{
            socket.disconnect();
        }
    },[])

    useEffect(()=>{
        user && socket.on('chat_message',(e)=>{
            setChatMessage(e)
            if (e.isFile){
                const blob = new Blob([e.body], {type: e.mimeType})
                const message = {
                    ...e,
                    image: URL.createObjectURL(blob)
                }
                get_convo(user.id,receiver,e.page);
                user.id != e.sender && notify(message)
            }
            else
            {
                get_convo(user.id,receiver,e.page);
                user.id != e.sender && notify(e)
            }
            setNewMessage(true)
        })

        return ()=>{
            socket.off('chat_message', setChatMessage(""))
        }

    },[chatMessage])


    return (  
        <div style={{position: 'relative',height: '87vh'}}>
            <Helmet>
                {newMessage ? <title>{`${sender?.first_name}`} {`${sender?.last_name}`} send a message</title> : <title>Communicator</title>}
            </Helmet>
            <Navbar />
            <ToastContainer />
            {children}
        </div>
    );
}
const mapStateToProps = state => ({
    user: state.auth.user,
    users: state.myProject.users,
    receiver: state.myProject.receiver
})
 
export default connect(mapStateToProps, {check_authentication, load_user, get_users, get_statuses, get_convo})(Layout);