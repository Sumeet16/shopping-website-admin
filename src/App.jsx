import React, { useState } from 'react'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct/AddProduct'
import HomePage from './pages/HomePage/HomePage'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'


const App = () => {
  return (
    <div className='main-app'>
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='*' element={<><h1>404 Page Not Found</h1></>} />
          </Routes>
        </>
      </BrowserRouter>
    </div>

  )
}

export default App