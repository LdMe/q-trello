import { useState,useEffect } from 'react'
import Register from './components/Register'
import Projects from './components/projects/Projects'

import './App.css'

function App() {
  const[isLogged,setIsLogged] = useState(false)

  return (
    <>
    {!isLogged && <Register  onSubmit={(token)=>setIsLogged(true)}/>}
    {isLogged && <Projects />}
    </>
  )
}

export default App
