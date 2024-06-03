
const ProjectsList=({projects}) =>{

    const projectsHtml = projects.map(project =>{
        return(
            <article className="project-list-element" key={project._id}>
                <h2>{project.name}</h2>
                <p>Users : {project.users.length}</p>
                <p>Tasks : {project.tasks.length}</p>
            </article>
        )
    })
    return(
        <section className="project-list">
            {projectsHtml}
        </section>
    )
}

export default ProjectsList