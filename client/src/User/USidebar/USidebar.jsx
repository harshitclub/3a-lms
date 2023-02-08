import React from "react";
import "./USidebar.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import {
  RiArrowLeftRightLine,
  RiArticleFill,
  RiCheckboxMultipleFill,
  RiEyeFill,
  RiGridFill,
  RiNotification2Fill,
  RiNumbersFill,
  RiProfileFill,
  RiQuestionnaireFill,
  RiSettingsFill,
  RiTrophyFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const USidebar = () => {
  const { collapseSidebar, defaultCollapsed = "true" } = useProSidebar();

  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar defaultCollapsed={defaultCollapsed}>
          <Menu className="sidebarr">
            <MenuItem
              className="sidebar-items"
              onClick={() => collapseSidebar()}
              icon={<RiArrowLeftRightLine />}
            ></MenuItem>
            <MenuItem
              routerLink={<Link to="/user" />}
              className="sidebar-items"
              icon={<RiGridFill />}
            >
              Dashboard{" "}
            </MenuItem>
            <SubMenu
              className="sidebar-items"
              icon={<RiArticleFill />}
              label="Courses"
            >
              <MenuItem
                routerLink={<Link to="/user-courses" />}
                className="sidebar-items"
                icon={<RiEyeFill />}
              >
                View Courses{" "}
              </MenuItem>
            </SubMenu>

            <MenuItem
              routerLink={<Link to="/user-profile" />}
              className="sidebar-items"
              icon={<RiProfileFill />}
            >
              {" "}
              Profile{" "}
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/user-activities" />}
              className="sidebar-items"
              icon={<RiCheckboxMultipleFill />}
            >
              {" "}
              Acitvities{" "}
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/user-achievements" />}
              className="sidebar-items"
              icon={<RiTrophyFill />}
            >
              {" "}
              Achievements{" "}
            </MenuItem>

            <MenuItem
              routerLink={<Link to="/user" />}
              className="sidebar-items"
              icon={<RiNumbersFill />}
            >
              {" "}
              Reports{" "}
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/user-notification" />}
              className="sidebar-items"
              icon={<RiNotification2Fill />}
            >
              {" "}
              Notifications{" "}
            </MenuItem>
            <MenuItem className="sidebar-items" icon={<RiQuestionnaireFill />}>
              {" "}
              Help{" "}
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/user-setting" />}
              className="sidebar-items"
              icon={<RiSettingsFill />}
            >
              {" "}
              Setting{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default USidebar;
