import axios from "axios"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import SplitPane from "react-split-pane"
import { add_contact } from "../actions/myProject"

const Logged = ({user, users, add_contact}) => {
    const [contact, setContact] = useState("")

    const onSubmit = (e)=>{
        try{
            add_contact(user.id,contact)
        }
        catch(e){
            console.log(e)
        }
    }
    const contacts = () => 
    {
        return(
            user.contacts && user.contacts.map((contact)=><li key={contact}>{contact}</li>)
        )
    }

    try{
        return(
            <div>
                <SplitPane split="vertical" minSize={50} defaultSize={500}>
                    <div>
                        <form onSubmit={e=>onSubmit(e)}>
                            <div className="form-group search p-3">
                                <input type='text' className="form-control" placeholder="Find user ..." list="users" value={contact} onChange={e=>setContact(e.target.value)}></input>
                                <datalist id="users">
                                {users.map(user => <option value={user.email} key={user.id}>{user.first_name} {user.last_name}</option>)}
                                </datalist>
                            </div>
                            <button type="submit" className="btn btn-primary ms-3">Add contact</button>              
                        </form>
                    <ul>
                        {contacts()}
                    </ul>
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
const mapStateToProps = state => ({
    users: state.auth.users,
    user: state.auth.user
});
 
export default connect(mapStateToProps,{add_contact})(Logged);