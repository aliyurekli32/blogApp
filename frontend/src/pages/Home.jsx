import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import { getBlog, getCookie } from '../helper/Functions';
import { useSelector } from 'react-redux';

const Home = () => {
 const [posts,setPosts]=useState([])
 const {action}=useSelector(state=>state.user)
  useEffect(()=>{
   getBlog().then(data=>setPosts(data || []))

  },[action])

  const newAccess=async()=>{
    await fetch("http://127.0.0.1:8000/auth/login/refresh/",{
      method: "POST",
      credentials: "include",
      body:JSON.stringify({"refresh":""}),
      headers:{
        "Content-type": "application/json; charset=UTF-8",
    }
    }).then(res=>res.json())
  }

  const handleLogout=async(data)=>{
    const url = data ? "http://127.0.0.1:8000/auth/logout_all/": "http://127.0.0.1:8000/auth/logout/";
    await fetch(url,{
      method: "POST",
      credentials: 'include',
      headers: 
      {
        "Content-type": "application/json; charset=UTF-8",
      },
      body:JSON.stringify({
        "refresh": "refresh",
     })

    });
    console.log("logout çalıştı")

}

console.log(posts)
  
  return (
    <div className="container mt-4">
      <button onClick={()=>newAccess()} >Refresh</button>
      <button onClick={()=>handleLogout()} >Logout</button>
      <button onClick={()=>handleLogout("all")} >LogoutAll</button>
      <button onClick={()=>getCookie()} >Cookie</button>
      <div className="row">
        {posts?.map(post => (
          <Card key={post?.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home