import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AEditUser.css";
import {
  RiBuilding4Fill,
  RiLock2Fill,
  RiMailFill,
  RiPhoneFill,
  RiSendPlaneFill,
  RiShieldUserFill,
  RiUser3Fill,
} from "react-icons/ri";
import ANavbar from "../../ANavbar/ANavbar";
import ASidebar from "../../ASidebar/ASidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../../redux/features/auth/authService";
import { registerUser } from "../../../redux/features/auth/authSlice";

const initialState = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  status: "",
  company: "",
  position: "",
  country: "",
  admin: "gautamharshit41@gmail.com",
  password: "",
  cpassword: "",
};

const AEditUser = () => {
  const [formData, setFormData] = useState(initialState);

  const {
    name,
    email,
    phone,
    gender,
    status,
    company,
    position,
    country,
    admin,
    password,
    cpassword,
  } = formData;

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [inpval, setInpval] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   gender: "",
  //   status: "",
  //   company: "",
  //   position: "",
  //   country: "",
  //   admin: "gautamharshit41@gmail.com",
  //   profile: "",
  //   password: "",
  //   cpassword: "",
  // });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "") {
      toast.error("Name is Required!", {
        position: "top-right",
      });
    } else if (email === "") {
      toast.error("Email is Required!", {
        position: "top-right",
      });
    } else if (!email.includes("@")) {
      toast.error("Fill Correct Email!", {
        position: "top-right",
      });
    } else if (phone === "") {
      toast.error("Phone is Required!", {
        position: "top-right",
      });
    } else if (gender === "") {
      toast.error("Gender is Required!", {
        position: "top-right",
      });
    } else if (status === "") {
      toast.error("Status is Required!", {
        position: "top-right",
      });
    } else if (company === "") {
      toast.error("Company is Required!", {
        position: "top-right",
      });
    } else if (position === "") {
      toast.error("Position is Required!", {
        position: "top-right",
      });
    } else if (country === "") {
      toast.error("Country is Required!", {
        position: "top-right",
      });
    } else if (password === "") {
      toast.error("Password is Required!", {
        position: "top-right",
      });
    } else if (password.length < 8) {
      toast.error("Password is Short!", {
        position: "top-right",
      });
    } else if (password !== cpassword) {
      toast.error("Password & Confirm Password do Not Match!", {
        position: "top-right",
      });
    }

    const userData = {
      name,
      email,
      phone,
      gender,
      status,
      company,
      position,
      country,
      password,
    };
    await dispatch(registerUser(userData));
  };

  return (
    <>
      <div className="aDashboard">
        <div className="aNavbar">
          <ANavbar />
        </div>
        <div className="aMain">
          <div className="adminAddUser">
            <h2>Create User /</h2>

            <div className="adminAddUserContainer">
              <form onSubmit={handleSubmit}>
                {/* --------------------- */}
                <div className="aCreateUserInputs">
                  <div className="aCreateUserInput">
                    <label>
                      <RiUser3Fill className="aCreateUserInputIcons" /> Enter
                      Name<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Enter User's Full Name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="aCreateUserInput">
                    <label>
                      <RiMailFill className="aCreateUserInputIcons" /> Enter
                      Email<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Enter User's Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* ------------------------------ */}
                <div className="aCreateUserInputs">
                  <div className="aCreateUserInput">
                    <label>
                      <RiShieldUserFill className="aCreateUserInputIcons" />{" "}
                      Enter Username<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Enter Username"
                      type="text"
                      name="username"
                      // value={name}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="aCreateUserInput">
                    <label>
                      <RiPhoneFill className="aCreateUserInputIcons" /> Enter
                      User's Phone<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Ex. 9876543210"
                      type="number"
                      name="phone"
                      value={phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* -------------------------------- */}
                <div className="aCreateUserInputs">
                  <div className="aCreateUserInput">
                    <label>
                      <RiUser3Fill className="aCreateUserInputIcons" /> Enter
                      User's Gender<span>*</span>
                    </label>
                    <br />
                    <select
                      name="gender"
                      value={gender}
                      onChange={handleInputChange}
                    >
                      <option>Select</option>
                      <option>male</option>
                      <option>female</option>
                      <option>other</option>
                    </select>
                  </div>
                  <div className="aCreateUserInput">
                    <label>
                      <RiMailFill className="aCreateUserInputIcons" /> Enter
                      User's Status<span>*</span>
                    </label>
                    <br />
                    <select
                      name="status"
                      value={status}
                      onChange={handleInputChange}
                    >
                      <option>Status</option>
                      <option>active</option>
                      <option>inactive</option>
                    </select>
                  </div>
                </div>
                {/* -------------------------------- */}
                <div className="aCreateUserInputs">
                  <div className="aCreateUserInput">
                    <label>
                      <RiBuilding4Fill className="aCreateUserInputIcons" />{" "}
                      Enter Company<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Enter User's Company"
                      type="text"
                      name="company"
                      value={company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="aCreateUserInput">
                    <label>
                      <RiMailFill className="aCreateUserInputIcons" /> Enter
                      Position<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Ex. Web Developer"
                      type="text"
                      name="position"
                      value={position}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* -------------------------------- */}
                <div className="aCreateUserInputs">
                  <div className="aCreateUserInput">
                    <label>
                      <RiUser3Fill className="aCreateUserInputIcons" /> Enter
                      Country<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Ex. India"
                      type="text"
                      name="country"
                      value={country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="aCreateUserInput">
                    <label>
                      <RiShieldUserFill className="aCreateUserInputIcons" />{" "}
                      User's Role<span>*</span>
                    </label>
                    <br />
                    <input placeholder="User" type="text" disabled />
                  </div>
                </div>
                {/* -------------------------------- */}

                {/* -------------------------------- */}
                <div className="aCreateUserInputs">
                  <div className="aCreateUserInput">
                    <label>
                      <RiLock2Fill className="aCreateUserInputIcons" /> Set
                      Password<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="***********"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="aCreateUserInput">
                    <label>
                      <RiLock2Fill className="aCreateUserInputIcons" /> Confirm
                      Password<span>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="**********"
                      type="password"
                      name="cpassword"
                      value={cpassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <input
                    type="hidden"
                    value={admin}
                    name="admin"
                    onChange={handleInputChange}
                  />
                </div>
                {/* -------------------------------- */}
                <button type="submit" className="createUserBtn">
                  <RiSendPlaneFill className="aCreateUserInputIcons" /> Create
                  User
                </button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
        <div className="aSidebar">
          <ASidebar />
        </div>
      </div>

      {/*  */}
    </>
  );
};

export default AEditUser;
