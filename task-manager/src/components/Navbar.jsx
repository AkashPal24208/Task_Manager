import React from 'react'
import {Link} from 'react-router-dom'
import { LogoutApi } from '../services/auth.service'
import { useAuth } from '../Context/AuthContext'
const Navbar = () => {
  const {setUser} = useAuth
 const handleLogout = async()=>{
  try{
   await LogoutApi();
   setUser(null);
  }catch(err){
   console.log("error in logout Api:",err.response?.data || err.message);
  }
 }
return (
  <div className="bg-white p-4 flex justify-between items-center shadow-md  top-0 left-0 w-full z-50 m-2">
    <nav className="flex w-full justify-between items-center">
      {/* Left side links */}
      <ul className="flex gap-6 text-sm md:text-base font-medium text-gray-700">
        <li>
          <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        </li>
        <li>
          <Link to="/add-task" className="hover:text-blue-600">Add Task</Link>
        </li>
      </ul>

      {/* Right side logout */}
      <ul className="flex text-sm md:text-base font-medium text-gray-700">
        <li>
          <button onClick={handleLogout} className='hover:text-red-600'>Logout ⏻</button>
        </li>
      </ul>
    </nav>
  </div>
);


}

export default Navbar
