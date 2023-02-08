import React, { useState } from "react";
import "./Register.css";
import { RiCheckboxCircleFill, RiLoginBoxFill } from "react-icons/ri";
import Navbar from "../../Components/Navbar/Navbar";

const Register = () => {
  const [inputData, setInputData] = useState({
    fname: "",
    email: "",
    username: "",
    phone: "",
    gender: "",
    status: "",
    company: "",
    position: "",
    country: "",
    password: "",
    cpassword: "",
  });

  // console.log(inputData);

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitUserData = (e) => {
    e.preventDefault();
    const {
      fname,
      email,
      username,
      phone,
      gender,
      status,
      company,
      position,
      country,
      password,
      cpassword,
    } = inputData;

    if (fname === "") {
      alert("Name is Required!");
    } else if (email === "") {
      alert("Email is Required!");
    } else if (!email.includes("@")) {
      alert("Enter Valid Email!");
    } else if (username === "") {
      alert("Username is Required!");
    } else if (phone === "") {
      alert("Phone is Required!");
    } else if (gender === "") {
      alert("Gender is Required!");
    } else if (status === "") {
      alert("Status is Required!");
    } else if (company === "") {
      alert("Company is Required!");
    } else if (position === "") {
      alert("Position is Required!");
    } else if (country === "") {
      alert("Country is Required!");
    } else if (password === "") {
      alert("Password is Required!");
    } else if (password.length < 8) {
      alert("Password is too Short!");
    } else if (cpassword === "") {
      alert("Confirm Password is Required!");
    } else if (password !== cpassword) {
      alert("Password and Confirm Password is Not Matching!");
    } else {
      alert("Success!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup">
        <div className="signupContainer">
          <div className="signupHeader">
            <h2>Register & Start Learning</h2>
          </div>
          <form>
            <div>
              <input
                placeholder="Full Name"
                type="text"
                name="fname"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>

            <div>
              <input
                placeholder="Email"
                type="email"
                name="email"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>
            <div>
              <input
                placeholder="Username"
                type="text"
                name="username"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>
            <div>
              <input
                placeholder="Phone"
                type="number"
                name="phone"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>
            <div>
              <select
                placeholder="Gender"
                name="gender"
                onChange={setInputValue}
              >
                <option>Select Your Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <select name="status" onChange={setInputValue}>
                <option>User Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div>
              <input
                placeholder="Company"
                type="text"
                name="company"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>

            <div>
              <input
                placeholder="Position"
                type="text"
                name="position"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>
            <div>
              <input
                placeholder="Country"
                type="text"
                name="country"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>
            <div>
              <input
                placeholder="Confirm Password"
                type="password"
                name="cpassword"
                autoComplete="off"
                onChange={setInputValue}
              />
            </div>
            <div className="signupBtn">
              <button onClick={submitUserData}>Register</button>
            </div>
            <div className="signupAgree">
              <p>
                <RiCheckboxCircleFill /> By Signing Up, You Agree to our Terms
                of Use and Privacy Policy
              </p>
            </div>
            <div className="signupLogin">
              <p>
                Already Have An Account?{" "}
                <a href="/login">
                  <RiLoginBoxFill className="signupIcon" />
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
