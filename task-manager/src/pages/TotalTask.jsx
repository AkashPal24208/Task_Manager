import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard'
import { getAllTask, updateTaskApi } from '../services/task.service';

import api from "../api/api"
const TotalTask = () => {
    const [tasks,setTask] = useState([]);
    
    // this call is used to get ALL task 
    useEffect(()=>{
      const fetchTask = async ()=>{
        try{
          const data = await getAllTask();
          console.log("tasks from API:", data);
          setTask(data.task);  
        console.log("API TASK IDs:", data.task.map(task => task._id));
        }catch(err){
        console.log("Error fetching message tasks:",err.response?.data || err.message);
        }
      };
      fetchTask();
       console.log("TASKS:", tasks);  // 👈 yahan
    },[])

      // to update task 
      const handleUpdate = async (updatedTask)=>{
         try{
           const data = await updateTaskApi(updatedTask._id,updatedTask);
        setTask(tasks =>
        tasks.map(task =>
          task._id === updatedTask._id ? updatedTask : task
        )
        );         }
         catch(err){
       console.log("Error while updating document..",err);
     
         }
      }

      // to delete task 
      const handleDelete = async (taskId)=>{
      try{
       const data = await api.delete(`/task/delete-task/${taskId}`)
       setTask(prev=> prev.filter(task=>task._id !== taskId));
      }
      catch(err){
      console.log("error while deleting document:",err);
      }
      }

  return (
      <div>
        <Navbar/>
        <div className='p-5'>
       <h2 className='text-blue-400 text-2xl font-bold font-serif'>Total Task </h2>
       {/* Task card render here  */}
        <div className="flex flex-col gap-4">
        {tasks.length > 0 ? (
        tasks.map((task) => (
        <TaskCard 
        key={task._id}
        task={task}
        onUpdateTask={handleUpdate}
        onDeleteTask={handleDelete}
        />
        ))
        ) : (
        <p>No Task is Found</p>
        )}
       </div>
    </div>
    </div>
  );
};

export default TotalTask
