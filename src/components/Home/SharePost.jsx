import React, { useState , useContext} from 'react';
import axios from 'axios';
import { webContext } from '../../contexts/webContext';

const SharePost = () => {
  let [sideBarStatus,changeSideBarStatus]=useContext(webContext);
  changeSideBarStatus(true)
  const [heading, setHeading] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const newPost = {
        heading,
        photo_url: imageUrl,
        text,
        metadata: {
          username: 'siri',
          post_date: new Date().toISOString().split('T')[0],
          post_time: new Date().toLocaleTimeString(),
        },
        likes: { count: 0, users: [] },
        comments: { count: 0, comments: {} },
      };

      // Send a POST request to the JSON Server endpoint to add the new post
      const response = await axios.post('http://localhost:4000/myPosts', newPost);

      // Clear form fields after successful upload
      setHeading('');
      setText('');
      setImageUrl('');

      alert('Post uploaded successfully!');
    } catch (error) {
      setError('Error uploading post. Please try again later.');
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div>
      <h2>Upload Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Heading:
          <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} required />
        </label>
        <br />
        <label>
          Text:
          <textarea value={text} onChange={(e) => setText(e.target.value)} required />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Upload Post</button>
      </form>
    </div>
  );
};

export default SharePost;
