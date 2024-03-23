import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap'; // Import React Bootstrap components
import { webContext } from '../../contexts/webContext';
import {loginContext} from '../../contexts/loginContext';

const SharePost = () => {
  let [sideBarStatus, changeSideBarStatus] = useContext(webContext);
  changeSideBarStatus(true);
  let[currentUser]=useContext(loginContext)
  const [heading, setHeading] = useState('');
  const [text, setText] = useState('');
  const [photo_url, setImageUrl] = useState('');
  const [tags,setTags]=useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {// Split tags by '#' and remove empty strings and spaces
      let tagsArray = tags.split('#').map(tag => tag.trim()).filter(tag => tag !== '');
    
      const newPost = {
        heading,
        photo_url,
        text,
        metadata: {
          username: `${currentUser.username}`,
          post_date: new Date().toISOString().split('T')[0],
          post_time: new Date().toLocaleTimeString(),
        },
        tags:tagsArray
      };
      
      let token = localStorage.getItem('token')
      // Send a POST request to the JSON Server endpoint to add the new post
      const response = await axios.post('http://localhost:5000/posts-api/create-post', newPost,
      {
        headers:{
          Authorization :`Bearer ${token}`,
        }
      });
      console.log(response)
      // Clear form fields after successful upload
      setHeading('');
      setText('');
      setImageUrl('');
      setTags('');
      alert('Post uploaded successfully!');
    } catch (error) {
      setError('Error uploading post. Please try again later.');
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div>
      <h2>Upload Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formHeading">
          <Form.Label>Heading</Form.Label>
          <Form.Control type="text" value={heading} onChange={(e) => setHeading(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formText">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" value={text} onChange={(e) => setText(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="url" value={photo_url} onChange={(e) => setImageUrl(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formTags">
          <Form.Label>Tags</Form.Label>
          <Form.Control type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Upload Post
        </Button>
      </Form>
    </div>
  );
};

export default SharePost;

