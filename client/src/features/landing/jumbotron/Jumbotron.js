import React from "react";

const Jumbotron = () => {
  return (
    <div className="container-fluid jumbotron">
      <img src="../logo192.png" className="logo mt-2" alt="vantage-logo" />
      <div className="row">
        <h1 className="welcome">WELCOME TO</h1>
      </div>
      <div className="row">
        <h1 className="welcome gain">VANTAGE</h1>
      </div>
      <div className="row">
        <span className="short-desc">
          <span className="gain">VANTAGE</span> provides up to the minute stock
          market data and news powered by IEX Cloud. Keep an eye on your
          investments and the market from anywhere.
        </span>
      </div>
    </div>
  );
};

export default Jumbotron;
