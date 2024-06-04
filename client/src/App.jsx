import { useState,useEffect} from 'react'
import ProjectsList from './pages/project/ProjectsList';
import Project from './pages/project/Project';
import Register from "./components/register/Register";
import { getProjects } from './utils/fetch';
import './App.css'

/* const projects = [
  {
    "_id": "66560db0ce1d312aa56d945b",
    "name": "prueba",
    "owner": "66560c915bdf5471c809b42d",
    "users": [
      {
        "_id": "66560c915bdf5471c809b42d",
        "email": "admin@mail.com",
        "username": "admin",
        "role": "user"
      },
      {
        "_id": "66561130703f577e48e48222",
        "email": "uder@mail.com",
        "username": "user",
        "role": "user"
      }
    ],
    "tasks": [
      {
        "_id": "66560e1ece1d312aa56d9464",
        "title": "Crear Readme",
        "description": "Crear un readme explicando todos los detalles",
        "estimatedHours": 2,
        "users": [
          "66560c915bdf5471c809b42d"
        ],
        "status": "todo",
        "project": "66560db0ce1d312aa56d945b",
        "recommendedUserQuantity": 1,
        "__v": 1
      },
      {
        "_id": "665d84e193d2838fae73ab56",
        "title": "leer documentacion",
        "description": "leer bien la guia de React",
        "estimatedHours": 10,
        "users": [],
        "status": "doing",
        "project": "66560db0ce1d312aa56d945b",
        "recommendedUserQuantity": 1,
        "__v": 0
      },
      {
        "_id": "665d851693d2838fae73ab5d",
        "title": "Buscar información",
        "description": "Buscar datos sobre la aplicación que vamos a hacer",
        "estimatedHours": 4,
        "users": [],
        "status": "done",
        "project": "66560db0ce1d312aa56d945b",
        "recommendedUserQuantity": 1,
        "__v": 0
      }
    ],
    "daysToComplete": 7,
    "__v": 5
  },
  {
    "_id": "66561ac2d962a543f44adfa0",
    "name": "party",
    "description": "esto es una fiesta",
    "owner": "66561130703f577e48e48222",
    "users": [
      {
        "_id": "66561130703f577e48e48222",
        "email": "uder@mail.com",
        "username": "user",
        "role": "user"
      }
    ],
    "tasks": [],
    "daysToComplete": 7,
    "__v": 1
  }
] */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects,setProjects] = useState([]);
  useEffect(()=>{
    fetchProjects();
  },[]);
  async function fetchProjects(){
    const result = await getProjects();
    console.log("proijects",result);
    setProjects(result.data);
  }
  return (
    <>
      {!isLoggedIn ?
        <Register onLogin={()=>setIsLoggedIn(true)}/>
        :
        <>
          {/* <Project project={projects[0]} /> */}
          <ProjectsList projects={projects} />
        </>
      }
    </>
  )
}

export default App
