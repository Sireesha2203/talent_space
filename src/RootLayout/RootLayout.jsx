import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import NavigationBar from "../components/Navbar/NavigationBar";
import Footer from "../components/Footer/Footer";
import "./RootLayout.css";
import { SpinnerDotted } from "spinners-react";
import { ToastContainer } from "react-toastify";


function RouteLayout() {
  const [loading, setLoading] = useState(false);

  return (
    <animated.div>
      {loading ? (
        <div className="containerloading text-center">
          <SpinnerDotted speed={140} thickness={300} enabled={true} />
        </div>
      ) : (
        // Render content once data is loaded
        <div className="content-container rot">
          <div>
              {/* <NavigationBar/> */}

          </div>
          <div className="page">
            {/* Render your components based on designData */}
            <Outlet />
          </div>
          {/* <div className="footer-container">
            <Footer />
          </div> */}
        </div>
      )}
    </animated.div>
  );
}

export default RouteLayout;
