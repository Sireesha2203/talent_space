import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { webContext } from "./webContext";

// Create the WebStore component
function WebStore({ children }) {
  const [sideBarStatus, setSideBarStatus] = useState(false);

  // Function to check token and fetch user data on initial load
  const changeSideBarStatus = async (state) => {
    setSideBarStatus(state)
  };

  return (
    <webContext.Provider value={[
      sideBarStatus,
      changeSideBarStatus
      ]}>
      {children}
    </webContext.Provider>
  );
}

export default WebStore;
