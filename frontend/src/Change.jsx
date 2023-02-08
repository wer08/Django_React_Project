import { useEffect, useState } from "react";

const Change = ({id,changeData}) => {
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")

    return ( 
        <div>
            <form onSubmit={()=>changeData(name,surname,id)}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                </label>
                <label>
                    Surname:
                    <input type="text" value={surname} onChange={(e)=>setSurname(e.target.value)} />
                </label>
                <input type="submit" value="Change" />

            </form>
        </div>
     );
}
 
export default Change;