import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import heroImage from "../../assets/heroImage.png";
import { RiAdminLine, RiUser3Line } from "react-icons/ri";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="heroContainer">
          <div className="heroLeft">
            <h2>Learn Without Limits</h2>
            <p className="heroPara">
              "Empowering Businesses To Educate and Upskill Their Employees with
              our State-of-the-art Learning Management System."
            </p>
            <div className="heroButtons">
              <div className="heroBtn1">
                <p>
                  <span>
                    <Link to="/admin-login">
                      Login As Admin <RiAdminLine className="heroIcons" />
                    </Link>
                  </span>
                </p>
              </div>
              <div className="heroBtn2">
                <p>
                  <span>
                    <Link to="/user-login">
                      Login As User <RiUser3Line className="heroIcons" />
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="heroRight">
            <div className="heroImage">
              <img src={heroImage} alt="hero" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
