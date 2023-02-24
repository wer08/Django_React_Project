import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Logged from "../components/Logged";
import NotLogged from "../components/NotLogged";
import axios from "axios";
import { get_users } from "../actions/myProject";

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});
 

const Home = ({user,isAuthenticated}) => {
    const users = get_users()

    return (
        <>
        {isAuthenticated ? <Logged user={user} users={users}/> : <NotLogged />}
        </>
    )
}

 
export default connect(mapStateToProps,{})(Home);