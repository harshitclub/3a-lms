import React from "react";
import "./Navbar.css";
import logoMain from "../../assets/logoMain.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="mainNav">
          <div className="mainNavContainer">
            <div className="mainNavLogo">
              <Link to="/">
                <img src={logoMain} alt="dfhjd" />
              </Link>
            </div>
            <div className="mainNavMenu">
              <Link to="/">Home</Link>
              <Link to="/">Blog</Link>
              <Link to="/">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/">Docs</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
