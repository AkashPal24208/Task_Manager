// provide global authcontext 
import { createContext,useContext,useEffect,useState } from "react";
import api from "../api/api"

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
     
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const checkAuth = async ()=>{
            console.log("AUTH CHECK START");
        try{
         const res = await api.get('/api/auth-me');
         setUser(res.data.user);
         console.log("AUTH RESPONSE:", res.data);
        }
        catch(err){
             console.log("user not authorized:",err);
             setUser(null);
        }finally{
            setLoading(false);
        }
        }
        checkAuth();
    },[])
   
    return (
        <AuthContext.Provider value={{user,setUser,loading}}>
         {children}
        </AuthContext.Provider>
    )

};

export const useAuth = ()=>useContext(AuthContext);
