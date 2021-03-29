import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";

const Login = (props) => {
  // State Object for user email and password inputs
  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userObject;

  // Handles input changes for email/password inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserObject({ ...userObject, [name]: value });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h3>Account Log In</h3>
        </div>
        <div className="row">
          <form>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              onChange={handleInputChange}
              name="email"
              placeholder="ksmith@gmail.com"
              type="email"
            />
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              onChange={handleInputChange}
              name="password"
              placeholder="password"
              value={password}
              type="password"
            />
            <button className="button">Log in</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
