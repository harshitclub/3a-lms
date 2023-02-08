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

const AEditUser = () => {
  const navigate = useNavigate();
  // const [admin, setAdmin] = useState([]);
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    gender: "",
    status: "",
    company: "",
    position: "",
    country: "",
    admin: "gautamharshit41@gmail.com",
    profile: "",
    password: "",
    cpassword: "",
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

    const {
      name,
      email,
      username,
      phone,
      gender,
      status,
      company,
      position,
      country,
      admin,
      password,
      cpassword,
    } = inpval;

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
    } else if (username === "") {
      toast.error("Username is Required!", {
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

    const data = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        username,
        phone,
        gender,
        status,
        company,
        position,
        country,
        admin,
        password,
        cpassword,
      }),
    });

    const res = await data.json();
    if (res.status === "201") {
      toast.success("User Created!", {
        position: "top-right",
      });

      setInpval({
        ...inpval,
        name: "",
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
    }
  };

  useEffect(() => {
    async function adminAuth() {
      try {
        const response = await fetch("/admin-auth", {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });

        const data = await response.json();

        if (data.status === "400") {
          navigate("/admin-login");
        }
      } catch (error) {
        console.log(error);
        navigate("/admin-login");
      }
    }
    adminAuth();
    // eslint-disable-next-line
  }, []);

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
                      value={inpval.name}
                      onChange={setVal}
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
                      value={inpval.email}
                      onChange={setVal}
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
                      value={inpval.username}
                      onChange={setVal}
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
                      value={inpval.phone}
                      onChange={setVal}
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
                      value={inpval.gender}
                      onChange={setVal}
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
                      value={inpval.status}
                      onChange={setVal}
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
                      value={inpval.company}
                      onChange={setVal}
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
                      value={inpval.position}
                      onChange={setVal}
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
                      value={inpval.country}
                      onChange={setVal}
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
                      value={inpval.password}
                      onChange={setVal}
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
                      value={inpval.cpassword}
                      onChange={setVal}
                    />
                  </div>
                  <input
                    type="hidden"
                    value={inpval.admin}
                    name="admin"
                    onChange={setVal}
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
