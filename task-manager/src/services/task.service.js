import api from "../api/api";

export async function addTaskApi(userData){
    try{
     const response = await api.post('/task/add-task',userData)
     return response.data;
    }catch(err){
    console.log("Error in task api:", err.response?.data || err.message);  
       throw err;
    }
}

/**
 * @getAlltaskApi
 */


export async function getAllTask(){
    try{
     const response = await api.get('/task/total-task',{
        withCredentials:true
     });
     return response.data;
    }catch(err){
      console.log("Error in getALL task api..");
      throw err;
    }
}

/**
 * @updateTaskApi
 */
export async function updateTaskApi(taskId,userData){
    try{
    const response = await api.patch(`/task/update-task/${taskId}`,userData)
    return response.data;
    }catch(err){
    console.log("error in update api:",err);
    throw err;
    }
}

/**
 * @deleteTaskApi
 */

export async function deleteTaskApi(taskId){
  try{  
   const response = await api.delete(`/task/delete-task/${taskId}`);
   return response.data;
   }
  catch(err){
   console.log("error in delete api:",err.response?.data || err.message);
   throw err;
  }
}