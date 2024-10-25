import React, { useEffect } from 'react';
import './LandingPage.css';
import { FaBriefcase, FaHandshake, FaChartLine } from 'react-icons/fa';

function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      const line = document.querySelector('.progress-line');
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 140;
      line.style.height = `${scrolled}%`;

      // Cards animation on scroll
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        const cardOffset = card.offsetTop;
        if (scrollTop > cardOffset - window.innerHeight + 200) {
          card.classList.add('visible');
        } else {
          card.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <div className='one m-5'>
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
        <div className="cards">
          <div className="card">
            <h3>Discover</h3>
            <p>Explore a diverse network of professionals across various industries. Use advanced search filters to find experts, potential mentors, and peers who align with your career goals and interests. Stay updated with the latest trends and insights from industry leaders.</p>
          </div>
          <div className="card">
            <h3>Connect with People Who Can Help</h3>
            <p>Build meaningful relationships with professionals who can provide career guidance and support. Engage in one-on-one mentoring sessions, participate in group discussions, and attend virtual networking events to expand your professional circle.</p>
          </div>
          <div className="card">
            <h3>Learn the Skills You Need to Succeed</h3>
            <p>Gain access to a comprehensive learning platform featuring courses, webinars, and tutorials tailored to your career path. From soft skills to technical expertise, our resources are designed to help you stay competitive and excel in your field.</p>
          </div>
          <div className="card">
            <h3>Skill Sharing</h3>
            <p>Contribute to the community by sharing your knowledge and experience. Create and join skill-sharing sessions, write articles, and participate in forums to both teach and learn from fellow professionals.</p>
          </div>
          <div className="card">
            <h3>Collaborate with Ongoing Projects</h3>
            <p>Engage with live projects that need your expertise. Whether it's a short-term task or a long-term collaboration, our platform connects you with opportunities to apply your skills and gain practical experience while working alongside talented professionals.</p>
          </div>
          <div className="card">
            <h3>Funding</h3>
            <p>Access a variety of funding options to support your projects and business ventures. Connect with investors, apply for grants, and participate in crowdfunding campaigns to bring your innovative ideas to life.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
