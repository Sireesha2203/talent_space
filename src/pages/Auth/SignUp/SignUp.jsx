import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

function SignUp() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignUp = async (userData) => {
    try {
      // Perform signup logic here
      console.log(userData);
      navigate('/login'); // Redirect to login page after signup
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="container p-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-6 col-sm-12 p-4 border bg-white bg-opacity-10 ">
          <div className="card-body">
            <div className="text-center mb-4">
              <h1 className="text-white">Sign Up</h1>
              <p className="text-white">Create your account to get started.</p>
            </div>
            <div className="d-block">
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="mb-3">
                  <FloatingLabel controlId="username" label="Username" className="mb-3">
                    <Form.Control type="text" placeholder="Username" {...register("username")} className="form-control-lg" />
                  </FloatingLabel>
                  {errors.username?.message && (
                    <p className="text-danger">{errors.username?.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <FloatingLabel controlId="email" label="Email" className="mb-3">
                    <Form.Control type="email" placeholder="Email" {...register("email")} className="form-control-lg" />
                  </FloatingLabel>
                  {errors.email?.message && (
                    <p className="text-danger">{errors.email?.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <FloatingLabel controlId="password" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" {...register("password")} className="form-control-lg" />
                  </FloatingLabel>
                  {errors.password?.message && (
                    <p className="text-danger">{errors.password?.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <FloatingLabel controlId="type" label="User Type" className="mb-3">
                    <Form.Select {...register("type")} className="form-control-lg">
                      <option value="user">User</option>
                      <option value="recruiter">Recruiter</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div className="mb-3">
                  <FloatingLabel controlId="profile" label="Profile Picture" className="mb-3">
                    <Form.Control type="file" {...register("profile")} className="form-control-lg" />
                  </FloatingLabel>
                </div>
                <div className="text-center">
                  <Button type="submit" className="col-lg-6 bg-secondary border-secondary fw-bold">
                    Sign Up
                  </Button>
                </div>
              </form>
              <p className="text-white mt-3">
                Already have an account? <NavLink to="/login">Log In</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
