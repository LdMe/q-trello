import { useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom';

import { getProjects } from './utils/fetch';
import './App.css'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects,setProjects] = useState([]);
  useEffect(()=>{
    fetchProjects();
  },[]);
  async function fetchProjects(){
    const result = await getProjects();
    setProjects(result.data);
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
