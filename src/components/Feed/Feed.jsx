import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

const Feed = () => {
  const [like, setLike] = useState(0); // Initialize like state with 0
  const [postData, setPostData] = useState([]);

  const likeHandler = () => {
    
    setLike(like => (like ? like - 1 : like + 1));
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, []);

  return (
    <div className="feeds">
      <h1>Posts</h1>
      {postData.map(post => (
        <div className="post" key={post._id}>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img src={post.prof_url} alt="" className="postProf" />
                <span className="postUsername">{post.metadata.username}</span>
                <span className="postDate">{post.metadata.post_date}</span>,
                <span className="postDate">{post.metadata.post_time}</span>
              </div>
            </div>
            <div className='postBody'>
                <span className="postText">{post.heading}</span>
                <div className="postCenter">
                <img src={post.photo_url} alt="" className="postImg" />
                </div>
                <span className="postText">{post.text}</span>
            </div>
            <div className="postBottom">
                <div className="reactions">
                    <img src="\assets\Like-Button-.png" onClick={likeHandler} width="25px" alt="" className="likeIcon" />
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="reactions">
                    <img src="\assets\share.png" onClick={likeHandler} width="25px" alt="" className="likeIcon" />
                    <span className="postLikeCounter"> share</span>
                </div>
                
                <div>
                    <img src="\assets\comment.png" onClick={likeHandler} width="25px" alt="" className="likeIcon" />
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
