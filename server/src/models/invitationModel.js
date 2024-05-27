import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    to: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'projects'
    }
});

const invitationModel = mongoose.model("invitations",invitationSchema);

export default invitationModel;