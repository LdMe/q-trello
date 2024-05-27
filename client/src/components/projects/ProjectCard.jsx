
const ProjectCard = ({project}) => {
    return (
        <div>
            <h2>{project.name}</h2>
            <p>Tareas:</p>
            <ul>
                {project.tasks.map((task) => (
                    <li key={task._id}>{task.name}</li>
                ))}
            </ul>
            <p>Usuarios:</p>
            <ul>
                {project.users.map((user) => (
                    <li key={user._id}>{user.username}</li>
                ))}
            </ul>
            
        </div>
    )
}

export default ProjectCard