import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AViewProfile.css";
import { Link } from "react-router-dom";
import {
  TbAt,
  TbBuilding,
  TbBusinessplan,
  TbCalendarTime,
  TbEye,
  TbPencil,
  TbPhone,
  TbUser,
} from "react-icons/tb";
import {
  BsGlobe2,
  BsFileEarmarkZip,
  BsFillGeoAltFill,
  BsFillGeoFill,
  BsFillMapFill,
  BsGlobe,
} from "react-icons/bs";
// import Logo from "../../../assets/logoMain.png";
import {
  RiBookletLine,
  RiBookReadFill,
  RiDatabaseFill,
  RiLoader2Fill,
  RiUserFill,
} from "react-icons/ri";
import ANavbar from "../../ANavbar/ANavbar";
import ASidebar from "../../ASidebar/ASidebar";

const AViewProfile = () => {
  return (
    <>
      <div className="aDashboard">
        <div className="aNavbar">
          <ANavbar />
        </div>
        <div className="aMain">
          <div className="AViewProfile">
            <h4>Profile /</h4>
            <hr />
            <div className="AViewProfileContainer1">
              <div className="AViewProfileContainerContent">
                <h4>Account Details /</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span>
                          <TbBuilding className="AViewProfileCIcon" /> Company:
                        </span>
                      </td>
                      <td>3a Learning Solutions</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbBusinessplan className="AViewProfileCIcon" />{" "}
                          Business:
                        </span>
                      </td>
                      <td>Training And Consulting</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <RiUserFill className="AViewProfileCIcon" /> Username:
                        </span>
                      </td>
                      <td>3alearning</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbAt className="AViewProfileCIcon" /> Email:
                        </span>
                      </td>
                      <td>3alearning@mail.com</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbPhone className="AViewProfileCIcon" /> Phone:
                        </span>
                      </td>
                      <td>+91 9876543210</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <RiBookReadFill className="AViewProfileCIcon" />{" "}
                          GSTIN:
                        </span>
                      </td>
                      <td>gstin</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <BsGlobe2 className="AViewProfileCIcon" /> Website:
                        </span>
                      </td>
                      <td>website</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbCalendarTime className="AViewProfileCIcon" />{" "}
                          Created:
                        </span>
                      </td>
                      <td>created at</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbCalendarTime className="AViewProfileCIcon" /> Due
                          Date:
                        </span>
                      </td>
                      <td>01/01/2024</td>
                    </tr>
                    <tr>
                      <td className="td-no-border">
                        <span>
                          <TbEye className="AViewProfileCIcon" /> Role:
                        </span>
                      </td>
                      <td className="td-no-border">admin</td>
                    </tr>
                  </tbody>
                </table>
                <Link to="/admin-setting" className="AViewProfileEdit">
                  Edit <TbPencil className="AViewProfileCIcon" />
                </Link>
              </div>
            </div>
            {/*  */}
            <div className="AViewProfileContainer2">
              <div className="AViewProfileContainer2Content">
                <h4>Address /</h4>
                <table>
                  <tbody>
                    {/* <tr>
                      <th></th>
                      <th></th>
                    </tr> */}
                    <tr>
                      <td>
                        <span>
                          <BsFillGeoAltFill className="AViewProfileCIcon" />{" "}
                          Address:
                        </span>
                      </td>
                      <td>address</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <BsFillMapFill className="AViewProfileCIcon" /> City:
                        </span>
                      </td>
                      <td>noida</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <BsFillGeoFill className="AViewProfileCIcon" /> State:
                        </span>
                      </td>
                      <td>up</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <BsGlobe className="AViewProfileCIcon" />{" "}
                          Country/Region:
                        </span>
                      </td>
                      <td>india</td>
                    </tr>
                    <tr>
                      <td className="td-no-border">
                        <span>
                          <BsFileEarmarkZip className="AViewProfileCIcon" />{" "}
                          Zip:
                        </span>
                      </td>
                      <td className="td-no-border">250001</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* ------------- */}
            <div className="AViewProfileContainer3">
              <div className="AViewProfileContainerChild1">
                <h4>Total Users /</h4>
                <hr />
                <TbUser className="AViewProfileCCIcon" />
                <p className="AViewProfileCCPara">15</p>
                <Link to="/admin-users">Manage Users</Link>
              </div>
              <div className="AViewProfileContainerChild2">
                <h4>Total Courses /</h4>
                <hr />
                <RiBookletLine className="AViewProfileCCIcon" />
                <p className="AViewProfileCCPara">4</p>
                <Link to="/admin-view-courses">Manage Courses</Link>
              </div>
              <div className="AViewProfileContainerChild3">
                <h4>Your Plan /</h4>
                <hr />
                <RiDatabaseFill className="AViewProfileCCIcon" />
                <p className="AViewProfileCCPara">15/15</p>
                <Link to="/admin">Upgrade Plan</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="aSidebar">
          <ASidebar />
        </div>
      </div>
    </>
  );
};

export default AViewProfile;
