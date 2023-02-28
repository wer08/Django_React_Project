import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { add_contact } from "../actions/myProject"

const Contacts = ({user, users, add_contact}) => {
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
            user && user.contacts.map((contact)=><li className="list-group-item click" key={contact}>{contact}</li>)
        )
    }
    return ( 
    <div>
        <form onSubmit={e=>onSubmit(e)}>
            <div className="form-group search p-3">
                <input type='text' className="form-control" placeholder="Find user ..." list="users" value={contact} onChange={e=>setContact(e.target.value)}></input>
                <datalist id="users">
                {users && users.map(user => <option value={user.email} key={user.id}>{user.first_name} {user.last_name}</option>)}
                </datalist>
            </div>
            <button type="submit" className="btn btn-primary ms-3">Add contact</button>              
        </form>
    <ul className="list-group mt-3">
        {contacts()}
    </ul>
    </div>
     );
}
const mapStateToProps = state => ({
    users: state.auth.users,
    user: state.auth.user
});
 
export default connect(mapStateToProps,{add_contact})(Contacts);