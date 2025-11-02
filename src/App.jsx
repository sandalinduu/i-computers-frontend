import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from '../components/Text.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import AdminPage from '../pages/AdminPage.jsx'
import Login from '../pages/LoginPage.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    
    <BrowserRouter>
    <div className='w-full h-screen bg-primary'>
      <Routes path="/">

        <Route path="/login" element={<Login/>}/>
        <Route path="/*" element={<HomePage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>

      </Routes>
      

    </div>
    </BrowserRouter>
      
    
  )
}

export default App
