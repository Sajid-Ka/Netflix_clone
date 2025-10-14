import { useState } from 'react'
import './App.css'
import './App.css'
import Navbar from './component/Navbar'
import Trends from './component/Trends'
import Reasons from './component/Reasons'
import Questions from './component/Questions'
import Subscription from './component/Subscription'
import Footer from './component/Footer'
import { Route,Routes } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import { useAuth } from './component/Context/AuthContext'
import { Navigate } from 'react-router-dom'

function App() {
  const {currentUser} = useAuth();

  return (
    <div className='bg-black text-white'>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            currentUser ? (
              <div className='max-w-7xl mx-auto'>
                <Trends />
                <Reasons />
                <Questions />
                <Subscription />
              </div>
            ) : (
              <Navigate to="/login" /> // Redirect to login if not authenticated
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
