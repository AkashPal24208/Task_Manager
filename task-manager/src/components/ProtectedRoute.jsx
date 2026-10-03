import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const ProtectedRoute = () => {
    const {user} = useAuth();
  return (
    <div>
       {user ? <Outlet/> : <Navigate to ="/login" replace/>}
    </div>
  )
}

export default ProtectedRoute
