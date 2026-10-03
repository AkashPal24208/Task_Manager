
const TaskModel = require("../Models/task.model");


/**
 * @add_task POST/task/add-task
 */
async function addTaskController(req,res){
     try{
      const {title,description,status} = req.body;

    //   validation  

      if(!title || !description){
         return res.status(400).json({
            message:"Incomplete information.."
         })
      }
    // create  new Task 
      const newTask =  await TaskModel.create({
        title:title,
        description:description,
        status:status,
        userId:req.user.id
      }) 
   
    //   when task added successfully 
     return res.status(201).json({
        message:"Task Added successfully..",
        task:newTask
     })

     }catch(err){
         return res.status(500).json({
            message:"Internal server error.."
         })
     }
}

/**
 * @getAllTask GET/task/get-task
 */
async function getAllTaskController(req,res){
    try{
        const userId = req.user.id; // get it from jwt payload
      //   applying pagination 
      const page = parseInt(req.query.page)||1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page-1)*limit;

      const task = await TaskModel.find({userId}).sort({createdAt:-1}).skip(skip).limit(limit);
    
      // counting total task 
      const totalTasks = await TaskModel.countDocuments({userId});
      // count total page 
      const totalPages = Math.ceil(totalTasks/limit);

        return res.status(200).json({
         message:"Task fetched successfully",
         task,
         pagination:{
            page,
            limit,
            totalTasks,
            totalPages
         }
        });

    }
    catch(err){
         console.log("Error fetching task:",err);
         return res.status(500).json({message:"Internal server error"})
    }
}

/**
 * @deleteTask DELETE/task/delete
 */
async function deleteTaskController(req,res){
  try{
   const taskId = req.params.taskId;
   if(!taskId){
       return res.status(400).json({message:"Task id is required"});
   }

   // find the task and delete it 
   const task = await TaskModel.findByIdAndDelete({
      _id:taskId,
      userId:req.user.id // user delete only their own task 
   });

   if(!task){
       return res.status(404).json({message:"Task can't be deleted"})
   }

   // success response 
   return res.status(200).json({
      message:"Task deleted successfully",
      task:task
   })

  }catch(err){
    console.log("Deleted task error:",err);
    return res.status(500).json({message:"Internal server error"})
  }
}

/**
 * @updateTask 
 */
async function updateTaskController(req,res){
   try{
     const taskId = req.params.taskId;
     const update = req.body;

     const updatedTask = await TaskModel.findOneAndUpdate({
      _id:taskId,
      userId:req.user.id
     },
     update,
     {returnDocument:'after'}  // return kiya updated document
   );

   if(!updatedTask){
       return res.status(404).json({message:"Task not found or not authorized"});
   }

   return res.status(200).json({
      message:"task updated successfully",
      task:updatedTask
   });

   }catch(err){
   console.log("update task error:",err);
   return res.status(500).json({message:"Internal server error"});
   }
}

module.exports = {addTaskController,getAllTaskController,deleteTaskController,updateTaskController}