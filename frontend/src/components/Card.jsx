import React from 'react'
import { postView, sendLikeOrDelete } from '../helper/Functions'
import { useDispatch, useSelector } from 'react-redux'
import { actionGet } from '../store/slices/userSlice'
import { Link } from 'react-router-dom'

const Card = (props) => {
    
   
    const {post}=props
    const {id,access}=useSelector(state=> state.user)
    const dispatch=useDispatch()
 

  const senT=async()=>{

   if(post.likes_n.filter(item=> item.user_id==id).length){
    console.log(post?.likes_n?.filter(item=> item.user_id==id)[0]?.id)
    await sendLikeOrDelete({
      likes_id: post?.likes_n?.filter(item=> item.user_id==id)[0]?.id,
      access: access
    }).then(res=>res)
    dispatch(actionGet())
    
   }else{
    console.log('filternone')
    await sendLikeOrDelete({
      likes: true,
      post_id: post.id,
      user_id: id,
      access: access
    }).then(res=>res)
    dispatch(actionGet())
    

   }
      
  } 
  const dataView={
    access: access,
    user_id: id,
    post_id: post.id
  }
  const handleView=async()=>{
      await postView(dataView).then(res=>res)
      dispatch(actionGet())
  }
  return (
    <>
     <div className="col-lg-4 col-md-6 mb-4 ">
        <div className="card ">
          <div className="view overlay ">
            <img
              className="card-img-top"
              style={{height:"200px"}}
              src={post?.image}
              alt={post?.title}
            />
            <a href="#!">
              <div className=" rgba-white-slight"></div>
            </a>
          </div>
          <div className="card-body">
            <h4 className="card-title">{post?.title}</h4>
            <p className="card-text">{post?.category_name}</p>
            <p className="card-text">{post?.content.slice(0,50)}...</p>
            <Link onClick={()=>{handleView()}} to={`/details/${post?.id}`}>
            <button className="btn btn-primary">Read More</button>
            </Link>
           
            <div className='d-flex justify-content-between align-items-center mt-4'>
              <div>
                <i  onClick={()=>senT()} class="cursor fas fa-thumbs-up fa-lg text-danger me-1"></i>
                <span>{post.likes}</span>
                </div>
              <div className='d-flex justify-content-between align-items-center gap-2' >
              <div>
                <i class="far fa-comment fa-lg text-danger me-1"></i>
                <span>{post.comment_count}</span> 
              </div>
              
              <div>
                <i class="far fa-eye fa-lg text-danger me-1"></i>
                <span>{post.post_views}</span>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card