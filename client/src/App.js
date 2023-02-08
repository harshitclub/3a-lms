import React from "react";
// import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import MainContact from "./Pages/Contact/MainContact";
import Register from "./Pages/Register/Register";
import AdminLogin from "./Pages/adminLogin/adminLogin";
import UserLogin from "./Pages/UserLogin/userLogin";

// admin imports
import ADashboard from "./Admin/ADashboard/ADashboard";
import AViewProfile from "./Admin/AProfile/AViewProfile/AViewProfile";
import AViewUsers from "./Admin/AUsers/AViewUsers/AViewUsers";
import AEditUser from "./Admin/AUsers/AEditUsers/AEditUser";
import ASetting from "./Admin/ASetting/ASetting";
import ANotification from "./Admin/ANotifications/ANotifications";
import AViewACourses from "./Admin/ACourses/AViewCourses/AViewCourses";
import AEditCourses from "./Admin/ACourses/AEditCourses/AaddCourse";

// user imports
import UDashboard from "./User/UDashboard/UDashboard";
import USetting from "./User/USetting/USetting";
import UProfile from "./User/UProfile/UProfileView/UProfileView";
import UNotification from "./User/UNotification/UNotification";
import UCoursesView from "./User/UCourses/UCoursesView/UCoursesView";
import UCourse from "./User/UCourses/UCourse/UCourse";
import UActivities from "./User/UActivities/UActivities.jsx";
import UAchievements from "./User/UAchievements/UAchievements";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmin,
  adminLoginStatus,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(adminLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getAdmin());
    }
  }, [dispatch, isLoggedIn, user]);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<MainContact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<ADashboard />} />
          <Route path="/admin-profile" element={<AViewProfile />} />
          <Route path="/admin-users" element={<AViewUsers />} />
          <Route path="/admin-create-user" element={<AEditUser />} />
          <Route path="/admin-add-course" element={<AEditCourses />} />
          <Route path="/admin-view-courses" element={<AViewACourses />} />
          <Route path="/admin-notifications" element={<ANotification />} />
          <Route path="/admin-reports" element={<ADashboard />} />
          <Route path="/admin-setting" element={<ASetting />} />

          <Route path="/user" element={<UDashboard />} />
          <Route path="/user-setting" element={<USetting />} />
          <Route path="/user-profile" element={<UProfile />} />
          <Route path="/user-notification" element={<UNotification />} />
          <Route path="/user-courses" element={<UCoursesView />} />
          <Route path="/user-course" element={<UCourse />} />
          <Route path="/user-activities" element={<UActivities />} />
          <Route path="/user-achievements" element={<UAchievements />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
