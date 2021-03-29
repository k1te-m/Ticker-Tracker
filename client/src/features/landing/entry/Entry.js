import React from "react";

const Entry = () => {
  return (
    <div className="container entry">
      <div className="row">
        <div className="col-6">
          <button className="button">Sign Up</button>
        </div>
        <div className="col-6">
          <button className="button">Login</button>
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
