import React from "react";
import playstore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Donwload App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first proority</p>

        <p>Copyright 2001 &copy; MeAakashThapa</p>
      </div>

      <div className="rightFooter">
        <h4> Follow Us</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://facebook.com">facebook</a>
        <a href="http://Youtube.com">Youtube</a>
      </div>
    </footer>
  );
};

export default Footer;
