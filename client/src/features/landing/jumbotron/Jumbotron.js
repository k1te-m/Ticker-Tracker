import React from "react";

const Jumbotron = () => {
  return (
    <div className="container-fluid jumbotron">
      <img src="../logo192.png" className="logo mt-2" />
      <div className="row">
        <h1 className="welcome">WELCOME TO</h1>
      </div>
      <div className="row">
        <h1 className="welcome gain">ESPY</h1>
      </div>
      <div className="row">
        <span className="short-desc">
          <span className="gain">ESPY</span> provides up to the minute stock
          market data and news powered by IEX Cloud. Create an account to begin
          watching and tracking your portfolio.
        </span>
      </div>
    </div>
  );
};

export default Jumbotron;
