import React from "react";
import "./ADashboard.css";
import ASidebar from "../ASidebar/ASidebar";
import ANavbar from "../ANavbar/ANavbar";
import AMain from "../AMain/AMain";
import "react-toastify/dist/ReactToastify.css";
import useRedirectLoggedOutUser from "../../customHooks/useRedirectLoggedOutUser";

const ADashboard = () => {
  useRedirectLoggedOutUser("/");
  return (
    <>
      <div className="aDashboard">
        <div className="aNavbar">
          <ANavbar />
        </div>
        <div className="aMain">
          <AMain />
        </div>
        <div className="aSidebar">
          <ASidebar />
        </div>
      </div>
    </>
  );
};

export default ADashboard;
