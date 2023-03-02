import axios from "axios"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import SplitPane from "react-split-pane"
import Contacts from "./Contacts"
import Conversation from "./Conversation"


const Logged = () => {


    try{
        return(
            <div>
                <SplitPane split="vertical" minSize={50} defaultSize={300}>
                    <Contacts />
                    <Conversation />
                </SplitPane>
            </div>
        )
    }
    catch(e){
        return(<h1>Loading</h1>)
    }
}
 
export default connect(null,{})(Logged);