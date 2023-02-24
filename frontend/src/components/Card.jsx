import React from 'react'

const Card = (props) => {
    const {post}=props
  return (
    <>
     <div className="col-lg-4 col-md-6 mb-4">
        <div className="card">
          <div className="view overlay">
            <img
              className="card-img-top"
              src={post?.image_url}
              alt={post?.title}
            />
            <a href="#!">
              <div className="mask rgba-white-slight"></div>
            </a>
          </div>
          <div className="card-body">
            <h4 className="card-title">{post?.title}</h4>
            <p className="card-text">{post?.summary}</p>
            <a href={`/blog/${post?.id}`} className="btn btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card