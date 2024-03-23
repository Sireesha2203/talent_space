import React, { useState,useContext } from 'react';
import axios from 'axios';
import Feed from '../Feed/Feed'
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { webContext } from '../../contexts/webContext';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleShareClick = () => {
    setShowForm(true);
    navigate('/Sharepost');
  };

  const handleOptionClick = (option) => {
    // Handle option click
    console.log('Option clicked:', option);
    navigate('/CollaboratePost');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/Sharepost');
    // Your post upload logic here
  };

  return (
    <div>
    <div className="HomeContainer">
      
      <div className="profile-card">
        <div className="profile-info">
          <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Profile" className="profile-picture" />
          <div className="share-field" onClick={handleShareClick}>
            Share your post...
          </div>
        </div>
        <div className="options">
          <button className="option-btn" onClick={() => handleShareClick('personal')}>Personal</button>
          <button className="option-btn" onClick={() => handleShareClick('jobs')}>Jobs</button>
          <button className="option-btn" onClick={() => handleOptionClick('collaborate')}>Collaborate</button>
        </div>
      </div>
      {showForm && (
        <div className="post-form">
          <h2 className="form-title">Upload Post</h2>
          <form onSubmit={handleSubmit} className="form">
            {/* Form fields */}
          </form>
        </div>
      )}

      <div> 
      </div>
    
    </div>
    <Feed/>
    </div>
    
  );
};

export default Home;
