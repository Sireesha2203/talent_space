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
      <h1>Ongoing Projects</h1>
      {projectData?.map(project => (
        <div className="post" key={project._id}>
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <span className="postUsername">{project.metadata.username}</span>
              <span className="postDate">{project.metadata.post_date}</span>,
              <span className="postDate">{project.metadata.post_time}</span>
            </div>
          </div>
          <div className='postBody'>
            <span className="postText">{project.projectName}</span> {/* Assuming "projectName" is the heading */}
            {/* <div className="postCenter">
              <img src={project.photo_url} alt="" className="postImg" />
            </div> */}
            <div>Required Skills: {project.skills?.map((skill, index) => (
              <Button
                key={index} // Essential for proper rendering and performance
                type="button"
                className="btn btn-dark"
                style={{ marginRight: '5px' }} // Optional spacing between buttons
              >
                {skill}
              </Button>
            ))}
            </div>
            <span className="postText">{project.text}</span>
          </div>
          <div className="postBottom">
            <Button
              style={{ width: "10vw", color: "white" }}
              type="button"
              className="btn btn-primary"
              onClick={handleCollaborate(project._id)}
            >Collaborate</Button>
          </div>
        </div>
        </div>
      ))};
    </div>
  );
};

export default OngoingProj;
