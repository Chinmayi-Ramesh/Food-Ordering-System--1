import React from 'react'
import { useState } from 'react'   
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import LoginPopup from './components/LoginPopup/LoginPopup'  
import Admin from './pages/Admin/Admin'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}

      <div className={isAdminRoute ? "admin-container" : "main-container"}>
        {!isAdminRoute && <Navbar setShowLogin={setShowLogin}/>}

        <Routes> 
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>

        {!isAdminRoute && <Footer />}
      </div>
    </>
  )
}

export default App