
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { add_contact} from "../actions/myProject"
import Contact from "./Contact";

const Contacts = ({user, users, contacts, add_contact, receiver, statuses}) => {
    const [contact, setContact] = useState("")
    const [currentStatuses, setCurrentStatuses] = useState(null)


    const onSubmit = (e)=>{
        try{
            add_contact(user.id,contact)
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        setCurrentStatuses(statuses)
    },[statuses])

    const contact_list = () => 
    {
        return(
            currentStatuses && contacts && contacts.map((contact,idx)=><Contact receiver={receiver} contact={contact} key={idx} status={currentStatuses[contact.id]} user={user} />))

    }

    return ( 
    <div>
        <form onSubmit={e=>onSubmit(e)}>
            <div className="form-group search p-3">
                <input type='search' className="form-control" placeholder="Find user ..." list="users" value={contact} onChange={e=>setContact(e.target.value)}></input>
                <datalist id="users">
                {users && users.map((user,idx) => <option value={user.email} key={idx}>{user.first_name} {user.last_name}</option>)}
                </datalist>
            </div>
            <button type="submit" className="btn btn-primary ms-3">Add</button>              
        </form>
        <div className="list-group mt-3 contact_list">
            {contact_list()}
        </div>
    </div>
     );
}
const mapStateToProps = state => ({
    users: state.auth.users,
    user: state.auth.user,
    contacts: state.auth.contacts,
    receiver: state.auth.receiver,
    statuses: state.auth.statuses,
    
});
 
export default connect(mapStateToProps,{add_contact})(Contacts);