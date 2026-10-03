import React from "react";
import {Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import TotalTask from "./pages/TotalTask"; 
import PendingTask from "./pages/PendingTask";
import CompleteTask from "./pages/CompleteTask";
import { useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
const AppRoutes = ()=>{
    const {user,loading} = useAuth();
    if(loading){
         return <div>Loading..</div>
    }
     return(
    <Routes>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/total-task" element={<TotalTask />} />
        <Route path="/completed-task" element={<CompleteTask />} />
        <Route path="/pending-task" element={<PendingTask />} />
      </Route>

      {/* Public */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

    </Routes>   
             
     )
}

export default AppRoutes