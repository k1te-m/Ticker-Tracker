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
      <div className="row row-cols-2 mt-4">
        <img src="https://via.placeholder.com/150" />

        <img src="https://via.placeholder.com/150" />
      </div>
    </div>
  );
};

export default Entry;
