import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { add_message, get_convo } from "../actions/myProject";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import { checkText } from "smile2emoji";




const Conversation = ({messages,user, receiver, add_message, get_convo, numberOfPages}) => {

    const [message, setMessage] = useState("")
    const [isHidden, setIsHidden] = useState(true)
    const [counter, setCounter] = useState(1)
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
        add_message(user.id, receiver, message)
        setMessage("")
        setCounter(1)
    }

    const onEmojiClick = e=>{
        setMessage(`${message} ${e.emoji}`)
    }

    const onFocus = ()=>{
        setIsHidden(true)
    }

    const onChange = (e)=>{
        const text = checkText(e.target.value)
        setMessage(text)
    }

    const onScroll = e => {
        if(e.target.scrollTop == 0)
        {
            console.log(counter, numberOfPages)
            if (counter >= numberOfPages){
                return
            }
            get_convo(user.id,receiver,counter+1);
            setCounter(counter => counter+1)
        }
    }


    return ( 
        <div className="convo-wrapper mt-3" style={{display: 'flex', flexDirection: 'column', position: 'realtive'}}>
            {messages?<div className="list-group border convo pt-3" onScroll={(e)=>onScroll(e)} >{conversation()}</div>:<div className="d-flex justify-content-center align-items-center border convo"><h1 className="emptyConvo">Select contact to open conversation</h1></div> }
            {messages && <>
            <div style={{position: 'absolute', top: '180px'}} className={isHidden ? 'emojiPicker' : ""}><EmojiPicker onEmojiClick={e=>onEmojiClick(e)}/></div>                
            <form className="form-group new_message_form " onSubmit={e=>onSubmit(e)} onFocus={()=>onFocus()}>
                <input className="form-control new_message " type="search" autoComplete="off" name="new_message" value={message} placeholder="Aa" onChange={(e)=>onChange(e)}></input>
                <FontAwesomeIcon 
                icon={faIcons} 
                className='icon emoji p-2'
                data-bs-toggle="tooltip" 
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Show emojis"
                data-bs-trigger='hover'
                onClick={onClick}/>
            </form>
            
            </>}
        </div>
    );
}
const mapStateToProps = (state) => ({
    messages: state.auth.messages,
    user: state.auth.user,
    receiver: state.auth.receiver,
    numberOfPages: state.auth.numberOfPages
})
export default connect(mapStateToProps,{add_message, get_convo})(Conversation);