import { useState } from "react";
import { connect } from "react-redux";
import { add_message } from "../actions/myProject";


const Conversation = ({messages,user, receiver, add_message}) => {

    const [message, setMessage] = useState("")

    

    const conversation = () => {
        if (messages && user){
            return(
                messages.map((message)=><div className={(message.sender == user.id)?"ms-auto list-group-item sent me-3":"me-auto  ms-3 list-group-item received"} key={message.id}>{message.body}</div>)
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
            {messages?<div className="list-group border convo pt-3">{conversation()}</div>:<div className="d-flex justify-content-center align-items-center border convo"><h1 className="emptyConvo">Select contact to open conversation</h1></div> }
            {messages && <form className="form-group new_message" onSubmit={e=>onSubmit(e)}>
                <input className="form-control" type="text" value={message} onChange={(e)=>setMessage(e.target.value)}></input>
                <button type="submit" className="btn btn-primary mt-2 me-auto">Send</button>
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