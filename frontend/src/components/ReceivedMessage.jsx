import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Options from "./Options";
const ReceivedMessage = ({message, users}) => {
    const [picture, setPicture] = useState(null)
    const [isShown, setIsShown] = useState(false)
    const [isFile, setIsFile] = useState(false)
    const messageRef = useRef(null)

    const date = new Date(message.date_of_creation).toLocaleTimeString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    const onMouseOver = ()=>{
        setIsShown(true)
    }
    const onMouseLeave = ()=>{
        setIsShown(false)
    }

    useEffect(()=>{
        const sender = users.find(user => user.id = message.sender)
        setPicture(sender.profile_pic)
        message.file && setIsFile(true)
        const messageTool = new bootstrap.Tooltip(messageRef.current)
    },[])

    return (  
        <>
        
        <img src={picture} alt="" width="40" height="40" className="ms-2 img mt-auto"></img>
        <div 
            className="me-auto  ms-3 received p-2"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={date}
            ref={messageRef}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}>
            <div>
            {message.file ? <img src={`${import.meta.env.VITE_API_URL}/${message.file}`} alt="Can't display" width="150" height="150" className="me-2"></img>  : message.body}
            </div>
        </div>
        <div onMouseOver={()=>onMouseOver()} onMouseLeave={()=>onMouseLeave()} className={ isShown ? "d-flex justify-content-end align-items-center container me-auto" : "d-flex justify-content-end align-items-center container me-auto hidden"}>
            <Options message={message} isFile={isFile} isSent={false}/>
        </div>
        </>
    );
}
const mapStateToProps = state => ({
    users: state.myProject.users
})
 
export default connect(mapStateToProps,{})(ReceivedMessage);