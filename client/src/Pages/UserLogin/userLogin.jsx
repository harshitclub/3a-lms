import React from "react";
import "./userLogin.css";
import Footer from "../../Components/Footer/Footer";

import { RiEditBoxFill, RiLoginBoxFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Navbar from "../../Components/Navbar/Navbar";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [passShow, setPassShow] = useState(false);

  const navigate = useNavigate();
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("Enter Your Email Address");
    } else if (!email.includes("@")) {
      alert("Enter Valid Email");
    } else if (password === "") {
      alert("Enter Your Password");
    } else if (password.length < 5) {
      alert("Password is Short");
    }

    const data = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res = await data.json();
    if (res.status === "201") {
      toast.success("Login Success!", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } else {
      toast.error("Login Failed!", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <>
        <Navbar />
        <div className="userLogin">
          <div className="userLoginContainer">
            <div className="userLoginLogo">
              <img src={Logo} alt="" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="userLoginHeader">
                <h2>Login As A User</h2>
              </div>
              <div>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={inpval.email}
                  onChange={setVal}
                />
              </div>
              <div className="aLoginPass">
                <input
                  placeholder="Password"
                  type={!passShow ? "password" : "text"}
                  name="password"
                  value={inpval.password}
                  onChange={setVal}
                  className="hideInputBorder"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? (
                    <AiFillEyeInvisible className="showPassIcon" />
                  ) : (
                    <AiFillEye className="showPassIcon" />
                  )}
                </div>
              </div>
              <div className="userLoginForget">
                <p>
                  <a href="/">
                    <RiEditBoxFill className="userLoginIcon" /> Forget Password
                  </a>
                </p>
              </div>
              <div className="userLoginButton">
                <button type="submit">Login</button>
              </div>
              <div className="loginAsUser">
                <p>
                  <Link to="/admin-login">
                    <RiLoginBoxFill className="loginAsUserIcon" /> Login As
                    Admin
                  </Link>
                </p>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
        <Footer />
      </>
    </>
  );
};

export default UserLogin;
