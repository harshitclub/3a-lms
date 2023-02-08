import React, { useEffect } from "react";
import "./UNotification.css";
import { UNotifications } from "./UNotifications";

import {
  RiCalendarFill,
  RiChatDeleteFill,
  RiDeleteBin2Fill,
  RiEyeFill,
  RiFileInfoFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import { IoAppsSharp } from "react-icons/io5";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import USidebar from "../USidebar/USidebar";
import UNavbar from "../UNavbar/ANavbar";
import { Navigate } from "react-router-dom";

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

const UNotification = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div className="UNotificationContainer">
            <div className="UNotificationHead">
              <div>
                <h3>My Notifications /</h3>
              </div>
              <div>
                {" "}
                <IoAppsSharp className="UNotificationHIcon" />
                <select>
                  <option>All</option>
                  <option>Unread</option>
                  <option>Read</option>
                </select>
              </div>
            </div>
            <div className="UNotifications">
              <table>
                <thead>
                  <tr>
                    <th scope="col" className="UNtableth">
                      #
                    </th>
                    <th scope="col">
                      <RiCalendarFill className="UNIcons" /> Date
                    </th>
                    <th scope="col">
                      <RiSendPlaneFill className="UNIcons" /> From
                    </th>
                    <th scope="col">
                      <RiFileInfoFill className="UNIcons" /> Subject
                    </th>
                    <th scope="col">
                      <RiEyeFill className="UNIcons" /> View
                    </th>
                    <th scope="col">
                      <RiChatDeleteFill className="UNIcons" /> Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {UNotifications.map((data, key) => {
                    return (
                      <tr>
                        <td data-label="Index">{data.id}</td>
                        <td data-label="Date">{data.date}</td>
                        <td data-label="From">{data.from}</td>
                        <td data-label="Subject">{data.subject}</td>
                        <td data-label="View">
                          <span
                            className="UNotificationBtn"
                            onClick={handleOpen}
                          >
                            <RiSendPlaneFill className="UNotificationIcons" />{" "}
                            Read
                          </span>
                        </td>
                        <td data-label="Delete">
                          <RiDeleteBin2Fill className="UNotificationDeleteIcon" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="uSidebar">
          <USidebar />
        </div>
      </div>
      {/* ---------------- */}
    </>
  );
};

export default UNotification;
