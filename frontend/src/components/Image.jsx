import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";

const Image = ({imageUrl, setShowPicture, setCurrentPicture, files}) => {
    const [isOver, setIsOver] = useState(false)

    const overlayStyle = {
        position: 'absolute',
        top: '15%px',
        left: 0,
        width: '10%',
        height: '10%',

        padding: '20px',
        fontSize: '24px',
        fontWeight: 'bold',

      };

    const otherPicturesStyle = {
        position: 'fixed',
        top: '80%',
        left: 0,
        width: '10%',
        height: '10%',
        display: 'flex',
        padding: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        visibility: isOver ? "visible" : 'hidden'
    }
    
      const imageStyle = {
        position: 'relative',
        maxWidth: '100%'
      };

      const handleOnClick = e => {
        setCurrentPicture(e.currentTarget.name)
      }

    return (     
    <>
    <div style={{ position: 'relative' }} onMouseOver={()=>setIsOver(true)} onMouseLeave={()=>setIsOver(false)} className='imageDiv'>
        <img src={imageUrl} style={imageStyle} />
        <div style={overlayStyle}>{isOver && <FontAwesomeIcon icon={faCircleLeft} onClick={()=>setShowPicture(false)} className="backIcon"/>}</div>
        <div style={otherPicturesStyle}>{files?.map((file,idx)=>
            <div key={idx}>
                <img 
                src={`${import.meta.env.VITE_API_URL}/${file}`} 
                className='fileChoice'
                name={`${import.meta.env.VITE_API_URL}/${file}`}
                onClick={e=>handleOnClick(e)}
                ></img>
            </div>)}</div>
    </div>

    </>

     );
}
 const mapStateToProps=(state)=>({
    files: state.auth.files
 })
export default connect(mapStateToProps,{})(Image);