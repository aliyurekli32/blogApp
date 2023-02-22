import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
    </Routes>
    </>
  )
}

export default AppRouter