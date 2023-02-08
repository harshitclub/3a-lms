import React, { useState } from "react";
import "./adminLogin.css";
import Footer from "../../Components/Footer/Footer";

import { RiEditBoxFill, RiLoginBoxFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Navbar from "../../Components/Navbar/Navbar";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, RESET } from "../../redux/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail } from "../../redux/features/auth/authService";
import { useEffect } from "react";

const initialState = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;
  const dispatch = useDispatch();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    await dispatch(adminLogin(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/admin");
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <>
      <Navbar />
      <div className="adminLogin">
        <div className="adminLoginContainer">
          <div className="adminLoginLogo">
            <img src={Logo} alt="" />
          </div>
          <form onSubmit={loginUser}>
            <div className="adminLoginHeader">
              <h2>Login As Admin User</h2>
            </div>
            <div>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="aLoginPass">
              <input
                placeholder="Password"
                type={!passShow ? "password" : "text"}
                name="password"
                value={password}
                onChange={handleInputChange}
                className="hideInputBorder"
              />
              <div className="showpass" onClick={() => setPassShow(!passShow)}>
                {!passShow ? (
                  <AiFillEyeInvisible className="showPassIcon" />
                ) : (
                  <AiFillEye className="showPassIcon" />
                )}
              </div>
            </div>
            <div className="adminLoginForget">
              <p>
                <a href="/">
                  <RiEditBoxFill className="adminLoginIcon" /> Forget Password
                </a>
              </p>
            </div>
            <div className="adminLoginButton">
              <button type="submit">Login</button>
            </div>
            <div className="loginAsUser">
              <p>
                <Link to="/user-login">
                  <RiLoginBoxFill className="loginAsUserIcon" /> Login As A User
                </Link>
              </p>
            </div>
          </form>

          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
