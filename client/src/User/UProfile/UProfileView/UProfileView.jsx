import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { RiLoader2Fill, RiUser3Fill, RiUserFill } from "react-icons/ri";
import "./UProfileView.css";
import USidebar from "../../USidebar/USidebar";
import UNavbar from "../../UNavbar/ANavbar";
import {
  TbAt,
  TbBuilding,
  TbCalendarTime,
  TbEye,
  TbPencil,
  TbPhone,
} from "react-icons/tb";
import { BsFillBriefcaseFill, BsGlobe2 } from "react-icons/bs";

const UProfileView = () => {
  const [user, setUser] = useState();

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
      } else {
        setUser(data.data);
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
        <div className="uMain">
          <div className="UViewProfile">
            <div className="UViewProfileContainer1">
              <h4>Account Details /</h4>
              <hr />
              <div className="UViewProfileContainerContent">
                <h4>Profile /</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span>
                          <RiUser3Fill className="UViewProfileCIcon" /> Name:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>
                        {user ? (
                          user.name
                        ) : (
                          <RiLoader2Fill className="lmsLoading" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbBuilding className="UViewProfileCIcon" /> Company:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>
                        {user ? (
                          user.company
                        ) : (
                          <RiLoader2Fill className="lmsLoading" />
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span>
                          <BsFillBriefcaseFill className="UViewProfileCIcon" />{" "}
                          Position:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>
                        {user ? (
                          user.position
                        ) : (
                          <RiLoader2Fill className="lmsLoading" />
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span>
                          <RiUserFill className="UViewProfileCIcon" /> Username:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>
                        {user ? (
                          user.username
                        ) : (
                          <RiLoader2Fill className="lmsLoading" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbAt className="UViewProfileCIcon" /> Email:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>
                        {user ? (
                          user.email
                        ) : (
                          <RiLoader2Fill className="lmsLoading" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbPhone className="UViewProfileCIcon" /> Phone:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>
                        +91{" "}
                        {user ? (
                          user.phone
                        ) : (
                          <RiLoader2Fill className="lmsLoading" />
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span>
                          <BsGlobe2 className="UViewProfileCIcon" /> Website:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>3alearningsolutions.com</td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbCalendarTime className="UViewProfileCIcon" />{" "}
                          Created:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>
                        {user ? (
                          user.date
                        ) : (
                          <RiLoader2Fill className="lmsLoading" />
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <TbCalendarTime className="UViewProfileCIcon" /> Due
                          Date:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td>01/01/2024</td>
                    </tr>
                    <tr>
                      <td className="td-no-border">
                        <span>
                          <TbEye className="UViewProfileCIcon" /> Role:
                        </span>
                      </td>
                      <td className="tdgrey">|</td>
                      <td className="td-no-border">
                        {user ? (
                          user.role
                        ) : (
                          <RiLoader2Fill className="lmsLoading" />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link to="/user-setting" className="AViewProfileEdit">
                  Edit <TbPencil className="UViewProfileCIcon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="uSidebar">
          <USidebar />
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default UProfileView;
