import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaHome, FaUsers, FaGraduationCap , FaFileSignature , FaAddressBook, FaUser, FaSearch } from 'react-icons/fa'; // Import icons for navigation links

function TalentSpaceNavbar() {
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
    <Navbar expand="lg" variant="light" className="shadow-sm fixed-top" style={{ backgroundImage: navbarBackground, borderBottom: 'none' }}>
      <Container>
        <Navbar.Brand href="/" className="fw-bold" style={{ color: '#fff' }}>Talent Space</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ms-auto align-items-center position-relative">
            <Button variant="link" onClick={toggleSearch} className="search-icon">
              <FaSearch style={{ color: '#fff' }} />
            </Button>
            <FormControl
              type="search"
              placeholder="Search"
              className={`search-field ${showSearch ? 'visible' : ''}`}
              aria-label="Search"
              style={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.5)' }}
            />
          </Form>
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/" className="fw-bold" style={{ color: '#fff' }}><FaHome className="me-1" /> Home</Nav.Link>
            <Nav.Link href="/network" className="fw-bold" style={{ color: '#fff' }}><FaUsers className="me-1" /> Network</Nav.Link>
            <Nav.Link href="/learning" className="fw-bold" style={{ color: '#fff' }}><FaGraduationCap className="me-1" /> Learning</Nav.Link>
            <Nav.Link href="/profile" className="fw-bold" style={{ color: '#fff' }}><FaUser className="me-1" /> Profile</Nav.Link>
            <Nav.Link href="/login" className="fw-bold" style={{ color: '#fff' }}><FaFileSignature className="me-1" /> Loign</Nav.Link>
            <Nav.Link href="/signup" className="fw-bold" style={{ color: '#fff' }}><FaAddressBook className="me-1" /> Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TalentSpaceNavbar;
