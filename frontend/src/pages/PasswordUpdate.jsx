import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { passUpdate } from '../helper/Functions'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PasswordUpdate = () => {
  const {auth}=useAuth()
  const {id}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const [passData,setPassData]=useState({
    old_password:"",
    password:"",
    password2:"",
  })

 const handleChangePass = async()=>{
      await auth("change_password",passData,id);
      navigate("/")
      setPassData({
        old_password:"",
        password:"",
        password2:"",
      })
 }

  return (
    <div style={{width:'100%', height:'800px'}} className='d-flex justify-content-center align-items-center'>
        <div className="card text-center" style={{width: '300px',height:'475px'}}>
  <div className="card-header h5 text-white bg-primary">Password Change</div>
  <div className="card-body px-5">
    <p className="card-text py-2 text-info">
      Please enter your old password and new password
    </p>
    <div className="form-outline">
      <input onChange={(e)=>setPassData({...passData,old_password: e.target.value})} type="password" id="typeoldPassword" className="form-control my-3" />
      <label className="form-label" htmlFor="typeoldPassword">Old Password</label>
    </div>
    <div className="form-outline">
      <input onChange={(e)=>setPassData({...passData,password: e.target.value})} type="password" id="typenewPassword" className="form-control my-3" />
      <label className="form-label" htmlFor="typenewPassword">New Password</label>
    </div>
    <div className="form-outline">
      <input onChange={(e)=>setPassData({...passData,password2: e.target.value})} type="password" id="typenew2Password" className="form-control my-3" />
      <label className="form-label" htmlFor="typenew2Password">New Password2</label>
    </div>
    <button onClick={()=>handleChangePass()}  className="btn btn-primary w-100">Reset password</button>
    <div className="d-flex justify-content-between mt-4">
      <a  href="#">Login</a>
      <a  href="#">Register</a>
    </div>
  </div>
</div>
    </div>
    

  )
}

export default PasswordUpdate