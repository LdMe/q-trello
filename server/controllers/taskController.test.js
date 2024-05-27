import connectDB from "../../src/config/mongo.js";
import mongoose from 'mongoose';
import taskController from "../../src/controllers/tasks/taskController.js";
import projectController from "../../src/controllers/projects/projectController.js";
import userController from "../../src/controllers/users/userController.js";
const taskData = {
    title: "tarea",
    description:"descipcion",
    estimatedHours : 3
}
let projectId;
let newUser;
let taskId;
describe("Test de taskController",()=>{
    beforeAll(async ()=>{
        await connectDB();
        try {
            
            await mongoose.connection.collections["tasks"].drop();
            newUser = await userController.getByProperty("email","mail");
            if(!newUser){
                newUser = await userController.create({username:"algo",email:"mail",password:"1234"});
            }
            console.log("newUser",newUser);
        } catch (error) {
            console.error(error);   
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })

    test("añadir task",async()=>{
        const projects = await projectController.getAll();
        projectId = projects[0]._id;
        console.log("proyecto",projects);
        taskData.project = projectId;
        const task = await taskController.create(taskData);
        expect(task).not.toBeNull();
        expect(task.title).toEqual(taskData.title);
        expect(task.description).toEqual(taskData.description);
        expect(task.estimatedHours).toEqual(taskData.estimatedHours);
        expect(task.project).toEqual(taskData.project);
        taskId=task._id;

    })
    test("buscar tasks por proyecto",async()=>{
        const tasks= await taskController.getAll(projectId);
        expect(tasks.length).toBeGreaterThanOrEqual(1);
        const task = tasks[0];
        expect(task.title).toEqual(taskData.title);
        expect(task.description).toEqual(taskData.description);
        expect(task.estimatedHours).toEqual(taskData.estimatedHours);
        expect(task.project).toEqual(projectId);
    })
    test("Añadir usuario",async()=>{
        
        const task = await taskController.addUser(taskId,newUser._id);
        expect(task).not.toBeNull();
        expect(task.users).toContain(newUser._id);

    })
    /* test("Quitar usuario",async()=>{
        const task = await taskController.removeUser(taskId,newUser._id);
        expect(task).not.toBeNull();
        expect(task.users).not.toContain(newUser._id);
    }) */
})