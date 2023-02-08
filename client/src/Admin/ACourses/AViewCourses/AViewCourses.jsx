// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./AViewCourses.css";
import { IoAppsSharp } from "react-icons/io5";
import {
  RiBookmarkFill,
  RiPencilFill,
  RiPushpin2Fill,
  RiStackFill,
  RiTimeFill,
  RiUser3Fill,
} from "react-icons/ri";
import Image from "../../../assets/image.jpg";
import ANavbar from "../../ANavbar/ANavbar";
import ASidebar from "../../ASidebar/ASidebar";

const AViewCourses = () => {
  return (
    <>
      <div className="aDashboard">
        <div className="aNavbar">
          <ANavbar />
        </div>
        <div className="aMain">
          <div className="aViewCourses">
            <div className="aViewCoursesContainer">
              {/* ------------------------- */}
              <div className="aViewCoursesHead">
                <div>
                  <h4>
                    <span>View Courses</span>
                  </h4>
                </div>
                <div>
                  <IoAppsSharp className="viewCourseCIcon" />
                  <select>
                    <option>Category</option>
                    <option>Development</option>
                    <option>Cloud Computing</option>
                    <option>DevOps</option>
                    <option>Database</option>
                    <option>Behavioral Skills</option>
                    <option>Quality Management</option>
                    <option>Project Management</option>
                  </select>
                </div>
              </div>
              {/* ----------------------------- */}

              <div className="aViewCoursesTab">
                {/* {courses &&
                  courses.map((data, key) => {
                    return ( */}
                <div className="aViewCourse">
                  <img src={Image} alt="" />
                  <div className="aViewCourseContent">
                    <h4>
                      <RiBookmarkFill className="aViewCourseContentIcons" />{" "}
                      Short Title
                    </h4>
                    <p>
                      <RiTimeFill className="aViewCourseContentIcons" />{" "}
                      <span>Duration</span>
                    </p>
                    <p>
                      <RiPushpin2Fill className="aViewCourseContentIcons" />{" "}
                      <span>Development</span>
                    </p>
                    <p>
                      <RiUser3Fill className="aViewCourseContentIcons" />{" "}
                      <span>2</span>
                    </p>
                    <div className="aViewCourseContentBtn">
                      <div className="aViewCourseBtns">
                        <a href="/admin/view-courses">
                          <RiStackFill className="aViewCourseBIcons" /> Details
                        </a>
                      </div>
                      <div className="aViewCourseBtns">
                        <a href="/view-courses">
                          <RiPencilFill className="aViewCourseBIcons" /> Edit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                );
                {/* })} */}
              </div>
            </div>
          </div>
        </div>
        <div className="aSidebar">
          <ASidebar />
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default AViewCourses;
