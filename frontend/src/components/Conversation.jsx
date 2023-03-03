import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { add_message } from "../actions/myProject";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";



const Conversation = ({messages,user, receiver, add_message}) => {

    const [message, setMessage] = useState("")
    const [isHidden, setIsHidden] = useState(true)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView()
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);

    const onClick = () => {
        setIsHidden(!isHidden)
    }


    const conversation = () => {
        if (messages && user){
            return(
                <>
                {messages.map((message)=><div className="d-flex" key={message.id}>
                    {
                    (message.sender == user.id)?
                    <SentMessage message={message}/>
                        :
                    <ReceivedMessage message={message}/>
                    }
                </div>)}
                <div ref={messagesEndRef} />
                </>
            )
        }
    }

    useEffect(()=>{
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    },[])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('submitting')
        add_message(user.id, receiver, message)
        setMessage("")
    }

    const onEmojiClick = e=>{
        console.log(e)
        setMessage(`${message} ${e.emoji}`)
    }


    return ( 
        <div className="me-5 mt-3">
            {messages?<div className="list-group border convo pt-3" >{conversation()}</div>:<div className="d-flex justify-content-center align-items-center border convo"><h1 className="emptyConvo">Select contact to open conversation</h1></div> }
            {messages && <>                
            <form className="form-group new_message_form " onSubmit={e=>onSubmit(e)}>          
                {/* <div className={isHidden ? 'emojiPicker' : ""}><EmojiPicker onEmojiClick={e=>onEmojiClick(e)}/></div>
                <FontAwesomeIcon 
                icon={faIcons} 
                className='icon emoji p-2'
                data-bs-toggle="tooltip" 
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Show emojis"
                data-bs-trigger='hover'
                onClick={onClick}/> */}
                <input className="form-control new_message " type="search" name="new_message" value={message} placeholder="Aa" onChange={(e)=>setMessage(e.target.value)}></input>

            </form></>}
        </div>
    );
}
const mapStateToProps = (state) => ({
    messages: state.auth.messages,
    user: state.auth.user,
    receiver: state.auth.receiver
})
export default connect(mapStateToProps,{add_message})(Conversation);