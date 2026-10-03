import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const PublicRoute = () => {
    const {user} = useAuth();

    return user ? <Navigate to="/" replace /> : <Outlet />;
  
}

export default PublicRoute
