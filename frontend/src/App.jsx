import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Change from './Change'

function App() {
  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)

  const getData = () => {
    fetch('http://localhost:8000/')
    .then(response => response.json())
    .then(data => {
      setName(data.name)
      setSurname(data.surname)
    })
  }

  const changeData = (name,surname,id) => {
    const data ={
      'name': name,
      'surname': surname
    }
    console.log(data)
    fetch(`http://localhost:8000/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(()=>{
      setName(name)
      setSurname(surname)
    })
    
  }
  useEffect(()=>{
    getData();
  },[])

  return (
    <div className="App">
      <p>Username: {name}</p>
      <p>Email: {surname}</p>
      <Change changeData={changeData} id={1}/>
    </div>
  )
}

export default App
