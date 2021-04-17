import React from "react";

const Footer = () => {
  return (
    <div className="footer p-2">
      <div className="container-fluid">
        <div className="row">
          <p>
            Disclaimer: All data provided is for aggregation purposes only. This
            website does not provide any recommendations or suggestions on any
            stock and has no affiliation with any company or entity.
          </p>
        </div>
        <div className="row">
          <a href="https://iexcloud.io" target="_blank" rel="noreferrer">
            Data provided by IEX Cloud
          </a>
        </div>
        <div className="row">
          <span>Vantage © 2021</span>
        </div>
        <div className="row">
          <a
            href="https://github.com/k1te-m/Ticker-Tracker"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
