import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { delMessage } from "../actions/myProject";
import {saveAs} from "file-saver"

const Options = ({message, delMessage, page, isFile, isSent}) => {

    const downloadRef = useRef(null)
    const trashRef = useRef(null)
    useEffect(()=>{
        if(isSent){
            const trashTool = new bootstrap.Tooltip(trashRef.current)
        }

    },[isSent])

    useEffect(()=>{
        if (isFile){
            const Downloadtool = new bootstrap.Tooltip(downloadRef.current)
        }
    },[isFile])

    const deleteMessage = ()=>{
        bootstrap.Tooltip.getInstance(`#trash-${message.pk}`).hide();
        delMessage(message.pk, message.sender, message.receiver,page)
    }


    return ( 
        <div className={isSent ? "options p-2" : "options p-2 me-auto"}>
            {isSent && <FontAwesomeIcon 
                icon={faTrash} 
                id={`trash-${message.pk}`}
                className='icon p-2'
                data-bs-toggle="tooltip" 
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Delete message"
                ref={trashRef}
                onClick={()=>deleteMessage()}/>}
            {isFile &&
            <FontAwesomeIcon 
                icon={faDownload} 
                id={`download-${message.pk}`}
                className='icon p-2'
                data-bs-toggle="tooltip" 
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Download file"
                ref={downloadRef}
                onClick={()=>saveAs(`${import.meta.env.VITE_API_URL}/${message.file}`,`MessengerFile${message.pk}`)}
                />
            }
        </div>
     );
}
 
export default connect(null,{delMessage}) (Options);