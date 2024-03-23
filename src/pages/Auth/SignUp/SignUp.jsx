import React, { useContext , useEffect , useState } from 'react'

import axios from "axios";

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";

import { webContext } from '../../../contexts/webContext';




function SignUp() {

    let [

      sideBarStatus,

      changeSideBarStatus

      ] = useContext(webContext);

    changeSideBarStatus(false)

    const [refresh, setRefresh] = useState(false);

    const [newUser,setNewUser] = useState({});

    //use form hook

    let {

      register,

      handleSubmit,

      formState: { errors },

    } = useForm();

    let [selectedFile,setSelectedFile]=useState(null);

    const onFileSelect=(e)=>{

      setSelectedFile(e.target.files[0])

     }

    let navigate=useNavigate();

    const handleAddUser = async () => {

        try {




          let fd=new FormData();

          //append selected file to form data

          fd.append("photo",selectedFile)

          await axios.post('/user-api/upload-file',fd)

          .then(res=>{

            newUser.profilepic=res.data.filePath;

          })

          // Validate the new user object

          if (!newUser.username || !newUser.email || !newUser.type || !newUser.password || !newUser.profilepic) {

            toast.error('Please fill in all fields', {

              position: 'top-center',

              autoClose: 5000,

              hideProgressBar: false,

              closeOnClick: true,

              pauseOnHover: true,

              draggable: true,

              progress: undefined,

              theme: 'light',

            });

            return;

          }

          // Send the new user object to the backend

          const response = await axios.post('/user-api/user-signup', newUser);

          // Handle the response

          console.log(response); // Log the response message or handle it accordingly

          // Trigger a refresh to update the user list

          setRefresh(!refresh);




          // Close the add user form




          // Notification using react-toastify

          toast.success(response.data.message, {

            position: "top-center",

            autoClose: 5000,

            hideProgressBar: false,

            closeOnClick: true,

            pauseOnHover: true,

            draggable: true,

            progress: undefined,

            theme: "light",

          });

          setTimeout(() => {




          }, 3000);

          navigate('/login')

        } catch (error) {

          console.error('Error adding user:', error);

          // Handle error (e.g., show an error message to the user)

          toast.error(error.message, {

            position: 'top-center',

            autoClose: 5000,

            hideProgressBar: false,

            closeOnClick: true,

            pauseOnHover: true,

            draggable: true,

            progress: undefined,

            theme: 'light',

          });

        }

      };

      return (

        <div>

          <ToastContainer />

          <div>

            <h1>Sign Up</h1>

              <div className="signup-form">

                <form>

                  <div className="mb-3">

                    <label htmlFor="username" className="form-label">

                      Username

                    </label>

                    <input

                      type="text"

                      className="form-control"

                      id="username"

                      value={newUser.username}

                      onChange={(e) =>

                        setNewUser({ ...newUser, username: e.target.value })

                      }

                    />

                  </div>

                  <div className="mb-3">

                    <label htmlFor="email" className="form-label">

                      Email

                    </label>

                    <input

                      type="email"

                      className="form-control"

                      id="email"

                      value={newUser.email}

                      onChange={(e) =>

                        setNewUser({ ...newUser, email: e.target.value })

                      }

                    />

                  </div>

                  <div className="mb-3">

                    <label htmlFor="type" className="form-label">

                      Type

                    </label>

                    <select

                      className="form-select"

                      id="type"

                      value={newUser.type}

                      onChange={(e) =>

                        setNewUser({ ...newUser, type: e.target.value })

                      }

                    >

                      <option disabled selected>Select User Type</option>

                      <option value="user">User</option>

                      <option value="recruiter">Recruiter</option>

                    </select>

                  </div>

                  <div className="mb-3">

                    <label htmlFor="password" className="form-label">

                      Password

                    </label>

                    <input

                      type="password"

                      className="form-control"

                      id="password"

                      value={newUser.password}

                      onChange={(e) =>

                        setNewUser({ ...newUser, password: e.target.value })

                      }

                    />

                  </div>

                  <div className="mb-3">

                    <label htmlFor="profile" className="form-label">

                      Profile

                    </label>

                    <input

                      type="file"

                      id="image"

                      className="form-control"

                      {...register("image", { required: true })}

                      onInput={onFileSelect}

                    />

                    <input type="image" src="" alt="" />

                  </div>

                </form>

              </div>

              <Button

                style={{ width: "10vw", color: "white" }}

                type="button"

                className="btn btn-primary"

                onClick={handleAddUser}

              >

                SignUp

              </Button>

            </div>


        </div>

      );



}




export default SignUp