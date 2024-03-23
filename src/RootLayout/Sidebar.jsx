import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaAngellist } from "react-icons/fa6";
import { MdFeaturedPlayList } from "react-icons/md";
import { SiBisecthosting } from "react-icons/si";
import { RiFundsFill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar bg-light text-purple">
        <Link to='https://talk-time.netlify.app/chats' className='sidebar-link'>
        <p className="text-center py-4 sidebar-item"><FaAngellist className='me-1' />Chats</p>
        </Link>
        <Link to="/form2" className="sidebar-link">
          <p className="sidebar-item"><MdFeaturedPlayList  className='me-1'/>Request a feature</p>
        </Link>
        <Link to="/CollaboratePost" className="sidebar-link">
          <p className="sidebar-item"><SiBisecthosting className='me-1'/>Host a project</p>
        </Link>
        <Link to="/funds" className="sidebar-link">
          <p className="sidebar-item"><RiFundsFill className='me-1'/>Funds</p>
        </Link>
        <Link to='/ongoing' className='sidebar-link' >
          <p className='sidebar-item'><GrProjects className='me-1'/>Ongoing Projects</p>
          </Link>
      </div>
    </div>
  );
};

export default Sidebar;
