
import projectModel from "../../models/projectModel.js";
import taskController from "../tasks/taskController.js";
import userController from "../users/userController.js";
//import { getTasksForProject } from "../../utils/claudio.js";
const getAll = async (userId = null) => {
    try {
        if (!userId) {
            const projects = await projectModel.find();
            return projects;
        }
        const user = await userController.getById(userId);
        const userProjects = await Promise.all(user.projects.map(async (projectId) => {
            const project = await getById(projectId);
            return project;
        }));
        const orderedProjects = userProjects.sort((a, b) => {
            return b.creation_date - a.creation_date;
        })
        return orderedProjects;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async (id) => {
    try {
        const project = await projectModel.findById(id);
        if (!project) {
            return null;
        }
        await project.populate({
            path:"users",
            select: { username:1, email:1, role:1 }
        });
        await project.populate("tasks");
        return project;
    } catch (error) {
        console.error(error);
        return null;

    }
}

const createTasksFromClaudio = async (tasks, projectId) => {
    try {
        tasks.forEach(async (task) => {
            await taskController.create({
                ...task,
                project: projectId
            })
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}

const create = async (data) => {
    try {
        const project = await projectModel.create(data);
        project.users.push(data.owner);
        //const result = await getTasksForProject(project);
        //console.log("Claude says",result);
        await project.save();
        //await createTasksFromClaudio(result,project._id);
        await userController.addProject(data.owner, project._id);
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const update = async (id, data) => {
    try {
        await projectModel.findByIdAndUpdate(id, data);

        const project = await projectModel.findById(id);
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async (id) => {
    try {
        const project = await projectModel.findByIdAndDelete(id);
        const result = await taskController.removeForProject(id);
        await userController.removeProject(project.owner, id)
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const addUser = async (projectId, userId) => {
    try {
        console.log("usuriio", userId)
        const project = await getById(projectId);
        console.log("proyecto", project);
        await userController.addProject(userId, projectId)
        if (!project.users.includes(userId)) {
            project.users.push(userId);
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
const removeUser = async (projectId, userId) => {
    try {
        console.log("removeUser", projectId, userId)
        const project = await getById(projectId);
        if (userId.equals(project.owner)) {
            return { error: "El owner no se puede borrar" };
        }
        await userController.removeProject(userId, projectId);
        if (project.users.includes(userId)) {
            project.users = project.users.filter(u => !u.equals(userId));
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
const addTask = async (projectId, taskId) => {
    try {
        const project = await getById(projectId);
        if (!project.tasks.includes(taskId)) {
            project.tasks.push(taskId);
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
const removeTask = async (projectId, taskId) => {
    try {
        const project = await getById(projectId);
        if (project.tasks.includes(taskId)) {
            project.tasks = project.tasks.filter(u => u !== taskId);
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
    addUser,
    removeUser,
    addTask,
    removeTask
}

export default functions;