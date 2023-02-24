import React from 'react'
import Card from '../components/Card';

const Home = (props) => {
  const {posts}=props
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