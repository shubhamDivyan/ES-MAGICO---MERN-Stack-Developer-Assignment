const Project = require('../models/Project');
const crypto = require('crypto');

// Create Project
exports.createProject = async (req, res) => {
    try {
        const project = new Project({ name: req.body.name, owner: req.user, members: [req.user] });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


exports.generateInvite = async (req, res) => {
    try {
        const token = crypto.randomBytes(20).toString('hex');
        const expiry = Date.now() + 30 * 60 * 1000; 

        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, owner: req.user },
            { inviteToken: token, inviteExpiry: expiry },
            { new: true }
        );

        if (!project) return res.status(404).json({ msg: "Project not found or unauthorized" });
        res.json({ inviteLink: `http://localhost:8080/api/projects/join/${token}` });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};




exports.getProjects = async (req, res) => {
    try {
       
        const projects = await Project.find({ members: req.user }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ msg: "Server Error: Projects fetch nahi ho sake" });
    }
};


exports.joinProject = async (req, res) => {
    try {
        const { token } = req.params;
        const project = await Project.findOne({ 
            inviteToken: token, 
            inviteExpiry: { $gt: Date.now() } 
        });

        if (!project) return res.status(400).json({ msg: "Invalid or expired token" });
        
        if (project.members.includes(req.user)) {
            return res.status(400).json({ msg: "Already a member" });
        }

        project.members.push(req.user);
        await project.save();
        res.json({ msg: "Joined successfully", project });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};