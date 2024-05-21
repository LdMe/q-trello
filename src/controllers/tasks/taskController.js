import taskModel from "../../models/taskModel.js";
import ProjectController from "../projects/projectController.js"

const getAll = async (projectId) =>{
    try {
        const tasks = await taskModel.find({project:projectId});
        return tasks;
    } catch (error) {
        console.error(error);
        return [];
    }
}


const getById = async(id) =>{
    try {
        const task = await taskModel.findById(id);
        return task;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}
const getByProperty = async(property,value) =>{
    try {
        const task = await taskModel.find({[property]:value})
        return task;
    } catch (error) {
        return null;
    }
}
const create = async(data) =>{
    try {
        const task = await taskModel.create(data);
        if(task){
            await ProjectController.addTask(task.project,task._id)
        }
        return task;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const changeStatus = async(id,status) =>{
    try {
        const data = {
            status: status
        }
        await taskModel.findByIdAndUpdate(id,data);

        const task = await taskModel.findById(id);
        return task;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const update = async(id,data) =>{
    try {
         await taskModel.findByIdAndUpdate(id,data);

        const task = await taskModel.findById(id);
        return task;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const task = await taskModel.findByIdAndDelete(id);
        await ProjectController.removeTask(task.project,task._id);
        return task;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const removeForProject = async(projectId) =>{
    try {
        const tasks = await taskModel.deleteMany({ project: projectId });
        return tasks;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const removeMany = async(ids) =>{
    try {
        const tasks = await taskModel.deleteMany({ _id: { $in: ids } });
        return tasks;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const addUser = async(taskId,userId) =>{
    try {
        const task = await getById(taskId);
        if(!task.users.includes(userId)){
            task.users.push(userId);
            await task.save();
            return task
        }
        return task;
    } catch (error) {
        return null;
    }
}
const removeUser = async(taskId,userId)=>{
    try {
        const task = await getById(taskId);
        if(task.users.includes(userId)){
            task.users = task.users.filter(u=> u!==userId);
            await task.save();
            return task
        }
        return task;
    } catch (error) {
        return null;
    }
}
export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    changeStatus,
    remove,
    removeMany,
    removeForProject,
    addUser,
    removeUser
}

export default functions;