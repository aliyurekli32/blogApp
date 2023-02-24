import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MDBInput } from "mdbreact"; // import mdbootstrap input component

const CreateBlogCard = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };

  return (
    <Form onSubmit={handleSubmit}>
        
      <MDBInput
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <MDBInput
        label="Subtitle"
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        required
      />
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
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <MDBInput
        label="Image Alt Text"
        type="text"
        value={imageAlt}
        onChange={(e) => setImageAlt(e.target.value)}
        required
      />
      <Button variant="primary" type="submit">
        Create Blog Card
      </Button>
    </Form>
  );
};

export default CreateBlogCard;