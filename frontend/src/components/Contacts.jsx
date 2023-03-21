import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { add_contact, get_convo } from "../actions/myProject"

const Contacts = ({user, users, contacts, add_contact, get_convo, receiver, statuses}) => {
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
            currentStatuses && contacts && contacts.map((contact)=>
            <button 
                className={receiver==contact.id?"list-group-item click contact text-start active_conv mb-2":"list-group-item click contact text-start mb-2"}  
                key={contact.id} 
                value={contact.email} 
                onClick={onClick}
                name={contact.id}>
                    <img src={contact.profile_pic} alt="Profile pic" width="40" height="40" className="me-2 img"></img>
                    {currentStatuses[contact.id] ? 
                    `${contact.first_name} ${contact.last_name}` : 
                    <><span className="fw-bold" style={{pointerEvents: 'none'}}>{contact.first_name} {contact.last_name}</span><span className="dot ms-3"></span></>}
            </button>)
        )
    }

    const onClick = (e) => {
        const id = e.target.name
        setCurrentStatuses({...currentStatuses, [id]: true})
        get_convo(user.id, id, 1)
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
 
export default connect(mapStateToProps,{add_contact,get_convo})(Contacts);