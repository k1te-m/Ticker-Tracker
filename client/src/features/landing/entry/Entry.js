import React from "react";
import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div className="container entry mt-4">
      <div className="row">
        <div className="col-6">
          <Link to="/register">
            <button className="button btn entry-btn">Register</button>
          </Link>
        </div>
        <div className="col-6">
          <Link to="/login">
            <button className="button btn entry-btn">Login</button>
          </Link>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col col-lg-7">
          <img
            src="../images/vantage.png"
            className="landing-img"
            alt="VANTAGE"
          />
        </div>
        <div className="col col-lg-5">
          <p className="description">
            <span className="gain">VANTAGE</span> provides the most up to date
            stock information available along with detailed news to keep you in
            the know. Simply enter a stock ticker and hit search to begin
            tracking your favorite companies. Register now to add companies to
            your watch list and access even more market data. With{" "}
            <span className="gain">VANTAGE</span> the market is at your
            fingertips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Entry;
