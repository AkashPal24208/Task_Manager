import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { addTaskApi } from '../services/task.service';

const AddTask = () => {

 const [task,setTask] = useState({
    title:"",
    description:"",
    status:"to-do",
 });

 const [loading,setLoading] = useState(false);

//  handle change form 
const handleChange = async(e)=>{
    setTask({
        ...task,
        [e.target.name]: e.target.value,
    });
}

// submit form 
const handleSubmit = async (e)=>{
      e.preventDefault();
      setLoading(true);
      try{
       const data = await addTaskApi(task);

       console.log("Task added successfully:", data);
       
       setTask({title:"",description:"",status:"to-do"});
      }catch(err){
        console.error("Error adding task:", err.response?.data || err.message);
      }finally{
        setLoading(false);
      }
}


return (
    <div> 
      <Navbar/>
  <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
    <h2 className="text-2xl font-semibold mb-5">
      Add New Task
    </h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Task Title */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Task Title
        </label>

        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none focus:border-black"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-black"
        >
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
      >
       {loading ? "Adding..":"Add Task"} 
      </button>

    </form>
  </div>
  </div>
);

}

export default AddTask
