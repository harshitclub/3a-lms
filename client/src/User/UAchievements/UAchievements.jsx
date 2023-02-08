import React, { useEffect } from "react";
import USidebar from "../USidebar/USidebar";
import UNavbar from "../UNavbar/ANavbar";
import "./UAchievements.css";
import { Navigate } from "react-router-dom";

const UAchievements = () => {
  useEffect(() => {
    async function userAuth() {
      const response = await fetch("/user-auth", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      const data = await response.json();

      if (data.status === "400") {
        Navigate("/user-login");
      }
    }
    userAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="uDashboard">
        <div className="uNavbar">
          <UNavbar />
        </div>
        <div className="uMain"></div>
        <div className="uSidebar">
          <USidebar />
        </div>
      </div>
    </>
  );
};

export default UAchievements;
