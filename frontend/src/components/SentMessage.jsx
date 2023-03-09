import { useEffect, useState } from "react";
import Options from "./Options";


const SentMessage = ({message, page}) => {
    const [isShown, setIsShown] = useState(false)
    const [isFile, setIsFile] = useState(false)
    const onMouseOver = ()=>{
        setIsShown(true)
    }
    const onMouseLeave = ()=>{
        setIsShown(false)
    }
    useEffect(()=>{
        message.file && setIsFile(true)
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
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={message.date_of_creation} >
            {message.file ? <img src={`${import.meta.env.VITE_API_URL}/${message.file}`} alt="Can't display" width="150" height="150" className="me-2"></img>  : message.body}
        </div>
        </>
     );
}
 
export default SentMessage;