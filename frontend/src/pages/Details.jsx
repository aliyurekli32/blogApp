import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatDate, sendComment, sendLikeOrDelete } from '../helper/Functions'
import { actionGet } from '../store/slices/userSlice'
import useApi from '../hooks/useApi'

const Details = () => {
  const {getData}=useApi()
  const [post,setPost]=useState({})
  const [showComment,setShowComment]=useState(false)
  const [comment,setComment]=useState("")
  const dispatch=useDispatch()
  const {action,access,id,superA}=useSelector(state=>state.user)

const params=useParams()
console.log(params)


// const getBlog=async()=>{
// await fetch(`http://127.0.0.1:8000/api/blogs/${params.id}/`,{
//   method: "GET",
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",

// }
// }).then(res=>res.json()).then(data=>setPost(data))
// }


  useEffect(()=>{
    getData("api/blogs", params.id).then(data=>setPost(data))
  },[action])


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


const makeComment=async()=>{
    const data={
      comment,
      access,
      user_id: id,
      post_id: post.id
    };
    await sendComment(data)

}
  return (
    <div className='d-flex justify-content-center '>
      <div className="col-lg-6 col-md-6 mb-4 p-4">
        <div className="card">
          <div className="view overlay">
            <img
              className="card-img-top"
              src={post?.image}
              alt={post?.title}
            />
            <a href="#!">
              <div className="rgba-white-slight"></div>
            </a>
          </div>
          <div className="card-body">
            <h4 className="card-title">{post?.title}</h4>
            <h4 className="card-title">{ formatDate(post?.publish_date)}</h4>
            <h4 className="card-title left">Created by {post?.author}</h4>
            <p className="card-text">{post?.content}</p>
            

            <div className='d-flex justify-content-between align-items-center mt-4'>
              <div>
                <i onClick={()=>senT()} class="cursor fas fa-thumbs-up fa-lg text-danger me-1"></i>
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
            {
                (id==post.author_id || superA)  && 
                <div className='d-flex justify-content-start'>
              
                <button className='btn btn-success'>Update</button>
                <button className='btn btn-danger'>Delete</button>
                <button onClick={()=>{setShowComment(!showComment)}} className='btn btn-info'>Make Comment</button>
                </div>
                
            }
            {
              showComment&&
              <>
                <div className="form-outline mt-4 mb-4">
                  <textarea onChange={(e)=>setComment(e.target.value)} value={comment} name="comment" id="typeCommentX" cols="5" rows="5" className="form-control form-control-lg border mb-4"></textarea>
                  <label className="form-label " htmlFor="typeCommentX">Comment</label>
                </div>
                <button onClick={()=>makeComment()} className='btn btn-info'>Post comment</button>
              </>
            }
            
            
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details