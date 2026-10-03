const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,     
    minlength: 2       
  },
  description: {
    type: String,
    trim: true,
    default: ""  
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "completed"], 
    default: "to-do"
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
}, { timestamps: true }); 

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
