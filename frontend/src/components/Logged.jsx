import axios from "axios"
import { useEffect, useState } from "react"
import SplitPane from "react-split-pane"

const Logged = ({user}) => {
    const [users, setUsers] = useState(null)

    const get_users = async () => {
        try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
            console.log(res.data)
            setUsers(res.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        get_users()
    },[])

    try{
        return(
            <div>
                <SplitPane split="vertical" minSize={50} defaultSize={500}>
                    <div className="form-group search p-3">
                        <input type='text' className="form-control" placeholder="Find user ..." list="users"></input>
                        <datalist id="users">
                        {users.map(user => <option value={user.email} key={user.id}>{user.first_name} {user.last_name}</option>)}
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