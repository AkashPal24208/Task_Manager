import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { LoginApi } from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();
const handleLogin = async (e)=>{
    //   fetch from api..
    e.preventDefault();

    try{
        setLoading(true);
        setError("");
     const data = await LoginApi({email:email,password:password});
    console.log("data",data);
    setUser(data.user);
     navigate("/");
    }catch(err){
       setError(
        err.response?.data?.message || 
        "login failed.please try again."
     );
    
    } finally{
        setLoading(false);
    }
}

  return (
      <main className="p-4">
         <div className="login max-w-md mx-auto my-12 bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-slate-200/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)]">
             <div className="text-center mb-6">
                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
                 <p className="text-xs text-slate-500 mt-1">Please enter your details to sign in</p>
             </div>
             
             <form onSubmit={handleLogin} className="space-y-4">
               <div className="input-field flex flex-col gap-1.5">
                   <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-slate-600"><strong>Email:</strong></label>
                   <input 
                   type="email" 
                   name='email' 
                   id='name' 
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
                {error && (
                <p className="text-red-500 text-sm">
                {error}
                </p>
                )}
               <button type='submit' disabled={loading} className="w-full mt-2 py-3 px-4 bg-amber-800 hover:bg-green-600 text-white font-medium text-sm rounded-xl shadow-md transition-all active:scale-[0.99] disabled:opacity-70">
                   {loading ? "Login in..":"Login"}
               </button>
             </form>
         </div>
      </main>
  )
}

export default Login