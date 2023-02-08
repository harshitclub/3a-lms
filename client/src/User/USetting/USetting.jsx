import React, { useEffect } from "react";
import "./USetting.css";

import { RiEditBoxFill } from "react-icons/ri";

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
  width: 450,
  bgcolor: "background.paper",
  border: "1px solid #d3d3d3",
  boxShadow: 24,
  p: 2,
};

const USetting = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

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
          <div className="USettingContainer">
            <div className="USetting">
              {/* --------------------- */}
              <div className="USettingProfile">
                <h4>Harshit Kumar</h4>
                <p>Last Login Was on 3 Hours Ago</p>
                <button onClick={handleOpen4}>Change Profile Picture</button>
                <Modal
                  open={open4}
                  onClose={handleClose4}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="USettingProfileUpload">
                      <h4>Company Logo</h4>
                      <form>
                        <label>Select Company Logo To Upload</label>
                        <br />
                        <input type="file" />
                        <p>Maximum File Size: 1MB</p>
                        <p>
                          <span>
                            Note: This could take a few minutes to show up on
                            your profile
                          </span>
                        </p>
                        <button>Upload</button>
                        <button>Cancel</button>
                      </form>
                    </div>
                  </Box>
                </Modal>
              </div>
              {/* ------------------ */}
              <div className="USettingHeadings">
                <h4>Personal Information /</h4>
                <hr />
              </div>
              <div className="USettingPersonal">
                <div className="USettingEditIcon">
                  <RiEditBoxFill onClick={handleOpen} />
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="USettingEditPI">
                      <h4>Personal Information</h4>
                      <form>
                        <div>
                          <label>
                            Company<span>*</span>
                          </label>
                          <br />
                          <input placeholder="Company Name" type="text" />
                        </div>
                        <div>
                          <label>
                            Username<span>*</span>
                          </label>
                          <br />
                          <input placeholder="Username" type="text" />
                          <p>You Can Use Email As Your Username</p>
                          <button>Save</button>
                          <button>Cancel</button>
                        </div>
                      </form>
                    </div>
                  </Box>
                </Modal>
                <table>
                  <tr>
                    <td>Company:</td>
                    <td>
                      <span>3a Learning Solutions India Pvt. Ltd</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Username:</td>
                    <td>
                      <span>harshit.kumar@3alearningsolutions.com</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="noBorder">Password:</td>
                    <td className="noBorder">
                      <button onClick={handleOpen5}>Change Password</button>
                      <Modal
                        open={open5}
                        onClose={handleClose5}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <div className="USettingEditPI">
                            <h4>Personal Information</h4>
                            <form>
                              <div>
                                <label>
                                  Current Password<span>*</span>
                                </label>
                                <br />
                                <input
                                  placeholder="Current Password"
                                  type="password"
                                />
                              </div>
                              <div>
                                <label>
                                  New Password<span>*</span>
                                </label>
                                <br />
                                <input placeholder="New Password" type="text" />
                              </div>
                              <div>
                                <label>
                                  Confirm New Password<span>*</span>
                                </label>
                                <br />
                                <input
                                  placeholder="Confirm New Password"
                                  type="text"
                                />
                              </div>
                              <button>Save</button>
                              <button>Cancel</button>
                            </form>
                          </div>
                        </Box>
                      </Modal>
                    </td>
                  </tr>
                </table>
              </div>
              {/* -------------- */}
              <div className="USettingHeadings">
                <h4>Basic Information /</h4>
                <hr />
              </div>
              <div className="USettingBasic">
                <div className="USettingEditIcon">
                  <RiEditBoxFill onClick={handleOpen2} />
                </div>
                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="USettingEditPI">
                      <h4>Basic Information</h4>
                      <form>
                        <div>
                          <label>
                            Email<span>*</span>
                          </label>
                          <br />
                          <input placeholder="Email" type="email" />
                        </div>
                        <div>
                          <label>
                            Work Phone<span>*</span>
                          </label>
                          <br />
                          <input placeholder="Work Phone" type="number" />
                        </div>
                        <div>
                          <label>
                            LinkedIn<span>*</span>
                          </label>
                          <br />
                          <input placeholder="LinkedIn Username" type="text" />
                        </div>
                        <div>
                          <label>
                            Facebook<span>*</span>
                          </label>
                          <br />
                          <input placeholder="Facebook Username" type="text" />
                        </div>
                        <div>
                          <label>
                            Twitter<span>*</span>
                          </label>
                          <br />
                          <input placeholder="Twitter Username" type="text" />
                        </div>
                        <button>Save</button>
                        <button>Cancel</button>
                      </form>
                    </div>
                  </Box>
                </Modal>
                <table>
                  <tr>
                    <td>Email:</td>
                    <td>harshit.kumar@3alearningsolutions.com</td>
                  </tr>
                  <tr>
                    <td>Work Phone:</td>
                    <td>+91 9876543210</td>
                  </tr>
                  <tr>
                    <td>LinkedIn:</td>
                    <td>harshitclub</td>
                  </tr>
                  <tr>
                    <td>Facebook:</td>
                    <td>harshitclub</td>
                  </tr>
                  <tr>
                    <td>Twitter:</td>
                    <td>harshitclub</td>
                  </tr>
                </table>
              </div>

              {/* ------------------------------ */}
              <div className="USettingHeadings">
                <h4>Address /</h4>
                <hr />
              </div>
              <div className="USettingAddress">
                <div className="USettingEditIcon">
                  <RiEditBoxFill onClick={handleOpen3} />
                </div>
                <Modal
                  open={open3}
                  onClose={handleClose3}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="USettingEditPI">
                      <h4>Address</h4>
                      <form>
                        <div>
                          <label>
                            Address<span>*</span>
                          </label>
                          <br />
                          <textarea placeholder="Write Address" type="text" />
                        </div>
                        <div>
                          <label>
                            City<span>*</span>
                          </label>
                          <br />
                          <input placeholder="City Name" type="number" />
                        </div>
                        <div>
                          <label>
                            State<span>*</span>
                          </label>
                          <br />
                          <input placeholder="State Name" type="text" />
                        </div>
                        <div>
                          <label>
                            Zip<span>*</span>
                          </label>
                          <br />
                          <input placeholder="Zip Code" type="text" />
                        </div>
                        <div>
                          <label>
                            Country<span>*</span>
                          </label>
                          <br />
                          <input placeholder="Country Name" type="text" />
                        </div>
                        <button>Save</button>
                        <button>Cancel</button>
                      </form>
                    </div>
                  </Box>
                </Modal>
                <table>
                  <tr>
                    <td>Address:</td>
                    <td>1126 Tower A ithum, Noida Sector 62</td>
                  </tr>
                  <tr>
                    <td>City:</td>
                    <td>Noida</td>
                  </tr>
                  <tr>
                    <td>State:</td>
                    <td>Uttarpradesh</td>
                  </tr>
                  <tr>
                    <td>Zip:</td>
                    <td>201309</td>
                  </tr>
                  <tr>
                    <td className="noBorder">Country:</td>
                    <td className="noBorder">India</td>
                  </tr>
                </table>
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

export default USetting;
