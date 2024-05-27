import {getProjects} from "../../utils/fetch";
import {useEffect, useState} from "react";
import ProjectCard from "./ProjectCard";
import CreateProject from "./CreateProject";
const Projects = () => {
    const [projects,setProjects] = useState([]);
    const [isCreating,setIsCreating] = useState(false);
    useEffect(() => {
        handleGetProjects();
    },[])
    useEffect(() => {
        setIsCreating(false);
    },[projects])
    const handleGetProjects = async () => {
        const response = await getProjects();
        setProjects(response.data);
    }
    if(isCreating){
        return <CreateProject onCreate={()=>handleGetProjects()}/>
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