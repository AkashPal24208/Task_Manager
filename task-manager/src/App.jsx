import { useState } from 'react'
import AppRoutes from './app.route'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
function App() {

  return (
    <AuthProvider> 
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
