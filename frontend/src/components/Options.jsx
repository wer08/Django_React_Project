import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { connect } from "react-redux";
import { delMessage } from "../actions/myProject";

const Options = ({message, delMessage, page}) => {

    useEffect(()=>{
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    },[])

    const deleteMessage = ()=>{
        bootstrap.Tooltip.getInstance(`#trash-${message.id}`).hide();
        delMessage(message.pk, message.sender, message.receiver,page)
    }

    return ( 
        <div className="options p-2">
            <FontAwesomeIcon 
                icon={faTrash} 
                id={`trash-${message.id}`}
                className='icon p-2'
                data-bs-toggle="tooltip" 
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Delete message"
                onClick={()=>deleteMessage()}/>
        </div>
     );
}
 
export default connect(null,{delMessage}) (Options);