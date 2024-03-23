import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaAngellist } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar bg-light text-purple">
        <Link to='https://talk-time.netlify.app/chats' className='sidebar-link'>
        <p className="text-center py-4 sidebar-item"><FaAngellist />Chats</p>
        </Link>
        <Link to="/request-feature" className="sidebar-link">
          <p className="sidebar-item">Request a feature</p>
        </Link>
        <Link to="/CollaboratePost" className="sidebar-link">
          <p className="sidebar-item">Host a project</p>
        </Link>
        <Link to="/funds" className="sidebar-link">
          <p className="sidebar-item">Funds</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
