import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ANotifications.css";
import { RiDeleteBin2Fill, RiSendPlaneFill } from "react-icons/ri";
import { IoAppsSharp } from "react-icons/io5";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import {
  Link,
  //   MemoryRouter,
  //   Route,
  //   Routes,
  useLocation,
} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ANavbar from "../ANavbar/ANavbar";
import ASidebar from "../ASidebar/ASidebar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const ANotifications = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  useEffect(() => {
    async function adminAuth() {
      try {
        const response = await fetch("/admin-auth", {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });

        const data = await response.json();

        if (data.status === "400") {
          navigate("/admin-login");
        }
      } catch (error) {
        console.log(error);
        navigate("/admin-login");
      }
    }
    adminAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="aDashboard">
        <div className="aNavbar">
          <ANavbar />
        </div>
        <div className="aMain">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p>Dear Kundan Kumar,</p>
              <br />
              <p>
                Welcome to 3a Learning Management System. Your free trial
                account has been created and will be active till 24-11-2022
              </p>
              <br />
              <p>Your Login Details:</p>
              <br />
              <p>URL: kundan.3alearning.com</p>

              <p>Backup URL: https://3a.3alearn.com</p>
              <p>Your Username: info@haiwebtech.com</p>
              <br />
              <p>
                If you have any queries or would like to provide us your valued
                feedback, please feel free to write to us on
                info@3alearningsolutions.com
              </p>
              <button className="aNotificationEBtn">Done</button>
            </Box>
          </Modal>

          {/* ---------------- */}
          <div className="aNotificationContainer">
            <div className="aNotificationHead">
              <div>
                <h4>Notifications</h4>
              </div>
              <div>
                {" "}
                <IoAppsSharp className="aNotificationHIcon" />
                <select>
                  <option>Unread</option>
                  <option>Read</option>
                </select>
              </div>
            </div>
            <div className="aNotifications">
              <table>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">From</th>
                    <th scope="col">Subject</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Index">1</td>
                    <td data-label="Date">04/01/2016</td>
                    <td data-label="From">Admin</td>
                    <td data-label="Subject">React.js</td>
                    <td data-label="View">
                      <span className="aNotificationBtn" onClick={handleOpen}>
                        <RiSendPlaneFill className="aNotificationIcons" /> Read
                      </span>
                    </td>
                    <td data-label="Delete">
                      <RiDeleteBin2Fill className="aNotificationDeleteIcon" />
                    </td>
                  </tr>
                  <tr>
                    {/* eslint-disable-next-line */}
                    <td scope="row" data-label="Index">
                      2
                    </td>
                    <td data-label="Date">03/01/2016</td>
                    <td data-label="From">Admin</td>
                    <td data-label="Subject">Node.js</td>
                    <td data-label="View">
                      <span className="aNotificationBtn">
                        <RiSendPlaneFill className="aNotificationIcons" /> Read
                      </span>
                    </td>
                    <td data-label="Delete">
                      <RiDeleteBin2Fill className="aNotificationDeleteIcon" />
                    </td>
                  </tr>
                  <tr>
                    {/* eslint-disable-next-line */}
                    <td scope="row" data-label="Index">
                      3
                    </td>
                    <td data-label="Date">03/01/2016</td>
                    <td data-label="From">Admin</td>
                    <td data-label="Subject">MySQL</td>
                    <td data-label="View">
                      <span className="aNotificationBtn">
                        <RiSendPlaneFill className="aNotificationIcons" /> Read
                      </span>
                    </td>
                    <td data-label="Delete">
                      <RiDeleteBin2Fill className="aNotificationDeleteIcon" />
                    </td>
                  </tr>
                  <tr>
                    {/* eslint-disable-next-line */}
                    <td scope="row" data-label="Index">
                      4
                    </td>
                    <td data-label="Date">02/01/2016</td>
                    <td data-label="From">Admin</td>
                    <td data-label="Subject">Java</td>
                    <td data-label="View">
                      <span className="aNotificationBtn">
                        <RiSendPlaneFill className="aNotificationIcons" /> Read
                      </span>
                    </td>
                    <td data-label="Delete">
                      <RiDeleteBin2Fill className="aNotificationDeleteIcon" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <Pagination
                className="nPagination"
                page={page}
                count={10}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/inbox${item.page === 1 ? "" : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="aSidebar">
          <ASidebar />
        </div>
      </div>
      {/* ---------------- */}
    </>
  );
};

export default ANotifications;
