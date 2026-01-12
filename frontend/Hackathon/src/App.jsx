import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import StudentDashboard from './Pages/StudentDashboard.jsx'
import LoginDecide from './Pages/LoginDecide.jsx'
import FacultyLogin from './Pages/FacultyLogin.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import AuthCallback from './Pages/AuthCallback.js'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginDecide />} />
        <Route path="/studentlogin" element={<Login />} />
        <Route path="/facultylogin" element={<FacultyLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router> 
     
    </>
  )}

export default App
