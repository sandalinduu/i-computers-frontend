import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from '../components/Text.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import AdminPage from '../pages/AdminPage.jsx'
import Login from '../pages/LoginPage.jsx'
import Register from '../pages/RegisterPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


//542670788754-ubuol0rgl7h886p3vlgdomg3m04lsjmu.apps.googleusercontent.com

function App() {
  const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId="542670788754-ubuol0rgl7h886p3vlgdomg3m04lsjmu.apps.googleusercontent.com">
    <BrowserRouter>
    <div className='w-full h-full bg-primary'>
      <Routes path="/">

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/*" element={<HomePage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>

      </Routes>
      

    </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
      
    
  )
}

export default App
