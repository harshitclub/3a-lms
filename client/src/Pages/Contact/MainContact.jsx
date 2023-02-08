import React from "react";
import "./MainContact.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiMailLine,
  RiTwitterFill,
} from "react-icons/ri";

const MainContact = () => {
  return (
    <>
      <Navbar />
      <div className="mainContact">
        <div className="mainContactContainer1">
          <h3>Welcome to the contact page for learning hat LMS</h3>
          <p>
            If you have any questions or need assistance with using our
            platform, please don't hesitate to reach out to us.
          </p>
          <p>
            Our team is here to help you make the most of your learning
            experience.
          </p>
        </div>
        <div className="mainContactContainer2">
          <form>
            <div>
              <input placeholder="Name*" type="text" />
            </div>
            <div>
              <input placeholder="Company Name" type="text" />
            </div>
            <div>
              <input placeholder="Email*" type="mail" />
            </div>
            <div>
              <input placeholder="Phone*" type="number" />
            </div>
            <div>
              <textarea placeholder="Enter Your Message*" rows="5" cols="70" />
            </div>

            <div className="mainContactLinks">
              <div>
                <button type="submit">Send</button>
              </div>
              <div className="mainContactSocialLinks">
                <div className="mainCSLIconsP">
                  <RiFacebookFill className="mainCSLIcons" />
                </div>
                <div className="mainCSLIconsP">
                  <RiLinkedinFill className="mainCSLIcons" />
                </div>
                <div className="mainCSLIconsP">
                  <RiMailLine className="mainCSLIcons" />
                </div>
                <div className="mainCSLIconsP">
                  <RiTwitterFill className="mainCSLIcons" />
                </div>
                <div className="mainCSLIconsP">
                  <RiInstagramLine className="mainCSLIcons" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainContact;
