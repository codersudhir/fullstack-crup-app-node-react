// Importing necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Task Schema
const taskSchema = new Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who posted the reel
        required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed','inprogress'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the 'updatedAt' field on document update
taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Creating Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
