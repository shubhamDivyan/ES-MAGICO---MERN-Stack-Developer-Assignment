const Task = require('../models/Task');

// 1. Create Task
exports.createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const taskData = { ...req.body, projectId };
        
        const newTask = new Task(taskData);
        await newTask.save();
        
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ msg: "Task create karne mein error", error: err.message });
    }
};

// 2. Get All Tasks for a Project
exports.getProjectTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId })
                                .populate('dependencies', 'title');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: "Tasks fetch nahi ho paye" });
    }
};

// 3. Update Task Status (Or other fields)
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId, 
            { $set: req.body }, 
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ msg: "Update fail ho gaya" });
    }
};

// 4. Delete Task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskId);
        res.json({ msg: "Task delete ho gaya" });
    } catch (err) {
        res.status(500).json({ msg: "Delete fail ho gaya" });
    }
};