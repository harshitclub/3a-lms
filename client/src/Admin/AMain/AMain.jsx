// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./AMain.css";
import {
  FaClipboardCheck,
  FaSwatchbook,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";
import {
  RiAddCircleFill,
  RiBuildingFill,
  RiFileUserFill,
  RiGlobalLine,
  RiMailFill,
  RiPhoneFill,
  RiUserAddFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
// import Loader from "../../Components/loader/Loader";

const AMain = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAdmin);
  }, [dispatch]);
  console.log(user);
  return (
    <>
      <div className="aMainContainer">
        {/* {isLoading && <Loader />} */}
        <div className="aMainTabHead">
          <div>
            <h2>Dashboard /</h2>
            <hr />
          </div>
        </div>
        <div className="aMainTab1Container">
          <div className="aMainTabs">
            <div>
              <FaUsers className="aMainTab1Icons" />
            </div>
            <div>
              <h4>Total Users</h4>
              <p>10</p>
            </div>
          </div>
          <div className="aMainTabs">
            <div>
              <FaSwatchbook className="aMainTab1Icons" />
            </div>
            <div>
              <h4>Total Courses</h4>
              <p>10</p>
            </div>
          </div>
          <div className="aMainTabs">
            <div>
              <FaUserCheck className="aMainTab1Icons" />
            </div>
            <div>
              <h4>Active Users</h4>
              <p>10</p>
            </div>
          </div>
          <div className="aMainTabs">
            <div>
              <FaClipboardCheck className="aMainTab1Icons" />
            </div>
            <div>
              <h4>Active Courses</h4>
              <p>10</p>
            </div>
          </div>
        </div>
        {/* ------------------- */}

        <div className="aMainTab2Container">
          <div className="aMainTabs2">
            <h4>Admin Information /</h4>
            <table>
              <tbody>
                <tr className="trNoBorder">
                  <th></th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <span>
                      <RiBuildingFill className="aMT2TIcons" /> Company
                    </span>
                  </td>
                  <td>{user?.company}</td>
                </tr>
                <tr>
                  <td>
                    <span>
                      <RiMailFill className="aMT2TIcons" /> Email
                    </span>
                  </td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td>
                    <span>
                      <RiGlobalLine className="aMT2TIcons" /> Website
                    </span>
                  </td>
                  <td>{user?.website}</td>
                </tr>
                <tr>
                  <td>
                    <span>
                      <RiPhoneFill className="aMT2TIcons" /> Contact
                    </span>
                  </td>
                  <td>{user?.phone}</td>
                </tr>
                <tr>
                  <td>
                    <span>
                      <RiFileUserFill className="aMT2TIcons" /> Role
                    </span>
                  </td>
                  <td>{user?.role}</td>
                </tr>
              </tbody>
            </table>
            <Link to="/admin-profile" className="aMainTabs2Link">
              All Information
            </Link>
          </div>
          <div className="aMainTabs2Right">
            <div className="aMainTabs2Cuser">
              <Link to="/admin-create-user">
                <p>
                  <RiUserAddFill className="aMainTabs2RightIcon" /> Create User
                </p>
              </Link>
            </div>
            <div className="aMainTabs2Ccourse">
              <Link to="/admin-add-course">
                <p>
                  <RiAddCircleFill className="aMainTabs2RightIcon" /> Create
                  Course
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AMain;
