import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { webContext } from '../../contexts/webContext';
import { loginContext } from '../../contexts/loginContext';
import { Button } from 'react-bootstrap';

const OngoingProj = () => {
  let [sideBarStatus, changeSideBarStatus] = useContext(webContext);
  let [currentUser]=useContext(loginContext)
  changeSideBarStatus(true);
  const [like, setLike] = useState(0); // Initialize like state with 0
  const [projectData, setProjectData] = useState([]);
  const likeHandler = () => {
    setLike(like => (like ? like - 1 : like + 1));
  };


  const handleCollaborate = async(id)=>{
    let username=currentUser.username
    let token=localStorage.getItem('token')
    const response = await axios.put('/posts-api/collab-req', {id,username},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
  }
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        let token=localStorage.getItem('token')
        const response = await axios.get('/posts-api/posts-get',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        console.log(response.data);
         // Update state with fetched data array
         setProjectData(response.data.projects);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, []);

  return (
    <div className="feeds">
      <h1>Ongoing Projects </h1>
      {projectData?.map(post => (
        <div className="post" key={post._id}>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <span className="postUsername">{post.metadata.username}</span>
                <span className="postDate">{post.metadata.post_date}</span>,
                <span className="postDate">{post.metadata.post_time}</span>
              </div>
            </div>
            <div className='postBody'>
                <span className="postText">{post.heading}</span>
                
                <span className="postText">{post.text}</span>
            </div>
            <div className="postBottom">
                <div>
                    <img src="\assets\comment.png" width="25px" alt="" className="likeIcon" />
                    <span className="postCommentText">{post.collaborators.count} comments</span>
                </div>
                <Button
                style={{ width: "10vw", color: "white" }}
                type="button"
                className="btn btn-primary"
                onClick={handleCollaborate(post._id)}
                >Collaborate</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OngoingProj;
