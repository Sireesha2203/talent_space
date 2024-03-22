import React from 'react'
import { loginContext } from "../../contexts/loginContext";
import { useContext } from "react";
import Recruiter from './Recruiter';
import User from './User';
import { useSpring, animated } from 'react-spring';
import { webContext } from '../../contexts/webContext';

function Dashboard() {
  const [
    sideBarStatus,
    changeSideBarStatus
    ] = useContext(webContext);
  changeSideBarStatus(true)
  const [currentUser, , , ,] = useContext(loginContext);
  const fadeOutSlideUpAnimation = useSpring({
    to: async (next) => {
      await next({ opacity: 1, transform: "translateY(0px)" });
    },
    from: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 700 },
  });
    return (
      <div className = " container admin1 p-5">
        <animated.div style={fadeOutSlideUpAnimation}>
          {currentUser.type === "user" ? (
            <div>
              <User />
            </div>
          ) : currentUser.type === "recruiter" ? (
            <div>
              <User />
              <Recruiter />
            </div>
          ) : (
            <div className='mt-5'>
              <h1>User not LoggedIn</h1>
            </div>
          )}
        </animated.div>
      </div>
    );
  }

  export default Dashboard;