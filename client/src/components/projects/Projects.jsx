import {getProjects} from "../../utils/fetch";
import {useEffect, useState} from "react";
import ProjectCard from "./ProjectCard";
import CreateProject from "./CreateProject";
const Projects = () => {
    const [projects,setProjects] = useState([]);
    const [isCreating,setIsCreating] = useState(false);
    useEffect(() => {
        getProjects()
            .then((response) => {
                console.log("response",response)
                setProjects(response.data);
            })
    },[])
    if(isCreating){
        return <CreateProject setIsCreating={setIsCreating}/>
    }
    return (
        <div>
            <h1>Projects</h1>
            <button onClick={() => setIsCreating(true)}>Create Project</button>
            <ul>
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project}/>
                ))}
            </ul>

        </div>
    )
}

export default Projects