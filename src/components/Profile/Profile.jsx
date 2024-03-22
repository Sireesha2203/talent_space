import React, { useState,useContext } from 'react';
import axios from 'axios';
import { webContext } from '../../contexts/webContext';

const ProfileBuilder = () => {
  let [sideBarStatus,changeSideBarStatus]=useContext(webContext);
  changeSideBarStatus(true)
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [education, setEducation] = useState('');
  const [projects, setProjects] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [certifications, setCertifications] = useState('');
  const [experience, setExperience] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const userProfile = {
        name,
        about,
        education,
        projects,
        skills: skills.split(','), // Convert skills string to an array
        interests: interests.split(','), // Convert interests string to an array
        certifications,
        experience,
      };

      // Send a POST request to store the user profile in the local database
      const response = await axios.post('http://localhost:4000/MyProf', userProfile);

      // Clear form fields after successful submission
      setName('');
      setAbout('');
      setEducation('');
      setProjects('');
      setSkills('');
      setInterests('');
      setCertifications('');
      setExperience('');

      alert('Profile saved successfully!');
    } catch (error) {
      setError('Error saving profile. Please try again later.');
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">Build Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>About:</label>
              <textarea className="form-control" value={about} onChange={(e) => setAbout(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Education:</label>
              <textarea className="form-control" value={education} onChange={(e) => setEducation(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Projects:</label>
              <textarea className="form-control" value={projects} onChange={(e) => setProjects(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Skills (comma-separated):</label>
              <input type="text" className="form-control" value={skills} onChange={(e) => setSkills(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Interests (comma-separated):</label>
              <input type="text" className="form-control" value={interests} onChange={(e) => setInterests(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Certifications:</label>
              <textarea className="form-control" value={certifications} onChange={(e) => setCertifications(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Experience:</label>
              <textarea className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} required />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileBuilder;
