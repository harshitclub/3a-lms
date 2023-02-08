import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footerContainer">
          <div className="footerLeft">
            <p>© 2023 Learning Hat LMS Pvt. Ltd | All Rights Reserved.</p>
          </div>
          <div className="footerRight">
            <Link to="/">Privacy & Policy</Link>
            <Link to="/">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
