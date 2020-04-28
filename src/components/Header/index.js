import React from "react";
import logo from "../../assets/images/healthifyme.png";

export default function Header() {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img className="main-logo" src={logo} alt="logo" />
      </div>
      <div className="nav-links">
        <div style={{ fontSize: "1.2rem" }}>Accounts</div>
      </div>
    </div>
  );
}
