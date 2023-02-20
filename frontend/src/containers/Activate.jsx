import { useState } from "react";
import { activate } from "../actions/auth";
import { Navigate, useParams } from "react-router-dom";
import {connect} from 'react-redux';

const Activate = ({activate}) => {
    const [activated, setActivated] = useState(false)

    const routeParams = useParams();


    const handleClick = () => {
        const uid = routeParams.uid;
        const token = routeParams.token;
        activate(uid,token);
        setActivated(true)

    }

    if(activated){
        return <Navigate to='/login'></Navigate>
    }

    return ( 
        <div className="container mt-5">
            <p>Click the button to activate accounty</p>
            <button className="btn btn-primary" onClick={() => handleClick()}>Activate</button>
        </div>
     );
}
 
export default connect(null,{activate})(Activate);
