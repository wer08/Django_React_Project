import { Link } from "react-router-dom";
const Home = () => {
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
 
export default Home;