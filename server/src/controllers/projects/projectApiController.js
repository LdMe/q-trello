import projectController from "./projectController.js";

const getAll = async(req,res)=>{
    const isAdmin = req.user.role === "admin";
    const userId = isAdmin ? null : req.user._id;
     const projects = await projectController.getAll(userId);
    res.json({data:projects});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const project = await projectController.getById(id);
    res.json({data:project});
}



const create = async(req,res)=>{
    const owner = req.user._id
    const data = {...req.body,owner};
    const project = await projectController.create(data);
    res.json({data:project})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const project = await projectController.update(id,req.body);
    res.json({data:project})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const project = await projectController.remove(id);
    res.json({data:project})
}

const addUser = async(req,res)=>{
    const projectId = req.params.id;
    const userId = req.body.userId;
    const project = await projectController.addUser(projectId,userId);
    res.json({data:project})
}

const removeUser = async(req,res)=>{
    const projectId = req.params.id;
    const userId = req.body.userId;
    const project = await projectController.removeUser(projectId,userId);
    res.json({data:project})
}


export default{
    getAll,
    getById,
    create,
    update,
    remove,
    addUser,
    removeUser,
}

