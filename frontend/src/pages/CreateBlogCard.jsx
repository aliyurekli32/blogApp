import { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit'; // import mdbootstrap input component
import { createBlog, getCategory } from "../helper/Functions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlogCard = () => {
  const navigate=useNavigate()
  const {access}=useSelector(state=>state.user);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCat,setSelectedCat]=useState(1)
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

 

      useEffect(() => {
    
      getCategory().then(res=>setCategory(res))


        
        

      }, [])
  

 // title, content, image, category , 
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data={
      access: access,
      title: title,
      category: selectedCat,
      content: content,
      image: image
    }
    // handle form submission here
    await createBlog(data)
    navigate("/")

  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
        <div className="form-outline  mb-4">
                  <input  onChange={(e) => setTitle(e.target.value)} value={title}  type="text" id="typeTextX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeTextX">Title</label>
        </div>
       
        <select onChange={(e)=>setSelectedCat(e.target.value)} class="form-select" aria-label="Default select example">
          {
            category.map(item=>{
              return(
                
                 <option key={item.id} value={item?.id}>{item?.name}</option> 
               
              )
            })
          }
         

        </select>
        <div className="form-outline  mb-4">
                  <input  onChange={(e) => setContent(e.target.value)} value={content}  type="text" id="typeTextX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeTextX">Content</label>
        </div>
        <div className="form-outline  mb-4">
                  <input  onChange={(e) => setImage(e.target.value)} value={image}  type="text" id="typeTextX" className="form-control form-control-lg border mb-4" />
                  <label className="form-label " htmlFor="typeTextX">Image URL</label>
        </div>
        
        <button  className="btn btn-outline-light btn-primary btn-lg px-5" type="submit">Create Blog Card</button>
        
      </form>
    </div>
    
  );
};

export default CreateBlogCard;