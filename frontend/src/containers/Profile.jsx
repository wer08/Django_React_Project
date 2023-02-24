import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { change_profile_data } from "../actions/myProject";

const Profile = ({user, change_profile_data}) => {
    const [editing,setEditing] = useState(false)

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        id: ""
    })


    useEffect(()=>{
        try{
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                email: user.email,
                id: user.id
            })
        }catch(e){
        }

    },[user])

    const startEdit = (e) => {
        e.preventDefault()
        setEditing(true)
    }

    const saveEdit = (e) => {
        e.preventDefault()
        const data=formData
        change_profile_data(data)
        setEditing(false)
    }

    const editingButton = () => <button type="button" className="btn btn-primary" onClick={(e)=>startEdit(e)}>Edit</button>
    const savingButton = () => <button type="submit" className="btn btn-primary">Save</button>

    const {first_name, last_name, phone, email} = formData

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name]: e.target.value})
    }
    return ( 
        <div className="container mt-5">
            <form onSubmit={(e)=>saveEdit(e)}>
                <div className="form-group">
                    <input className="form-control mb-2" type='text' name="first_name" value={first_name} onChange={(e)=>handleChange(e)} placeholder="First Name" disabled={editing?false:true}></input>
                </div>
                <div>
                    <input className="form-control mb-2" type='text' name="last_name" value={last_name} onChange={(e)=>handleChange(e)} placeholder="Last Name" disabled={editing?false:true}></input>
                </div>
                <div>
                    <input className="form-control mb-2" type='tel' name="phone" value={phone} onChange={(e)=>handleChange(e)} placeholder="Phone" disabled={editing?false:true}></input>                  
                </div>
                <div>
                    <input className="form-control mb-2" type='email' name="email" value={email} onChange={(e)=>handleChange(e)} placeholder="email" disabled></input>
                </div>

                {editing ? savingButton() : editingButton()}
            </form>
        </div>
     );
}
const mapStateToProps = state => ({
    user: state.auth.user
})
 
export default connect(mapStateToProps,{change_profile_data})(Profile);