import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import User from './Pages/User'
import Admin from './Pages/Admin'
import ForgotPassword from './Pages/ForgotPassword'

function App() {
 

  return (
    <>
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/' element={<Navigate to ="/Login" replace />}/>
    <Route path='/forgotPassword' element={<ForgotPassword/>}/>
    <Route path='/user' element={<User/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='*' element={<div>Not Found</div>}></Route>
   </Routes>
    </>
  )
}

export default App


