const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    inviteToken: { type: String },
    inviteExpiry: { type: Date }
});


module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);