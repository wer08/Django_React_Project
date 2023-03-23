import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { get_convo, get_files } from "../actions/myProject";
import Modal from "react-modal/lib/components/Modal";
import FileBox from "./FileBox";

const modalStyles = {
    content: {
      top: '10%',
      left: '20%',
      right: 'auto',
      bottom: '10%',
      borderRadius: '25px',
      boxShadow: '0px 0px 10px 10px #F2F3F5',
    },
    overlay:{
        
    }
  };

const Contact = ({receiver,contact,status,user, get_convo, get_files, files}) => {
    const [isShown, setIsShown] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(status)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const fileRef = useRef(null)

    useEffect(()=>{
        const tooltip = new bootstrap.Tooltip(fileRef.current)
    },[])

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
        setIsModalOpen(true)
    }
    const closeModal = ()=>{
        setIsModalOpen(false)
    }

    const contactName = currentStatus ? "contactInfo" : "fw-bold contactInfo";
    const visibility = isShown ? 'visible' : 'hidden';

    return (
    <>
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Files"
        style={modalStyles}
        ariaHideApp={false}
    >
        <FileBox />
    </Modal>
    <button 
        className={receiver==contact.id?"list-group-item click contact text-start active_conv mb-2":"list-group-item click contact text-start mb-2"}  
        value={contact.email} 
        onClick={onClick}
        onMouseOver={(e)=>handleOnMouseOver(e)}
        onMouseLeave={(e)=>handleOnMouseLeave(e)}
        name={contact.id}>
            <img src={contact.profile_pic} alt="Profile pic" width="40" height="40" className="me-2 img" ref={fileRef}></img>
            <><span className={contactName}>{contact.first_name} {contact.last_name}</span>{currentStatus ?"": <span className="dot ms-3"></span>}
            <FontAwesomeIcon 
                icon={faFolderOpen} 
                className="folderIcon"
                style={{visibility: visibility}}
                data-bs-toggle="tooltip" 
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Show files"
                ref={fileRef}
                onClick={(e)=>onFolderClick(e)}/>
            </>
    </button>
    </>
      );
}
const mapStateToProps = (state)=>({
    files: state.auth.files
})
 
export default connect(mapStateToProps,{get_convo,get_files})(Contact);