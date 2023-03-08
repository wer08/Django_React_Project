import { useEffect, useState } from "react";
import { connect } from "react-redux";

const ReceivedMessage = ({message, users}) => {
    const [picture, setPicture] = useState(null)

    useEffect(()=>{
        const sender = users.find(user => user.id = message.sender)
        setPicture(sender.profile_pic)
    },[])

    return (  
        <>
        <img src={picture} alt="" width="40" height="40" className="ms-2 img"></img>
        <div 
            className="me-auto  ms-3 received p-2"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title={message.date_of_creation}>
            <div>
                {message.body}
            </div>
        </div>
        </>
    );
}
const mapStateToProps = state => ({
    users: state.auth.users
})
 
export default connect(mapStateToProps,{})(ReceivedMessage);