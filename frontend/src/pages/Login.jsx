import { useState } from "react"
import { fetchLoginRegister, fetchUser } from "../helper/Functions"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../store/slices/userSlice"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useApi from "../hooks/useApi"



const Login = () => {
  const {error,auth}=useAuth()
  const{getData}=useApi()
  const dispatch=useDispatch()
  const data=useSelector(state=>state.user)
  const navigate=useNavigate()

  const [loginData, setLoginData]=useState({
  username: "",
  password: ""
  })

  const handleLogin =async()=>{
      await auth("login",loginData);
     const user= await getData('auth/user');

     user[0].id && dispatch(getUser({...user[0],refresh:true}))
     navigate("/")
  }

  

  return (
    <>
    <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setLoginData({...loginData,username: e.target.value})} value={loginData.username}  type="text" id="typeTextX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeTextX">Username</label>
                </div>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setLoginData({...loginData,password: e.target.value})} value={loginData.password} type="password" id="typePasswordX" className="form-control form-control-lg border" />
                  <label className="form-label" htmlFor="typePasswordX">Password</label>
                </div>
                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                <button onClick={()=>handleLogin()} className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                <div className="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg" /></a>
                  <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2" /></a>
                  <a href="#!" className="text-white"><i className="fab fa-google fa-lg" /></a>
                </div>
              </div>
              <div>
                <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default Login