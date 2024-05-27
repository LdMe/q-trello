import {getProjects} from "../../utils/fetch";
import {useEffect, useState} from "react";


const Projects = () => {
    const [projects,setProjects] = useState([]);
    useEffect(() => {
        getProjects()
            .then((response) => {
                console.log("response",response)
                setProjects(response.data);
            })
    },[])
    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Projects