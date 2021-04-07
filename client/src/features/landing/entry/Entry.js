import React from "react";
import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div className="container entry">
      <div className="row">
        <div className="col-6">
          <Link to="/register">
            <button className="button btn entry-btn">Sign Up</button>
          </Link>
        </div>
        <div className="col-6">
          <Link to="/login">
            <button className="button btn entry-btn">Login</button>
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-6">
          <img src="https://via.placeholder.com/150" />
        </div>
        <div className="col-6">
          <img src="https://via.placeholder.com/150" />
        </div>
      </div>
    </div>
  );
};

export default Entry;
