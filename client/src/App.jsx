import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Navbar from './components/common/Navbar.jsx'
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx"
import OpenRoute from "./components/core/Auth/OpenRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App