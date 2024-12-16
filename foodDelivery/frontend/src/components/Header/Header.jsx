import React from "react";
import "./Header.css";
import headerImg from "/src/assets/header_img.png";
const Header = () => {
  return (
    <div className="header" style={{ backgroundImage: `url(${headerImg})` }}>
      <div className="header-contents">
        <h2>Satisfy your cravings</h2>
        <p>Filling your tummy on time is what we care about.</p>
        <button
          onClick={() => {
            window.location.href = "#explore-menu";
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
