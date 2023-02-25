import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import { getBlog } from '../helper/Functions';
import { useSelector } from 'react-redux';

const Home = () => {
 const [posts,setPosts]=useState([])
 const {action}=useSelector(state=>state.user)
  useEffect(()=>{
   getBlog().then(data=>setPosts(data))

  },[action])

console.log(posts)
  
  return (
    <div className="container mt-4">
      <div className="row">
        {posts?.map(post => (
          <Card key={post?.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home