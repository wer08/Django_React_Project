import { connect } from "react-redux";

const FileBox = ({files}) => {
    return ( 
        <div className="fileBox">{files?.map((file,idx)=><div key={idx}><img src={`${import.meta.env.VITE_API_URL}/${file}`} className='fileBoxPic'></img></div>)}</div>
     );
}
const mapStateToProps = state =>({
    files: state.auth.files
})
export default connect(mapStateToProps,{})(FileBox);