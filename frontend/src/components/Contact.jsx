import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { get_convo, get_files } from "../actions/myProject";

const Contact = ({receiver,contact,status,user, get_convo, get_files, files}) => {
    const [isShown, setIsShown] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(status)

    const handleOnMouseOver = (e)=>{
        setIsShown(true)
    }

    const handleOnMouseLeave = (e) =>{
        setIsShown(false)
    }

    const onClick = (e) => {
        const id = e.currentTarget.name
        setCurrentStatus(true)
        get_convo(user.id, id, 1)
    }

    const onFolderClick = (e) => {
        const filesMessages = files
        const id = e.target.closest('button').name
        get_files(user.id,id)
        console.log(filesMessages)
    }

    return (
    <button 
        className={receiver==contact.id?"list-group-item click contact text-start active_conv mb-2":"list-group-item click contact text-start mb-2"}  
        value={contact.email} 
        onClick={onClick}
        onMouseOver={(e)=>handleOnMouseOver(e)}
        onMouseLeave={(e)=>handleOnMouseLeave(e)}
        name={contact.id}>
            <img src={contact.profile_pic} alt="Profile pic" width="40" height="40" className="me-2 img"></img>
            {currentStatus ? 
            <><span className="contactInfo">{contact.first_name} {contact.last_name}</span>{isShown && <FontAwesomeIcon icon={faFolderOpen} className="folderIcon" onClick={e=>onFolderClick(e)}/>}</>: 
            <><span className="fw-bold contactInfo" style={{pointerEvents: 'none'}}>{contact.first_name} {contact.last_name}</span>{isShown && <FontAwesomeIcon icon={faFolderOpen} className="folderIcon" onClick={onFolderClick}/>}<span className="dot ms-3"></span></>}
    </button>
      );
}
const mapStateToProps = (state)=>({
    files: state.auth.files
})
 
export default connect(mapStateToProps,{get_convo,get_files})(Contact);