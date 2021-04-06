import React from "react";

const Footer = () => {
  return (
    <div className="footer p-2">
      <div className="container-fluid">
        <div className="row">
          <a href="https://iexcloud.io" target="_blank" rel="noreferrer">
            Data provided by IEX Cloud
          </a>
        </div>
        <div className="row">
          <span>Ticker Tracker © 2021</span>
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
