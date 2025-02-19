
const Task = require('../models/task.model');


exports.createTask = async (req, res) => {
  try {
    const id=req.user._id
    const { title, description ,status} = req.body;
    
    if (!status || !['pending', 'completed','inprogress'].includes(status)) {
        return res.status(400).json({ message: 'Invalid or missing status' });
      }  
   
    const newTask = await Task.create({user:id, title, description, status });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const id=req.params.id;
        const { status } = req.body;
  
      // Check if status is provided and valid
      if (!status || !['pending', 'completed','inprogress'].includes(status)) {
        return res.status(400).json({ message: 'Invalid or missing status' });
      }
  
      // Find the task by ID
      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      // Update the status of the task
      
      task.status = status;
      await task.save();
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task status', error });
    }
  };


  exports.getTasks = async (req, res) => {
    try {
      const { page = 1, status, date, title } = req.query;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      let filter = {};
  
      if (status) {
        filter.status = status;
      }
  
      if (date) {
        filter.createdAt = {
          $gte: new Date(date),
          $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
        };
      }
  
      if (title) {
        filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
      }
  
      const tasks = await Task.find(filter)
        .sort({ createdAt: -1 }) // Latest tasks first
        .skip(skip)
        .limit(limit);
  
      const totalTasks = await Task.countDocuments(filter);
  
      return res.status(200).json({
        tasks,
        currentPage: Number(page),
        totalPages: Math.ceil(totalTasks / limit),
        totalTasks
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching tasks', error });
    }
  };

exports.deleteTask = async (req, res) => {
    try {
        const id=req.params.id;
  
      // Find the task by ID and delete it
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting task', error });
    }
  };


