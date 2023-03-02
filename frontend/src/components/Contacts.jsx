import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { add_contact, get_convo } from "../actions/myProject"

const Contacts = ({user, users, contacts, add_contact, get_convo, receiver}) => {
    const [contact, setContact] = useState("")

    const onSubmit = (e)=>{
        try{
            add_contact(user.id,contact)
        }
        catch(e){
            console.log(e)
        }
    }


    const contact_list = () => 
    {
        return(
            contacts && contacts.map((contact)=>
            <button 
                className={receiver===contact.email?"list-group-item click contact text-start active_conv me-3":"list-group-item click contact text-start me-3c"}  
                key={contact.id} 
                value={contact.email} 
                onClick={onClick}>
                    <img src={contact.profile_pic} alt="Profile pic" width="40" height="40" className="me-2 img"></img>{contact.first_name} {contact.last_name}
            </button>)
        )
    }

    const onClick = (e) => {
        const value = e.target.value
        get_convo(user.id, value)
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
    receiver: state.auth.receiver
});
 
export default connect(mapStateToProps,{add_contact,get_convo})(Contacts);