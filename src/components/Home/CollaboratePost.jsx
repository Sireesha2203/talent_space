import React, { useState,useContext } from 'react';
import { webContext } from '../../contexts/webContext';
import axios from 'axios';
import { loginContext } from '../../contexts/loginContext';
import Colabpost from '../images/colabpost.svg'

const CollaboratePost = () => {
  let [sideBarStatus,changeSideBarStatus]=useContext(webContext);
  let [currentUser,]=useContext(loginContext)
  changeSideBarStatus(true)
  const [projectName, setProjectName] = useState('');
  const [text, setText] = useState('');
  const [skills, setSkills] = useState('');
  const [requiredPeople, setrequiredPeople] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const newCollabPost = {
        projectName,
        text,
        skills: skills.split(','), // Convert skills string to an array
        requiredPeople: parseInt(requiredPeople),
        metadata: {
          username: currentUser.username,
          post_date: new Date().toISOString().split('T')[0],
          post_time: new Date().toLocaleTimeString(),
        },
        collaboraters:{
          count: 0,
          users:[]
        }
      };
      
      let token=localStorage.getItem('token')
      // Send a POST request to the JSON Server endpoint to add the new collaborate post
      const response = await axios.post('/posts-api/create-collabPosts', newCollabPost,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log((response))
      // Clear form fields after successful upload
      setProjectName('');
      setText('');
      setSkills('');
      setrequiredPeople('');

      alert('Collaborate post uploaded successfully!');
    } catch (error) {
      setError('Error uploading collaborate post. Please try again later.');
      console.error('Error uploading collaborate post:', error);
    }
  };

  return (
    <div className="container">
    <div>
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">Collaborate on a Project</h2>
        <div>
          <div>          <div><img src={Colabpost} alt="" width='400px'/></div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project title</label>
              <input type="text" className="form-control" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Project Description</label>
              <textarea className="form-control" value={text} onChange={(e) => setText(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Skills Needed (comma-separated)</label>
              <input type="text" className="form-control" value={skills} onChange={(e) => setSkills(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Estimated Number of People</label>
              <input type="number" className="form-control" value={requiredPeople} onChange={(e) => setrequiredPeople(e.target.value)} required />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn btn-primary">Upload Collaborate Post</button>
        </form>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CollaboratePost;
