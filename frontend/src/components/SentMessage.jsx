import { useEffect, useRef, useState } from "react";
import Options from "./Options";


const SentMessage = ({message, page}) => {
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
        message.file && setIsFile(true)
        const messageTool = new bootstrap.Tooltip(messageRef.current)
    },[])

    
    

    return ( 
        <>
        <div onMouseOver={()=>onMouseOver()} onMouseLeave={()=>onMouseLeave()} className={ isShown ? "d-flex justify-content-end align-items-center container ms-auto" : "d-flex justify-content-end align-items-center container ms-auto hidden"}>
            <Options message={message} page={page} isFile={isFile} isSent={true}/>
        </div>
        <div 
            className="ms-auto sent me-3 p-2" 
            onMouseOver={()=>onMouseOver()} 
            onMouseLeave={()=>onMouseLeave()}
            ref = {messageRef}
            data-bs-toggle="tooltip" 
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={date} >
            {message.file ? <img src={`${import.meta.env.VITE_API_URL}/${message.file}`} alt="Can't display" width="150" height="150" className="me-2"></img>  : message.body}
        </div>
        </>
     );
}
 
export default SentMessage;