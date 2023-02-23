import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const auth=true;
  return (
    auth ? <Outlet/> : <Navigate to="/"/>
    
  )
}

export default PrivateRouter