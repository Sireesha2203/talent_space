import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaHome, FaUsers, FaGraduationCap , FaFileSignature , FaAddressBook, FaUser, FaSearch } from 'react-icons/fa'; // Import icons for navigation links
import { Link } from 'react-router-dom';
import { loginContext } from '../../contexts/loginContext';

function TalentSpaceNavbar() {
  let [,,userLoginStatus,,logoutUser]=useContext(loginContext)
  const [showSearch, setShowSearch] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState('transparent');

  useEffect(() => {
    const changeNavbarBackground = () => {
      if (window.scrollY >= 50) {
        setNavbarBackground('linear-gradient(to right, #0F2027, #203A43, #2C5364)'); // Change background color when scrolling down
      } else {
        setNavbarBackground('transparent'); // Change background color when scrolling up
      }
    };

    window.addEventListener('scroll', changeNavbarBackground);

    return () => {
      window.removeEventListener('scroll', changeNavbarBackground);
    };
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <Navbar expand="lg" variant="light" className="shadow-sm fixed-top" style={{ background: '#59045e', borderBottom: 'none' }}>
      <Container>
        <Navbar.Brand href="/" className="fw-bold" style={{ color: '#fff' }}>Talent Space</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ms-auto align-items-center position-relative">
            <Button variant="link" onClick={toggleSearch} className="search-icon">
              <FaSearch style={{ color:'white' }} />
            </Button>
            <FormControl
              type="search"
              placeholder="Search"
              className={`search-field ${showSearch ? 'visible' : ''}`}
              aria-label="Search"
              style={{ color: 'white', backgroundColor: 'white', borderColor: 'white' }}
            />
          </Form>
          <Nav className="ms-auto align-items-center">
          <Link to="/" className="fw-bold nav-link" style={{ color: '#fff' }}><FaHome className="me-1" /> Home</Link>
            <Link to="/network" className="fw-bold nav-link" style={{ color: '#fff' }}><FaUsers className="me-1" /> Network</Link>
            <Link to="/learning" className="fw-bold nav-link" style={{ color: '#fff' }}><FaGraduationCap className="me-1" /> Learning</Link>
            <Link to="/profile" className="fw-bold nav-link" style={{ color: '#fff' }}><FaUser className="me-1" /> Profile</Link>
            {!userLoginStatus?
            <>
            <Link to="/login" className="fw-bold nav-link" style={{ color: '#fff' }}><FaFileSignature className="me-1" /> Login</Link>
            <Link to="/signup" className="fw-bold nav-link" style={{ color: '#fff' }}><FaAddressBook className="me-1" /> Sign Up</Link>
            </>
            :
            <Link to="/login" className="fw-bold nav-link" style={{ color: '#fff' }} onClick={()=>logoutUser()}><FaFileSignature className="me-1" /> Logout</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TalentSpaceNavbar;
