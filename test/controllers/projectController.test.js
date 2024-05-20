import connectDB from "../../src/config/mongo.js";
import mongoose from 'mongoose';
import projectController from "../../src/controllers/projects/projectController.js";
import userController from "../../src/controllers/users/userController.js"

let projectId = null;
let userId = null;
describe("Test de projectController",()=>{
    beforeAll(async ()=>{
        await connectDB();
        try{
            await mongoose.connection.collections["projects"].drop();
        }
        catch(error){
            console.error(error);
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })

    test("Crear proyecto",async()=>{
        const users = await userController.getAll();
        console.log("usuario",users[0])
        const projectData = {
            name: "pruebas",
            owner: users[0],
            users:users
        }
        const project = await projectController.create(projectData)
        projectId = project._id;
        expect(project).not.toBeNull();
        expect(project.owner).toEqual(users[0]._id);
    })
    test("Añadir usuario",async()=>{
        const newUser = await userController.create({username:"algo",email:"mail",password:"1234"});
        userId = newUser._id;
        const project = await projectController.addUser(projectId,newUser._id);
        expect(project).not.toBeNull();
        expect(project.users).toContain(newUser._id);

    })
    test("Quitar usuario",async()=>{
        const project = await projectController.removeUser(projectId,userId);
        expect(project).not.toBeNull();
        expect(project.users).not.toContain(userId);
    })
})