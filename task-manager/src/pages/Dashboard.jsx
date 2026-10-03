import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useAuth } from '../Context/AuthContext';
const Dashboard = () => {
   const {user} = useAuth();
  return (
    <div>
    {user ?(  
      <>
        
         <Navbar/>
         <h2 className="mt-6 mb-4 px-6 py-3 text-xl font-semibold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-md shadow">
          Welcome {user.name}
        </h2>

<div className="w-full p-4">
  
  <h2 className="text-2xl md:text-4xl font-bold">
    Will show the dashboard page
  </h2>

  <main className="mt-4">
    <div className="bg-amber-100 p-3 rounded-lg text-center text-xl font-serif">
      Your Reports
    </div>
  {/* total task */}
    <div className="grid grid-cols-3 gap-3 mt-4">

      <div className="aspect-square bg-amber-100 rounded-lg p-3 flex items-center justify-center text-center cursor pointer">
        <h2 className="font-bold text-sm md:text-xl  border-white flex items-center justify-center px-4 py-2">
          <Link to='/total-task' className=' text-blue-400 font-serif  '>Total Task</Link>
        </h2>
      </div>
   
   {/* completed task */}
      <div className="aspect-square bg-amber-50 rounded-lg p-3 flex items-center justify-center text-center">
        <h2 className="font-bold text-sm md:text-xl">
          <Link to='/completed-task' className='text-green-500 font-serif'>
          Completed Task
          </Link>
        </h2>
      </div>
{/* pending task */}
      <div className="aspect-square bg-amber-50 rounded-lg p-3 flex items-center justify-center text-center">
        <h2 className="font-bold text-sm md:text-xl">
          <Link to='/pending-task' className='text-red-500 font-serif'>
          Pending Task
          </Link>
        </h2>
      </div>


    </div>

  </main>
  {/* can add footer section  */}
 <Footer/>
</div>
      </>
      ):(

     <p> Please login/register to access tasks</p>
      )} 
 </div>
  )
}

export default Dashboard
