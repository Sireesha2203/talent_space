import React from 'react';
import './LandingPage.css';

function LandingPage() {
  return (
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
  )
}

export default LandingPage