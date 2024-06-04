import { useState } from "react";
import Modal from "../../components/modal/Modal";
import CreateProject from "../../components/project/CreateProject";
import { useLoaderData,useNavigate } from "react-router-dom";
const ProjectsList = () => {
    const [projects,setProjects] =useState( useLoaderData());
    const [creatingProject,setCreatingProject] = useState(false);
    const navigate = useNavigate();
    const projectsHtml = projects.map(project => {
        return (
            <article className="project-list-element" key={project._id} onClick={()=>handleGoToProject(project._id)}>
                <h2>{project.name}</h2>
                <p>Users : {project.users.length}</p>
                <p>Tasks : {project.tasks.length}</p>
            </article>
        )
    })
    const handleCreateProject = (project) => {
        setCreatingProject(false);
        setProjects([...projects,project]);
    }
    const handleGoToProject = (id) => {
        navigate(`/projects/${id}`);
    }
    return (
        <>
        {creatingProject ?
            <Modal onClose={()=>setCreatingProject(false)}>
                <CreateProject onCreate={handleCreateProject}/>
            </Modal>
            :
            <button onClick={()=>setCreatingProject(true)}>New Project</button>
        }
            <section className="project-list">
                {projectsHtml}
            </section>
        </>
    )
}

export default ProjectsList