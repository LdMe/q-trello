import projectModel from "../../models/projectModel.js";
import taskController from "../tasks/taskController.js";

const getAll = async()=> {
    try {
        const projects = await projectModel.find();
        return projects;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const project = await projectModel.findById(id);
        await project.populate("users");
        await project.populate("tasks");
        return project;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const create = async(data) =>{
    try {
        const project = await projectModel.create(data);
        project.users.push(data.owner);
        await project.save();
        return project;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        await projectModel.findByIdAndUpdate(id,data);

        const project = await projectModel.findById(id);
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const project = await projectModel.findByIdAndDelete(id);
        const result = await taskController.removeForProject(id);
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const addUser = async(projectId,userId) =>{
    try {
        const project = await getById(projectId);
        if(!project.users.includes(userId)){
            project.users.push(userId);
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
const removeUser = async(projectId,userId)=>{
    try {
        console.log("removeUser",projectId,userId)
        const project = await getById(projectId);
        if(project.users.includes(userId)){
            project.users = project.users.filter(u=> !u.equals(userId));
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
const addTask = async(projectId,taskId) =>{
    try {
        const project = await getById(projectId);
        if(!project.tasks.includes(taskId)){
            project.tasks.push(taskId);
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
const removeTask = async(projectId,taskId)=>{
    try {
        const project = await getById(projectId);
        if(project.tasks.includes(taskId)){
            project.tasks = project.tasks.filter(u=> u!==taskId);
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