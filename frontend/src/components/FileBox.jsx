
import { useRef, useState } from "react";
import { connect } from "react-redux";


const FileBox = ({files}) => {
    const [showPicture,setShowPicture] = useState(false)
    const [currentPicture, setCurrentPicture] = useState("")


    const handleOnClick = (e) => {
        setShowPicture(true)
        setCurrentPicture(e.currentTarget.name)
    }
    const closeModal = ()=>{
        setShowPicture(false)
    }
    return ( 
        <>
        <div className="fileBox">{files?.map((file,idx)=>
            <div key={idx}>
                <img 
                src={`${import.meta.env.VITE_API_URL}/${file}`} 
                className='fileBoxPic'
                name={`${import.meta.env.VITE_API_URL}/${file}`}
                onClick={e=>handleOnClick(e)}
                ></img>
            </div>)
        }</div>
        </>
     );
}
const mapStateToProps = state =>({
    files: state.auth.files
})
export default connect(mapStateToProps,{})(FileBox);