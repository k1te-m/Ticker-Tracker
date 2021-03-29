import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";

const Register = () => {
  const [userObject, setUserObject] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, username, email, password, password2 } = userObject;

  // Handles input changes for all form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserObject({ ...userObject, [name]: value });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h3>Create your account</h3>
        </div>
        <div className="row">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="name"
                placeholder="Kelly Smith"
                type="text"
              />
              <label htmlFor="username">Username</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="username"
                placeholder="ksmithdev"
                type="text"
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="email"
                placeholder="ksmith@gmail.com"
                type="email"
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="password"
                placeholder="Password"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <input
                onChange={handleInputChange}
                className="form-control"
                name="password2"
                placeholder="Confirm Password"
                type="password"
              />
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
