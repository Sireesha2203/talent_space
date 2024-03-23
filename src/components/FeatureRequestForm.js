import React, { useState,useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { loginContext } from '../contexts/loginContext';

const FeatureRequestForm = () => {  
  const [currentUser, , , , ] = useContext(loginContext);
  const [featureRequest, setFeatureRequest] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post data to Axios or your preferred API endpoint
      // Fetch user details from the server
      const token = localStorage.getItem("token");
      axios
      .get("/user-api/request-feature",{email:currentUser.email,mail:featureRequest}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Clear the form after successful submission
      setFeatureRequest('');
      alert('Feature request submitted successfully!');
    } catch (error) {
      console.error('Error submitting feature request:', error);
      alert('Error submitting feature request. Please try again later.');
    }
  };

  return (
    <Container>
      <h2 className="mt-5 mb-4">Request a Feature</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="featureRequestTextArea">
          <Form.Label>Your Feature Request:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={featureRequest}
            onChange={(e) => setFeatureRequest(e.target.value)}
            placeholder="Enter your feature request here"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FeatureRequestForm;