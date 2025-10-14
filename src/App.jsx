import { useState } from 'react'
import './App.css'
import './App.css'
import Navbar from './component/Navbar'
import Trends from './component/Trends'
import Reasons from './component/Reasons'
import Questions from './component/Questions'
import Subscription from './component/Subscription'
import Footer from './component/Footer'

function App() {
  return (
    <div className='bg-black text-white'>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <Trends />
        <Reasons />
        <Questions />
        <Subscription />
        <Footer />
      </div>
    </div>
  )
}

export default App
