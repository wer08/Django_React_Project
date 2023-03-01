import { useState } from "react";
import { connect } from "react-redux";
import { add_message } from "../actions/myProject";

const Conversation = ({messages,user, receiver, add_message}) => {

    const [message, setMessage] = useState("")

    

    const conversation = () => {
        if (messages && user){
            console.log(messages)
            return(
                messages.map((message)=><div className={(message.sender == user.id)?"ms-auto list-group-item sent":"me-auto list-group-item received"} key={message.id}>{message.body}</div>)
            )
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        add_message(user.id, receiver, message)
        setMessage("")
    }


    return ( 
        <div className="me-5 mt-5">
            {messages?<div className="list-group">{conversation()}</div>:<h2>Select conversation</h2> }
            <form className="form-group" onSubmit={e=>onSubmit(e)}>
                <input className="form-control" type="text" value={message} onChange={(e)=>setMessage(e.target.value)}></input>
                <button type="submit" className="btn btn-primary mt-2 me-auto">Send</button>
            </form>
        </div>
    );
}
const mapStateToProps = (state) => ({
    messages: state.auth.messages,
    user: state.auth.user,
    receiver: state.auth.receiver
})
export default connect(mapStateToProps,{add_message})(Conversation);