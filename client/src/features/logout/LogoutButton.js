import React from "react";

const LogoutButton = ({ logout }) => {
  return (
    <button className="button btn logout-btn" onClick={logout}>
      <i className="fas fa-sign-out-alt" />
    </button>
  );
};

export default LogoutButton;
