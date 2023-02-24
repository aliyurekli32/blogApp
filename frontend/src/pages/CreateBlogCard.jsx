import { useState } from "react";
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit'; // import mdbootstrap input component

const CreateBlogCard = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

 // title, content, image, category , 
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };
  console.log(category)
  return (
    <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
        
        <MDBInput
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select onChange={(e)=>setCategory(e.target.value)} class="form-select" aria-label="Default select example">
          <option value={"Zero"}>Zero</option> 
          <option value={"One"}>One</option> 
        </select>
        <MDBInput
          label="Content"
          type="textarea"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <MDBInput
          label="Image URL"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
       
        <MDBBtn variant="primary" type="submit">
          Create Blog Card
        </MDBBtn>
      </form>
    </div>
    
  );
};

export default CreateBlogCard;