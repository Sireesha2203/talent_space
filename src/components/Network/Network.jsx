import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { webContext } from '../../contexts/webContext';

const Network = () => {
  
  const [,changeSideBarStatus]=useContext(webContext)
  changeSideBarStatus(true)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let token=localStorage.getItem('token')
    const fetchData = async () => {
      try {
        const response = await axios.get('/user-api/get-users',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        setUsers(response.data.payload);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1>Network</h1>
      <Row>
        {users?.map(user => (
          <Col sm={4} key={user._id.$oid}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={user.profilepic} height="20px" width="20px" />
              <Card.Body>
                <Card.Title>{user.full_name}</Card.Title>
                <Card.Text>{user.summary}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Network;