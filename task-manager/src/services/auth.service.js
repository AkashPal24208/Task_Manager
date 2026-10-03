import api from "../api/api";

/**
 * @registerAPI
 */
export  async function RegisterApi(userData){
     try{
    const response  = await api.post('/api/register',userData,{
        withCredentials:true
    })
    return response.data;
     }catch(err){
    console.log("Register api error:",err);
    throw err;
     }
}

/**
 *@loginAPI 
 */
export  async function LoginApi(userData){
  try{
   const response = await api.post('/api/login',userData,{
    withCredentials:true
   })
   return response.data;
  }catch(err){
    console.log("Error in Login API:",err);
    throw err;
  }
}

/**
 * @logoutApi
 */

export  async function LogoutApi(){
    try{
    const response = await api.post('/api/logout')
     return response.data
    }catch(err){
  console.log("error in logout Api:",err)
   throw err;
    }
}