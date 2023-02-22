import { Link, Navigate } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { useState } from "react";
const Navbar = ({logout, isAuthenticated}) => {

    const [redirect, setRedirect] = useState(false);

    const handleLogout = () => {
        logout();
        setRedirect(true);
    };

    const guestLink = () => {
        return(
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">SignUp</Link>
            </li>
            </>
        )
    };
    const authLinks = () =>{
        return(
            <li className="nav-item">
                <a className="nav-link logout" to="#!" onClick={()=>handleLogout()}>LogOut</a>
            </li>
        )

    };

    const afterLogout = () => {
        setRedirect(false)
        return(
            <Navigate to="/" />
        )

    }




    return ( 
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
                <Link className="navbar-brand" to="/">Communicator</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLink()}

                    </ul>
                </div>
            </nav>
            {redirect ? afterLogout() : <></>}
        </>
     );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(mapStateToProps,{logout})(Navbar);