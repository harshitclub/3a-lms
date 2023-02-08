import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UMain.css";
import { Link } from "react-router-dom";

import {
  RiAdminFill,
  RiBuilding4Fill,
  RiCheckboxCircleFill,
  RiFileCopy2Fill,
  RiFileUserFill,
  RiLoginBoxFill,
  RiMailFill,
  RiQuestionnaireFill,
  RiRestartFill,
  RiShieldUserFill,
  RiStackFill,
  RiTimeFill,
  RiTrophyFill,
} from "react-icons/ri";

const UMain = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

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
        navigate("/user-login");
      } else {
        setUser(data.data);
      }
    }
    userAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="uMain">
        {/* -------------------------- */}
        <div className="uMainHead">
          <h4>Dashboard /</h4>
        </div>
        <hr />
        {/* --------------------------------- */}
        <div className="uMainContainer">
          <div className="uMainTab1">
            <div className="uMainTab1Box">
              <div>
                <RiFileCopy2Fill className="uMainTab1Icon" />
              </div>
              <div>
                <h4>Courses</h4>
                <p>1</p>
              </div>
            </div>
            <div className="uMainTab1Box">
              <div>
                <RiRestartFill className="uMainTab1Icon" />
              </div>
              <div>
                <h4>Started</h4>
                <p>1</p>
              </div>
            </div>
            <div className="uMainTab1Box">
              <div>
                <RiTrophyFill className="uMainTab1Icon" />
              </div>
              <div>
                <h4>Achievements</h4>
                <p>1</p>
              </div>
            </div>
            <div className="uMainTab1Box">
              <div>
                <RiLoginBoxFill className="uMainTab1Icon" />
              </div>
              <div>
                <h4>Last Login</h4>
                <p>14-Nov-2022 04:01 PM</p>
              </div>
            </div>
          </div>
          {/* ----------------------- */}
          <div className="uMainTab2">
            <div className="uMainTab2Box1">
              <h4>My Information /</h4>
              <table>
                <tbody>
                  <tr className="trNoBorder">
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td className="tdBold">
                      <RiFileUserFill className="uMTIcons" /> Name
                    </td>
                    <td>{user ? user.name : "Loading..."}</td>
                  </tr>
                  <tr>
                    <td className="tdBold">
                      <RiMailFill className="uMTIcons" /> Email
                    </td>
                    <td>{user ? user.email : "Loading..."}</td>
                  </tr>
                  <tr>
                    <td className="tdBold">
                      <RiShieldUserFill className="uMTIcons" /> Username
                    </td>
                    <td>{user ? user.username : "Loading..."}</td>
                  </tr>
                  <tr>
                    <td className="tdBold">
                      <RiBuilding4Fill className="uMTIcons" /> Company
                    </td>
                    <td>{user ? user.company : "Loading..."}</td>
                  </tr>
                  <tr>
                    <td className="tdBold">
                      <RiAdminFill className="uMTIcons" /> Role
                    </td>
                    <td>{user ? user.role : "Loading..."}</td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
              <Link to="/user-profile" className="uMainTab2Box1Link">
                All Information
              </Link>
            </div>
            <div className="uMainTab2Box2">
              <div className="uMainTab2BoxProfile">
                <h4>My Data /</h4>
                <table>
                  <tr>
                    <td>
                      {" "}
                      <RiStackFill className="uMainTab2PIcon" /> Assigned
                      Courses
                    </td>
                    <td className="tdgrey">|</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>
                      <RiTimeFill className="uMainTab2PIcon" /> Pending Courses
                    </td>
                    <td className="tdgrey">|</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>
                      <RiCheckboxCircleFill className="uMainTab2PIcon" />{" "}
                      Complete Courses
                    </td>
                    <td className="tdgrey">|</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>
                      <RiQuestionnaireFill className="uMainTab2PIcon" />{" "}
                      Complete Quiz
                    </td>
                    <td className="tdgrey">|</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>
                      <RiTrophyFill className="uMainTab2PIcon" /> Certifications
                    </td>
                    <td className="tdgrey">|</td>
                    <td>3</td>
                  </tr>
                </table>
                <Link to="/user-activities">All Activities</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UMain;
