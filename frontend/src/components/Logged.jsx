import { useEffect } from "react"
import SplitPane from "react-split-pane"

const Logged = ({user,users}) => {

    // const mapped_users = users.map(user => <option value={user.email}>{user.email}</option>)
    useEffect(()=>{
        console.log(users)
    },[])

    try{
        return(
            <div>
                <SplitPane split="vertical" minSize={50} defaultSize={500}>
                    <div className="form-group search p-3">
                        <input type='text' className="form-control" placeholder="Find user ..." list="users"></input>
                        <datalist id="users">
                            
                        </datalist>
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
    catch(e){
        return(<h1>Loading</h1>)
    }
}
 
export default Logged;