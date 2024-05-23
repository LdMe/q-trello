import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description: String,
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
    ],
    daysToComplete: {
        type: Number,
        default: 7
    }
});

const projectModel = mongoose.model("projects",projectSchema);

export default projectModel;