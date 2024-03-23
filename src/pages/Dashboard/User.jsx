import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginContext } from "../../contexts/loginContext";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { webContext } from "../../contexts/webContext";

function User() {
  const [,changeSideBarStatus]=useContext(webContext)
  changeSideBarStatus(true)
  const [userDetails, setUserDetails] = useState({});
  const [editing, setEditing] = useState(true); // State to track whether the user is in editing mode
  const [refresh, setRefresh] = useState(true);
  const [currentUser, , , , logoutUser] = useContext(loginContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [resumeFile, setResumeFile] = useState(null); // State to store the uploaded resume file

  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from the server
    const token = localStorage.getItem("token");
    axios
      .get("/user-api/get-user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Add the new field 'newusername' and set it to the current username
        const userDetailsWithNewUsername = {
          ...response.data.payload,
          newusername: response.data.payload.username,
          oldusertype: response.data.payload.type,
        };
        setUserDetails(userDetailsWithNewUsername);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [refresh]);

  const openModal = () => {
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleFileUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };
  
  const handleSaveResume = async () => {
    if (resumeFile) {
      const formData = new FormData();
      formData.append("resume", resumeFile);
  
      try {
        let token= localStorage.getItem("token");
        const response = await axios.post("/resume-api/parse-resume", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include authorization token if needed
          },
        });
        console.log("Response from server:", response.data);
        // Handle the response as needed
      } catch (error) {
        console.error("Error uploading resume:", error);
        // Handle error
      }
    } else {
      console.error("No file selected");
      // Handle case where no file is selected
    }
  
    // Close the modal after handling the upload
    closeModal();
  };
  
  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSaveChanges = async () => {
    try {
      // Perform save changes logic
      setLoading(true);
      console.log("Save changes:", userDetails);

      // Example: You may want to send an API request to update user data
      const token = localStorage.getItem("token");
      let response=await axios.put("/user-api/update", userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res)=>{  
        setLoading(false);
      }).catch((err)=>{

      });
      // Notify the user about the success
      toast.success("Changes saved successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (userDetails.newusername !== userDetails.username) {
        // Notify the user about the success
        toast.error("Username Change Detected", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        toast.error("Please Login again", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Delay for 3 seconds before logging out and navigating
        setTimeout(() => {
          logoutUser();
          navigate("../login");
        }, 3000);
      }

      setRefresh(!refresh);

      // Exit edit mode after saving changes
      setEditing(!editing);

      if (userDetails.type !== currentUser.type) {
        toast.error("User Type modified", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("../dashboard")
        setTimeout(() => {}, 4000);
      }
    } catch (error) {
      console.error("Error saving changes:", error);

      // Notify the user about the failure
      toast.error("Error saving changes", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const navigateToResetPassword = () => {
    // Navigate to the reset-password page
    navigate("/reset-password");
  };

  return (
    <div className="p-1">
      <h2 className="m-1">Welcome, {userDetails.username}!</h2>
      <img src={userDetails.profilepic} className="rounded" height="100vh" width="100vw"/>
      <hr />
      <div className="p-2">
        <h2>Your Details</h2>
        <>
          <div className="p-3">
            <Button className="btn btn-success" onClick={openModal}>
              Upload Resume
            </Button>
          </div>
          <div className="p-3">
            <Button className="btn btn-success" onClick={()=>navigate('/profile')}>
              Build Profile
            </Button>
          </div>
          {/* Modal for file upload */}
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Upload Resume</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formFile">
                <Form.Label>Select Resume File:</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveResume}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        {editing ? (
          <>
            <div className="p-2">
              <p>
                <strong>Username:</strong> {userDetails.username}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                  <strong>Type:</strong> {userDetails.type}
              </p>
            </div>
            <div className="p-2">
              <Button className="btn btn-success" onClick={handleEdit}>
                Edit Details
              </Button>
            </div>
          </>
        ) : (
          <div className="row">
            <div className="col-lg-3 col-sm-12 col-md-4 p-3">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="search-input form-control me-2"
                placeholder="Username"
                value={userDetails.newusername}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    newusername: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-lg-3 col-sm-12 col-md-4 p-3">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                className="search-input form-control me-2"
                placeholder="Email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>
            <div className="col-lg-3 col-sm-12 col-md-4 p-3">
                <div>
                  <label htmlFor="type">Type:</label>
                  <div>
                    <Form.Select
                      id="type"
                      value={userDetails.type}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, type: e.target.value })
                      }
                    >
                      <option value="user">User</option>
                      <option value="recruiter">Recruiter</option>
                    </Form.Select>
                  </div>
                </div>
            </div>
            <div className="col-lg-2 p-4 m-3">
              <Button className="btn btn-success" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="p-3">
        <Button className="btn btn-success" onClick={navigateToResetPassword}>
          Change Password
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default User;