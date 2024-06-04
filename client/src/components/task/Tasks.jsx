import { useState } from "react";
import Modal from "../modal/Modal";
import CreateTask from "./CreateTask";
import Task from "./Task";
import "./Tasks.css"

const Tasks = ({  project }) => {
    const [tasks,setTasks] = useState(getTasksByStatus(project.tasks));
    const [addingTask, setAddingTask] = useState(false);
    function getTasksByStatus(tasks) {
        const todo = tasks.filter(task => task.status === "todo");
        const doing = tasks.filter(task => task.status === "doing");
        const done = tasks.filter(task => task.status === "done");
        return { todo, doing, done };
    }
    function handleCreateTask(task) {
        setTasks({ ...tasks, [task.status]: [...tasks[task.status], task] });
        setAddingTask(false);
    }
    return (
        <section className="tasks">
            <h3>Tasks</h3>
            <p>Total: {project.tasks.length}</p>
            {addingTask &&
                <Modal onClose={() => setAddingTask(false)}>
                    <CreateTask project={project} onCreate={handleCreateTask} />
                </Modal>
            }
            <button onClick={() => setAddingTask(true)}>Add Task</button>
            <section className="tasks-list">
                <section className="todo">
                    <h2>todo</h2>
                    {tasks.todo.map(task => (
                        <Task key={task._id} task={task} />
                    ))}
                </section>
                <section className="doing">
                    <h2>doing</h2>
                    {tasks.doing.map(task => (
                        <Task key={task._id} task={task} />
                    ))}
                </section>
                <section className="done">
                    <h2>done</h2>
                    {tasks.done.map(task => (
                        <Task key={task._id} task={task} />
                    ))}
                </section>
            </section>
        </section>
    )
}

export default Tasks