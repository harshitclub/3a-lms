import React, { useEffect } from "react";
import UNavbar from "../UNavbar/ANavbar";
import USidebar from "../USidebar/USidebar";
import {
  RiCalendarCheckLine,
  RiCheckboxCircleFill,
  RiEditBoxFill,
  RiLinksFill,
  RiQuestionnaireFill,
  RiStackFill,
  RiTimeFill,
  RiTrophyFill,
} from "react-icons/ri";
import "./UActivities.css";
import { pendingCourses, pendingQuiz } from "./activityData";
import { Navigate } from "react-router-dom";

const UActivities = () => {
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
        <div className="uMain">
          <div className="uActivities">
            <div className="uActivitiesCourses">
              <div className="uACContainer1">
                <div className="uACC1PCourses">
                  <h3>Pending Courses /</h3>
                  <hr />
                  <table>
                    <thead>
                      <tr>
                        <th scope="col" className="tableRowLess">
                          #ID
                        </th>
                        <th scope="col">
                          <RiStackFill className="uACCTIcon" /> Course Name
                        </th>
                        <th scope="col">
                          <RiCalendarCheckLine className="uACCTIcon" /> Assign
                          Date
                        </th>
                        <th scope="col">
                          <RiEditBoxFill className="uACCTIcon" /> Category
                        </th>
                        <th scope="col">
                          <RiLinksFill className="uACCTIcon" /> Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingCourses.map((data, key) => {
                        return (
                          <tr>
                            <td data-label="ID">{data.id}</td>
                            <td data-label="Course Name">{data.courseName}</td>
                            <td data-label="Assign Date">{data.assignDate}</td>
                            <td data-label="Category">{data.category}</td>
                            <td data-label="Action">
                              <a href={data.resume}>Resume</a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* ---------------------------------------------- */}
                <div className="uACC1PQuiz">
                  <h3>Pending Quiz /</h3>
                  <hr />
                  <table>
                    <thead>
                      <tr>
                        <th scope="col" className="tableRowLess">
                          #ID
                        </th>
                        <th scope="col">
                          <RiStackFill className="uACCTIcon" /> Course Quiz
                        </th>
                        <th scope="col">
                          <RiCalendarCheckLine className="uACCTIcon" /> End Date
                        </th>
                        <th scope="col">
                          <RiEditBoxFill className="uACCTIcon" /> Category
                        </th>
                        <th scope="col">
                          <RiLinksFill className="uACCTIcon" /> Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingQuiz.map((data, key) => {
                        return (
                          <tr>
                            <td data-label="ID">{data.id}</td>
                            <td data-label="Course Quiz">{data.courseQuiz}</td>
                            <td data-label="End Date">{data.endDate}</td>
                            <td data-label="Category">{data.category}</td>
                            <td data-label="Action">
                              <a href={data.resume}>Resume</a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* --------------------------------------------------- */}
              <div className="uACContainer2">
                <div className="uACC2Login">
                  <h3>Login Activity /</h3>
                  <hr />
                  <div className="uACC2LoginC">
                    <p>Last Login</p>
                    <p>
                      <span>14-Nov-2022 04:01 PM</span>
                    </p>
                  </div>
                </div>
                <div className="uAUProfile">
                  <h3>My Data /</h3>
                  <table>
                    <tr>
                      <td>
                        {" "}
                        <RiStackFill className="uAUProfileIcon" /> Assigned
                        Courses
                      </td>
                      <td className="tdgrey">|</td>
                      <td>5</td>
                    </tr>
                    <tr>
                      <td>
                        <RiTimeFill className="uAUProfileIcon" /> Pending
                        Courses
                      </td>
                      <td className="tdgrey">|</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>
                        <RiCheckboxCircleFill className="uAUProfileIcon" />{" "}
                        Complete Courses
                      </td>
                      <td className="tdgrey">|</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>
                        <RiQuestionnaireFill className="uAUProfileIcon" />{" "}
                        Complete Quiz
                      </td>
                      <td className="tdgrey">|</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>
                        <RiTrophyFill className="uAUProfileIcon" />{" "}
                        Certifications
                      </td>
                      <td className="tdgrey">|</td>
                      <td>3</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="uSidebar">
          <USidebar />
        </div>
      </div>
    </>
  );
};

export default UActivities;
