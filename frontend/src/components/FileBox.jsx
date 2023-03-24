
import { useRef, useState } from "react";
import { connect } from "react-redux";


const FileBox = ({files, setCurrentPicture, setShowPicture}) => {

    const handleOnClick = (e) => {
        setShowPicture(true)
        setCurrentPicture(e.currentTarget.name)
    }
    return ( 
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
     );
}
const mapStateToProps = state =>({
    files: state.myProject.files
})
export default connect(mapStateToProps,{})(FileBox);