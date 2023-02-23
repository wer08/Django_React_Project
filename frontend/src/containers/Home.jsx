import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SplitPane from "react-split-pane";

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});
 

const Home = ({user,isAuthenticated}) => {
    console.log(user)


    const logged = () => {
        try{
            return(
                <div>
                    <SplitPane split="vertical" minSize={50} defaultSize={500}>
                        <div style={{backgroundColor: 'yellow'}}>
                            <h2>{user.email}</h2>
                        </div>
                        <SplitPane split="vertical" minSize={50} defaultSize={500}>
                            <div>
                                <h2>{user.first_name}</h2>
                            </div>

                            <div>
                                <h2>{user.last_name}</h2>
                            </div>
                        </SplitPane>

    
                    </SplitPane>
                </div>
            )
        }
        catch{
            return(<h1>Loading</h1>)
        }

    }
    
    const not_logged = () => {

        return ( 
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to messenger</h1>
                    <p className="lead">This is a messenger</p>
                    <hr className="my-4" />
                    <p>Click the LogIn button to login</p>
                    <p className="lead">
                        <Link className="btn btn-primary btn-lg" to="/login" role="button">LogIn</Link>
                    </p>
                </div>
            </div>
            
         );
    }

    return (
        <>
        {isAuthenticated ? logged() : not_logged()}
        </>
    )
}

 
export default connect(mapStateToProps,{})(Home);