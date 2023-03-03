import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const {refresh,access}=useSelector(state=>state.user)
  const {auth}=useAuth()
  const handleLogout=async()=>{
    const a=await auth('logout')
      // await fetch("http://127.0.0.1:8000/auth/logout_all/",{
      //   method: "POST",
      //   credentials: 'include',
      //   headers: 
      //   {
      //     "Content-type": "application/json; charset=UTF-8",
      //   },
      //   body:JSON.stringify({
      //     "refresh": refresh,
      //  })

      // });
      // console.log("logout çalıştı")
    console.log(a)
  }



  return (
    <>
    {/* Navbar */}
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  {/* Container wrapper */}
  <div className="container">
    {/* Navbar brand */}
    <Link to="/">
    <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height={16} alt="MDB Logo" loading="lazy" style={{marginTop: '-1px'}} />
    </Link>
    
      
   
    {/* Toggle button */}
    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarButtonsExample" aria-controls="navbarButtonsExample" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-bars" />
    </button>
    {/* Collapsible wrapper */}
    <div className="collapse navbar-collapse" id="navbarButtonsExample">
      {/* Left links */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to="/details">
          <span className="nav-link" >Blog Posts</span>
        </Link>
        </li>
      </ul>
      {/* Left links */}
      <div className="d-flex align-items-center">
        {
          refresh ? <Link to="/">
          <button onClick={()=>handleLogout()} type="button" className="btn btn-link px-3 me-2">
            Logout
          </button>
        </Link> :
        <Link to="/login">
        <button  type="button" className="btn btn-link px-3 me-2">
          Login
        </button>
      </Link>
        }
      
        <Link to="/signup">
        <button type="button" className="btn btn-primary me-3">
          Sign up
          
        </button>
        </Link>
        <Link to="/profile">
        <button type="button" className="btn btn-primary me-3 rounded">
          Profile
          
        </button>
        </Link>
        <Link to="/createblog">
        <button type="button" className="btn btn-primary me-3">
          Create Blog
          
        </button>
        </Link>
        
      </div>
    </div>
    {/* Collapsible wrapper */}
  </div>
  {/* Container wrapper */}
</nav>
{/* Navbar */}

    </>
  )
}

export default Navbar