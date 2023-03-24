import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";

const Image = ({imageUrl, setShowPicture}) => {
    const [isOver, setIsOver] = useState(false)

    const overlayStyle = {
        position: 'absolute',
        top: '15%',
        left: 0,
        width: '10%',
        height: '10%',

        padding: '20px',
        fontSize: '24px',
        fontWeight: 'bold',

      };


    
      const imageStyle = {
        position: 'relative',
        maxWidth: '100%'
      };

    return (     
    <>
    <div style={{ position: 'relative' }} onMouseOver={()=>setIsOver(true)} onMouseLeave={()=>setIsOver(false)} className='imageDiv'>
        <img src={imageUrl} style={imageStyle} />
        <div style={overlayStyle}>{isOver && <FontAwesomeIcon icon={faCircleLeft} onClick={()=>setShowPicture(false)} className="backIcon"/>}</div>

    </div>

    </>

     );
}

export default Image;