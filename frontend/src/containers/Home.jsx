import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Logged from "../components/Logged";
import NotLogged from "../components/NotLogged";
import axios from "axios";

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});




const Home = ({user,isAuthenticated}) => {

    return (
        <>
        {isAuthenticated ? <Logged user={user}/> : <NotLogged />}
        </>
    )
}

 
export default connect(mapStateToProps,{})(Home);