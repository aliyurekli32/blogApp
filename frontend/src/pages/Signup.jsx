import { useState } from "react"
import { fetchLoginRegister } from "../helper/Functions"


const Signup = () => {

  const [signUpData, setSignUpData]=useState({
    username: "",
    password: "",
    password2: "",
    email: "",
    first_name: "",
    last_name: "",
    bio: "",
    image:"",
    })


  return (
    <><section className="h-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setSignUpData({...signUpData,username: e.target.value})} value={signUpData.username} type="text" id="typeUserX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeUserX">{ signUpData.username ? "" : "Username" }</label>
                </div>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setSignUpData({...signUpData,first_name: e.target.value})} value={signUpData.first_name} type="text" id="typeFirstNameX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeFirstNameX">FirstName</label>
                </div>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setSignUpData({...signUpData,last_name: e.target.value})} value={signUpData.last_name} type="text" id="typeLastnameX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeLastnameX">Lastname</label>
                </div>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setSignUpData({...signUpData,email: e.target.value})} value={signUpData.email} type="email" id="typeEmailX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeEmailX">Email</label>
                </div>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setSignUpData({...signUpData,password: e.target.value})} value={signUpData.password} type="password" id="typePasswordX1" className="form-control form-control-lg border" />
                  <label className="form-label" htmlFor="typePasswordX1">Password</label>
                </div>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setSignUpData({...signUpData,password2: e.target.value})} value={signUpData.password2} type="password" id="typePasswordX2" className="form-control form-control-lg border" />
                  <label className="form-label" htmlFor="typePasswordX2">Password2</label>
                </div>
                <div className="form-outline form-white mb-4">
                  <input onChange={(e)=>setSignUpData({...signUpData,image: e.target.value})} value={signUpData.image} type="text" id="typeImageX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeImageX">Image</label>
                </div>
                <div className="form-outline form-white mb-4">
                  <textarea onChange={(e)=>setSignUpData({...signUpData,bio: e.target.value})} value={signUpData.bio} name="biography" id="typeBioX" cols="30" rows="10" className="form-control form-control-lg border mb-4"></textarea>
                  <label className="form-label " htmlFor="typeBioX">Bio</label>
                </div>
                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                <button onClick={()=>fetchLoginRegister(signUpData,"register")} className="btn btn-outline-light btn-lg px-5" type="submit">Signup</button>
                
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

export default Signup