import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import footerImg from "/src/assets/footer_img.png";

const Footer = () => {
  return (
    <div
      className="footer"
      id="footer"
      style={{ backgroundImage: `url(${footerImg})` }}
    >
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Hungry? Order now to get your food delivered in less than 30 minutes
            – guaranteed
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="fb" />
            <img src={assets.twitter_icon} alt="fb" />
            <img src={assets.linkedin_icon} alt="fb" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-49549309530</li>
            <li>contact@plated.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Plated.com. -All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
