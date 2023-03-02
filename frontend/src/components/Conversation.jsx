import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { add_message } from "../actions/myProject";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";



const Conversation = ({messages,user, receiver, add_message}) => {

    const [message, setMessage] = useState("")
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView()
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);


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

    const onSubmit = (e) => {
        e.preventDefault()
        add_message(user.id, receiver, message)
        setMessage("")
    }


    return ( 
        <div className="me-5 mt-3">
            {messages?<div className="list-group border convo pt-3">{conversation()}</div>:<div className="d-flex justify-content-center align-items-center border convo"><h1 className="emptyConvo">Select contact to open conversation</h1></div> }
            {messages && <form className="form-group new_message " onSubmit={e=>onSubmit(e)}>
                <input className="form-control" type="search" value={message} onChange={(e)=>setMessage(e.target.value)}></input>
            </form>}
        </div>
    );
}
const mapStateToProps = (state) => ({
    messages: state.auth.messages,
    user: state.auth.user,
    receiver: state.auth.receiver
})
export default connect(mapStateToProps,{add_message})(Conversation);