import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const Image = ({imageUrl, setShowPicture}) => {
    const [isOver, setIsOver] = useState(false)

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
      };
    
      const imageStyle = {
        position: 'relative',
        maxWidth: '100%'
      };
    return (     
    <div style={{ position: 'relative' }} onMouseOver={()=>setIsOver(true)} onMouseLeave={()=>setIsOver(false)} className='imageDiv'>
        <img src={imageUrl} style={imageStyle} />
        <div style={overlayStyle}>{isOver && <FontAwesomeIcon icon={faCircleLeft} onClick={()=>setShowPicture(false)} className="backIcon"/>}</div>
    </div>
     );
}
 
export default Image;