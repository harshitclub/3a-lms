import React, { useEffect } from "react";
import "./UCoursesView.css";
import { UPendingCourses, UAssignCourses } from "./UCourses";
import {
  AiFillAppstore,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";

// import course1 from "../../../assets/courses/course1.jpg";
// import course2 from "../../../assets/courses/course2.jpg";
// import course3 from "../../../assets/courses/course3.jpg";
// import course4 from "../../../assets/courses/course4.jpg";
// import course5 from "../../../assets/courses/course5.jpg";
// import course6 from "../../../assets/courses/course6.jpg";

import USidebar from "../../USidebar/USidebar";
import UNavbar from "../../UNavbar/ANavbar";
import { Navigate } from "react-router-dom";

const UCoursesView = () => {
  // eslint-disable-next-line
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
          <div className="uCourses">
            {/* ----------------------------------------------------- */}

            <div className="uCoursesContainer1">
              <div className="uCC1Head">
                <div>
                  <h3>Pending Courses /</h3>
                </div>
                <div>
                  <AiFillAppstore className="uCC1HeadIcon" />
                  <select>
                    <option value="" selected>
                      Category
                    </option>
                    <option>Development</option>
                    <option>DevOps</option>
                    <option>Soft Skills</option>
                    <option>Demo 1</option>
                    <option>Demo 2</option>
                    <option>Demo 3</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="uPendingCoursesTab">
                {/* - */}
                {UPendingCourses.map((data, key) => {
                  return (
                    <div className="uPendingCourseCard">
                      <img src={data.img} alt="df" />
                      <div className="uPendingCourseCardC">
                        <p>{data.pcourse}</p>
                        <p>{data.category}</p>
                        <progress
                          value={data.progress.min}
                          max={data.progress.max}
                        />
                        <br />
                        <span>0% - 100%</span>

                        <br />
                        <a href={data.resume} className="uPCCBtn">
                          Resume <AiFillPauseCircle className="uPCCBtnIcon" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ------------------------------------------- */}
            <div className="uCoursesContainer2">
              <div className="uCC2Head">
                <div>
                  <h3>Assigned Courses /</h3>
                </div>
                <div>
                  <AiFillAppstore className="uCC2HeadIcon" />
                  <select>
                    <option value="" selected>
                      Category
                    </option>
                    <option>Development</option>
                    <option>DevOps</option>
                    <option>Soft Skills</option>
                    <option>Demo 1</option>
                    <option>Demo 2</option>
                    <option>Demo 3</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="uAssignCoursesTab">
                {/* - */}
                {UAssignCourses.map((data, key) => {
                  return (
                    <div className="uAssignCourseCard">
                      <img src={data.img} alt="df" />
                      <div className="uAssignCourseCardC">
                        <p>{data.acourse}</p>
                        <p>{data.category}</p>

                        <a href={data.resume} className="uACCBtn">
                          Start <AiFillPlayCircle className="uACCBtnIcon" />
                        </a>
                      </div>
                    </div>
                  );
                })}
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

export default UCoursesView;
