import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, registerUser } from "../auth/authSlice";
import { SET_ALERT } from "../alert/alertSlice";
import Footer from "../footer/Footer";

const Register = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [auth.error, auth.isAuthenticated, props.history]);

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

  /* Handles form submit for user sign-up. Checks that all 
     available fields have been entered, that email is in valid
     format and that both password fields match. If all criteria is met
     dispatch(registerUser) is called. User email is checked against db
     and if not already registered, user will be registered and logged in.
     Any error will be sent as an alert to the user.
  */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const mailformat = /.+@.+\..+/;
    if (name === "" || email === "" || password === "") {
      dispatch(
        SET_ALERT({
          message: "Please enter all available fields.",
          type: "danger",
        })
      );
    } else if (!email.match(mailformat)) {
      dispatch(
        SET_ALERT({
          message: "Please enter a valid email address.",
          type: "danger",
        })
      );
    } else if (password !== password2) {
      dispatch(
        SET_ALERT({ message: "Passwords do not match.", type: "danger" })
      );
    } else {
      dispatch(registerUser({ name, username, email, password }));
      if (typeof auth.error === "string") {
        dispatch(SET_ALERT({ message: auth.error, type: "danger" }));
      }
    }
  };

  return (
    <>
      <div className="container signup">
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
            <button
              className="button btn login-btn mt-3"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
