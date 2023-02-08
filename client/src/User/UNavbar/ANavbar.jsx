import React, { useEffect, useState } from "react";
import "./ANavbar.css";
import { Link, useNavigate } from "react-router-dom";

import {
  // RiAdminFill,
  RiLockPasswordFill,
  RiLogoutBoxFill,
  RiNotification2Fill,
  RiProfileFill,
  RiSettingsFill,
  RiUserLine,
} from "react-icons/ri";
import "./ANavbar.css";
// import profile from "../../assets/logoMain.png";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ANavbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <div className="userMainTopBar">
        <div className="userMainDash">
          <h1>{user ? user.name : "Loading..."}</h1>
          {/* <img src={profile} alt="" /> */}
          {/* {url()} */}
        </div>
        <div className="userMainUser">
          <div className="uTopBarNotification">
            <RiNotification2Fill />
          </div>
          <RiUserLine onClick={handleClick} className="userTopBarIcon" />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem className="dropDownItems" onClick={handleClose}>
              <h4>
                {user ? user.name : "Loading..."}
                <br />
                <span>{user ? user.role : "Loading..."}</span>
              </h4>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RiProfileFill className="basic-menu-icons" />
              <Link to="/user-profile" className="UNavbarLink">
                {" "}
                Profile{" "}
              </Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <RiNotification2Fill className="basic-menu-icons" />
              <Link to="/user-notification" className="UNavbarLink">
                {" "}
                Notifications{" "}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RiSettingsFill className="basic-menu-icons" />
              <Link to="/user-setting" className="UNavbarLink">
                {" "}
                Setting{" "}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RiLockPasswordFill className="basic-menu-icons" />
              <Link to="/user-setting" className="UNavbarLink">
                {" "}
                Change{" "}
              </Link>
              Password
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RiLogoutBoxFill className="basic-menu-icons" />
              <Link to="/" className="UNavbarLink">
                {" "}
                Logout{" "}
              </Link>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default ANavbar;
