import React from 'react'
import { sendLikeOrDelete } from '../helper/Functions'
import { useDispatch, useSelector } from 'react-redux'
import { actionGet } from '../store/slices/userSlice'

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
    }).then(res=>dispatch(actionGet()))
    
   }else{
    console.log('filternone')
    await sendLikeOrDelete({
      likes: true,
      post_id: post.id,
      user_id: id,
      access: access
    }).then(res=>dispatch(actionGet()))
    

   }
      
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
            
            <a href={`/blog/${post?.id}`}  className="btn btn-primary">
              Read more
            </a>
            <div className='d-flex justify-content-between align-items-center mt-4'>
              <div onClick={()=>senT()} ><i   class="fas fa-thumbs-up fa-lg text-danger"></i></div>
              <div className='d-flex justify-content-between align-items-center gap-2' >
              <div><i class="far fa-comment fa-lg text-danger"></i></div>
              
              <div><i class="far fa-eye fa-lg text-danger"></i></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card