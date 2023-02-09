import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SplitPane from 'react-split-pane'

function App() {
  const [currentUser,setCurrentUser] = useState(null)
  const getUser = ()=>{
    fetch("0.0.0.0:8000/getUser")
    .then(response=>console.log(response))
    // .then(user=>{
    //   setCurrentUser(user)
    // })
    // .then(console.log(currentUser))
  }

  useEffect(()=>{
    getUser()
  },[])



  return (
    <div className="App">
      <p>Messenger</p>
      <SplitPane split="vertical" defaultSize ={"20%"}>
        <div>
          <p>Contact list</p>
        </div>
        <SplitPane split="vertical" defaultSize ={"75%"}>
          <div>
            <p>Conversation</p>
          </div>
          <div>
            <p>contact ingo</p>
          </div>
        </SplitPane>

      </SplitPane>

    </div>
  )
}

export default App
