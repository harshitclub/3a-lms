import React from "react";
import "./UDashboard.css";

import USidebar from "../USidebar/USidebar";
import UNavbar from "../UNavbar/ANavbar";
import UMain from "../UMain/UMain";

const UDashboard = () => {
  return (
    <>
      <div className="uDashboard">
        <div className="uNavbar">
          <UNavbar />
        </div>
        <div className="uMain">
          <UMain />
        </div>
        <div className="uSidebar">
          <USidebar />
        </div>
      </div>
    </>
  );
};

export default UDashboard;
