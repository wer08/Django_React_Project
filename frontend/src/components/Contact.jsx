import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { get_convo, get_files } from "../actions/myProject";
import Modal from "react-modal/lib/components/Modal";
import FileBox from "./FileBox";
import Image from "./Image";


const Contact = ({receiver,contact,status,user, get_convo, get_files, files}) => {
    const [isShown, setIsShown] = useState(false)
    const [currentStatus, setCurrentStatus] = useState(status)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showPicture,setShowPicture] = useState(false)
    const [currentPicture, setCurrentPicture] = useState("")
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

    const handleOnClick = e => {
        setCurrentPicture(e.currentTarget.name)
      }

    const onFolderClick = (e) => {
        const filesMessages = files
        const id = e.target.closest('button').name
        get_files(user.id,id)
        setIsModalOpen(true)
    }
    const closeModal = ()=>{
        setIsModalOpen(false)
        setCurrentPicture("")
        setShowPicture(false)
    }

    const modalStyles = showPicture ? 
      {
        content: {
            position: 'absolute',
            border: 'none',
            borderRadius: '25px',
            boxShadow: '0px 0px 10px 10px #363535',
            padding: '0px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            animation: 'fadeIn 1s ease forwards',
            overflowX: 'hidden'

          },
          overlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0,0,0,0.8)',
            animation: 'fadeIn 1s ease forwards'
          }
      } :
      {
        content: {
          top: '10%',
          left: '20%',
          right: 'auto',
          bottom: '10%',
          borderRadius: '25px',
          boxShadow: '0px 0px 10px 10px #363535',
          backgroundColor: 'white',
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            animation: 'fadeIn 1s ease forwards'


        }
      }

      const otherPicturesStyle = {
        position: 'absolute',
        top: '90%',
        left: '110%',
        transform: 'translate(50%,0%)',
        width: '10%',
        height: '10%',
        display: 'flex',
        padding: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: '9999',

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
        {showPicture?
            <Image imageUrl={currentPicture} setShowPicture={setShowPicture} setCurrentPicture={setCurrentPicture}/>
            :<FileBox setShowPicture={setShowPicture} setCurrentPicture={setCurrentPicture}/>}
    </Modal>
    {isModalOpen && showPicture && <div style={otherPicturesStyle}>{files?.map((file,idx)=>
            <div key={idx}>
                <img 
                src={`${import.meta.env.VITE_API_URL}/${file}`} 
                className='fileChoice'
                name={`${import.meta.env.VITE_API_URL}/${file}`}
                onClick={e=>handleOnClick(e)}
                ></img>
            </div>)}</div>}
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