import React, { useEffect } from 'react';
import './LandingPage.css';
import { FaBriefcase, FaHandshake, FaChartLine } from 'react-icons/fa';

function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      const line = document.querySelector('.progress-line');
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      line.style.height = `${scrolled}%`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">

      <div>
        <img className='land' src='assets/landing.png' alt="" />
        <h2 className='landSt'>
          Empower Your Professional Journey: 
          <br/>
          <span className="word connect">Connect</span>
          <span className="word collaborate">Collaborate</span>
          <span className="word grow">Grow</span>
        </h2>
      </div>
      <div className="progress-container">
        <div className="progress-line"></div>
        <div className="icons">
          <FaBriefcase className="icon" />
          <FaHandshake className="icon" />
          <FaChartLine className="icon" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
