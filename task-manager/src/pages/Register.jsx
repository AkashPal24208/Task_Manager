import React, { useState } from 'react'
import {Link, Navigate} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import {RegisterApi} from "../services/auth.service"
import { useAuth } from '../Context/AuthContext'
const Register = () => {
  const {setUser} = useAuth();
  const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
   const [gender, setGender] = useState("")

    const handleRegister=async (e)=>{
         e.preventDefault();

        //  register api ...

        // frontend validation 
        if(!name.trim()){
          setError("Username is required");
          return;
        }
         if (!email.trim()) {
        setError("Email is required");
        return;
       }
      
      if (password.length < 3) {
        setError("Password must be at least 8 characters");
        return;
     }
    // now making api call 
    setLoading(true)
    try{
        setError("");

      const data = await RegisterApi({
        name:name.trim(),
        email:email.trim().toLowerCase(),
        password
      });
      console.log("Registration successfull:",data);
      setUser(data.user);
      navigate("/");
    }catch(err){
     setError(
        err.response?.data?.message || 
        "Registration failed.please try again."
     );
    } finally{
        setLoading(false);
    }

    };
  return (
    <div className="p-4">
         <div className="register max-w-md mx-auto my-8 bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-black text-slate-800 text-center mb-6 tracking-tight">Register</h2>
             <form onSubmit={handleRegister} className="space-y-4">
               <div className="input-field flex flex-col gap-1.5">
                   <label 
                    htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-slate-600"><strong>Name:</strong></label>
                   <input 
                   type="text" 
                   name='name' 
                   id='name' 
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   placeholder='Enter Your name..' 
                   className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" />
               </div>
               <div className="input-field flex flex-col gap-1.5">
                   <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-slate-600"><strong>Email:</strong></label>
                   <input 
                   type="email" 
                   name='email' 
                   id='email' 
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   placeholder='Enter Your email..' 
                   className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" />
               </div>
               <div className="input-field flex flex-col gap-1.5">
                   <label htmlFor="password" className="text-xs uppercase tracking-wider font-semibold text-slate-600"><strong>Password:</strong></label>
                   <input 
                   type="password" 
                   name='password' 
                   id='password'
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)} 
                   placeholder='Enter Your password..' 
                   className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400" />
               </div>
               <div className="input-field flex flex-col gap-2 pt-1">
                <label className="text-xs uppercase tracking-wider font-semibold text-slate-600"><strong>Gender:</strong></label>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600">
                    <input type="radio" name="gender" value="male" onChange={(e)=>setGender(e.target.value)} className="accent-indigo-600 w-4 h-4" /> Male
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600">
                    <input type="radio" name="gender" value="female" onChange={(e)=>setGender(e.target.value)} className="accent-indigo-600 w-4 h-4" /> Female
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600">
                    <input type="radio" name="gender" value="other" onChange={(e)=>setGender(e.target.value)} className="accent-indigo-600 w-4 h-4" /> Other
                  </label>
                </div>
               </div>
               {/* showing error */}
               {error && (
            <p className="text-red-500 text-sm">
           {error}<Link to="/login">Login here</Link>
            </p>
            )}
                <button type='submit'
                disabled={loading} 
                className="w-full mt-2 py-3 px-4 bg-slate-900 
                hover:bg-slate-800 text-white font-medium 
                text-sm rounded-xl shadow-md transition-all active:scale-[0.99]">
                {loading ? "Registering..":"Register"}
                </button>
                
                
                </form>
         </div>
    </div>
  )
}

export default Register