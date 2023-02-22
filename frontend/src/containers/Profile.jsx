import { useState } from "react";

const Profile = () => {
    const [editing,setEditing] = useState(false)

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",

    })

    const startEdit = () => {

    }

    const saveEdit = () => {
        
    }

    const editingButton = () => <button type="button" className="btn btn-primary" onClick={startEdit}>Edit</button>
    const savingButton = () => <button type="submit" className="btn btn-primary" onClick={saveEdit}>Save</button>

    const {first_name, last_name, phone, email} = formData
    const handleChange = (e) => {
        setFormData(...formData , [e.target.name] = e.target.value)
    }
    return ( 
        <div className="container mt-5">
            <form className="form-group">
                <input type='text' name="first_name" value={first_name} onChange={handleChange}>First Name</input>
                <input type='text' name="last_name" value={last_name} onChange={handleChange}>Last Name</input>
                <input type='text' name="first_name" value={phone} onChange={handleChange}>phone</input>
                <input type='text' name="first_name" value={email} onChange={handleChange}>email</input>
                {editing ? savingButton() : editingButton()}
            </form>
        </div>
     );
}
 
export default Profile;