import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import PrivateRouter from "./PrivateRouter"
import Details from '../pages/Details'
import MyProfile from '../pages/MyProfile'
import UserUpdate from '../pages/UserUpdate'
import PasswordUpdate from '../pages/PasswordUpdate'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const AppRouter = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/' element={<Home/>} />
        <Route path='' element={<PrivateRouter/>}>
            <Route path='/details' element={<Details/>} />
            <Route path='/profile' element={<MyProfile/>} />
            <Route path='/updateprofile' element={<UserUpdate/>} />
            <Route path='/updatepassword' element={<PasswordUpdate/>} />
        </Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default AppRouter