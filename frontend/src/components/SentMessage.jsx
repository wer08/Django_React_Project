import { useState } from "react";

const SentMessage = ({message}) => {
    const [isShown, setIsShown] = useState(false)
    const onMouseOver = ()=>{
        setIsShown(true)
    }
    const onMouseLeave = ()=>{
        setIsShown(false)
    }
    

    return ( 
        <>
        <div onMouseOver={()=>onMouseOver()} onMouseLeave={()=>onMouseLeave()} className={ isShown ? "d-flex justify-content-end align-items-center container ms-auto" : "d-flex justify-content-end align-items-center container ms-auto hidden"}>
            here will be options
        </div>
        <div className="ms-auto list-group-item sent me-3" onMouseOver={()=>onMouseOver()} onMouseLeave={()=>onMouseLeave()}>
            {message.body}
        </div>
        </>
     );
}
 
export default SentMessage;