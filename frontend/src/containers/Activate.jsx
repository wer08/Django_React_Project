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
            <div 
                className="d-flex flex-column justify-content-center align-items-center "
                style={{marginTop: '200px'}}
            >
                <h1>Verify your account</h1>
                <button className="btn btn-primary" type="button" onClick={() => handleClick()} style={{marginTop: '50px'}}>Activate</button>
            </div>

        </div>
     );
}
 
export default connect(null,{activate})(Activate);
