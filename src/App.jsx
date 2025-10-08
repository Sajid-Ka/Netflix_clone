import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Trends from './component/Trends'
import Reasons from './component/Reasons'
import Questions from './component/Questions'
import Subscription from './component/Subscription'
import Footer from './component/Footer'

function App() {

  return (
    <div className='bg-black px-30 text-white'>
      <Navbar />
      <Trends />
      <Reasons />
      <Questions />
      <Subscription />
      <Footer />
    </div>
  )
}

export default App
