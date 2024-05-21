import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    users:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'users'
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'tasks'
        }
    ]
});

const projectModel = mongoose.model("projects",projectSchema);

export default projectModel;