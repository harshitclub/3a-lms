import React from "react";
import "./ASidebar.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import {
  RiAddCircleFill,
  RiArrowLeftRightLine,
  RiArticleFill,
  RiEyeFill,
  RiGridFill,
  RiNotification2Fill,
  RiNumbersFill,
  RiProfileFill,
  RiQuestionnaireFill,
  RiSettingsFill,
  RiUser3Fill,
  RiUserAddFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const ASidebar = () => {
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
              routerLink={<Link to="/admin" />}
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
                routerLink={<Link to="/admin-view-courses" />}
                className="sidebar-items"
                icon={<RiEyeFill />}
              >
                View Courses{" "}
              </MenuItem>
              <MenuItem
                routerLink={<Link to="/admin-add-course" />}
                className="sidebar-items"
                icon={<RiAddCircleFill />}
              >
                {" "}
                Add Course{" "}
              </MenuItem>
            </SubMenu>
            <SubMenu
              className="sidebar-items"
              icon={<RiUser3Fill />}
              label="Users"
            >
              <MenuItem
                routerLink={<Link to="/admin-users" />}
                className="sidebar-items"
                icon={<RiEyeFill />}
              >
                {" "}
                View Users{" "}
              </MenuItem>
              <MenuItem
                routerLink={<Link to="/admin-create-user" />}
                className="sidebar-items"
                icon={<RiUserAddFill />}
              >
                {" "}
                Add User{" "}
              </MenuItem>
            </SubMenu>

            <MenuItem
              routerLink={<Link to="/admin-profile" />}
              className="sidebar-items"
              icon={<RiProfileFill />}
            >
              {" "}
              Profile{" "}
            </MenuItem>

            <MenuItem
              routerLink={<Link to="/admin-reports" />}
              className="sidebar-items"
              icon={<RiNumbersFill />}
            >
              {" "}
              Reports{" "}
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/admin-notifications" />}
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
              routerLink={<Link to="/admin-setting" />}
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

export default ASidebar;
