import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { add_message, get_convo, get_signals } from "../actions/myProject";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons, faPlus } from "@fortawesome/free-solid-svg-icons";
import { checkText } from "smile2emoji";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Conversation = ({messages,user, receiver, add_message, get_convo, numberOfPages, signals}) => {

    const [message, setMessage] = useState("")
    const [isHidden, setIsHidden] = useState(true)
    const [counter, setCounter] = useState(1)
    const [file, setFile] = useState(null)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView()
    }

    let signalsLength = signals ? signals.length : 0

    useEffect(()=>{
        scrollToBottom()
    },[messages])
    
    useEffect(()=>{
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    },[])

    useEffect(()=>{
        if(file){
            add_message(user.id, receiver, message, file)
        }
    },[file])
    
    useEffect(()=>{
        
        user && get_convo(user.id,receiver,counter)
    },[signalsLength])
  
    const conversation = () => {
        if (messages && user){
            return(
                <>
                {messages.map((message)=><div className="d-flex" key={message.pk}>
                    {
                    (message.sender == user.id)?
                    <SentMessage message={message} page={counter}/>
                        :
                    <ReceivedMessage message={message}/>
                    }
                </div>)}
                <div ref={messagesEndRef} />
                </>
            )
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        add_message(user.id, receiver, message,null)
        setMessage("")
        setCounter(1)
    }

    const onChange = (e)=>{
        const text = checkText(e.target.value)
        setMessage(text)
    }

    const onScroll = e => {
        if(e.target.scrollTop == 0)
        {
            if (counter >= numberOfPages){
                return
            }
            get_convo(user.id,receiver,counter+1);
            setCounter(counter => counter+1)
        }
    }

    const handleFileChange = e => {
        if (!e.target.files) {
            return;
          }
      
        setFile(e.target.files[0]);
    }


    return ( 
        <div className="convo-wrapper mt-3" style={{display: 'flex', flexDirection: 'column', position: 'realtive'}}>
            <ToastContainer />
            {messages?<div className="list-group border convo pt-3" onScroll={(e)=>onScroll(e)} >{conversation()}</div>:<div className="d-flex justify-content-center align-items-center border convo"><h1 className="emptyConvo">Select contact to open conversation</h1></div> }
            {messages && <>
            <div style={{position: 'absolute', top: '180px'}} className={isHidden ? 'emojiPicker' : ""}><EmojiPicker onEmojiClick={e=>setMessage(`${message} ${e.emoji}`)}/></div>
            <input type='file' ref={inputRef} style={{display: 'none'}} onChange={e=>handleFileChange(e)} accept="image/png, image/gif, image/jpeg" />                  
            <form className="form-group new_message_form " onSubmit={e=>onSubmit(e)} onFocus={()=>setIsHidden(true)}>
                <input className="form-control new_message " type="search" autoComplete="off" name="new_message" value={message} placeholder="Aa" onChange={(e)=>onChange(e)}></input>
                <FontAwesomeIcon 
                icon={faPlus} 
                className='icon emoji p-2'
                data-bs-toggle="tooltip" 
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Add picture"
                data-bs-trigger='hover'
                onClick={()=>inputRef.current?.click()}
                />
                <FontAwesomeIcon 
                icon={faIcons} 
                className='icon emoji p-2'
                data-bs-toggle="tooltip" 
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Show emojis"
                data-bs-trigger='hover'
                onClick={()=>setIsHidden(!isHidden)}/>
            </form>
            
            </>}
        </div>
    );
}
const mapStateToProps = (state) => ({
    messages: state.auth.messages,
    user: state.auth.user,
    receiver: state.auth.receiver,
    numberOfPages: state.auth.numberOfPages,
    signals: state.auth.signals
})
export default connect(mapStateToProps,{add_message, get_convo})(Conversation);