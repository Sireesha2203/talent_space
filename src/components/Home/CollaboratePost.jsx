import React, { useState } from 'react';
import axios from 'axios';

const CollaboratePost = () => {
  const [projectName, setProjectName] = useState('');
  const [text, setText] = useState('');
  const [skills, setSkills] = useState('');
  const [required, setRequired] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const newCollabPost = {
        id: Math.random().toString(36).substring(7),
        projectName,
        text,
        skills: skills.split(','), // Convert skills string to an array
        required: parseInt(required),
        metadata: {
          username: 'siri',
          post_date: new Date().toISOString().split('T')[0],
          post_time: new Date().toLocaleTimeString(),
        },
      };

      // Send a POST request to the JSON Server endpoint to add the new collaborate post
      const response = await axios.post('http://localhost:4000/collabPosts', newCollabPost);

      // Clear form fields after successful upload
      setProjectName('');
      setText('');
      setSkills('');
      setRequired('');

      alert('Collaborate post uploaded successfully!');
    } catch (error) {
      setError('Error uploading collaborate post. Please try again later.');
      console.error('Error uploading collaborate post:', error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">Collaborate on a Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name:</label>
              <input type="text" className="form-control" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea className="form-control" value={text} onChange={(e) => setText(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Skills Needed (comma-separated):</label>
              <input type="text" className="form-control" value={skills} onChange={(e) => setSkills(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Number of People Required:</label>
              <input type="number" className="form-control" value={required} onChange={(e) => setRequired(e.target.value)} required />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn btn-primary">Upload Collaborate Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollaboratePost;
