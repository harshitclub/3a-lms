import React from "react";
import "./AViewUsers.css";
import { TbTrash } from "react-icons/tb";
import ANavbar from "../../ANavbar/ANavbar";
import ASidebar from "../../ASidebar/ASidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/features/auth/authSlice";
import { useEffect } from "react";

const AViewUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  console.log(users);

  return (
    <>
      <div className="aDashboard">
        <div className="aNavbar">
          <ANavbar />
        </div>
        <div className="aMain">
          <div className="adminMainUsers">
            <h4>All Users /</h4>
            <hr />
            <div className="adminMainUsersList">
              <div className="adminMainUserTable">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" className="aMUTHminWidth">
                        #
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Username</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Position</th>
                      {/* <th scope="col">Company</th> */}
                      <th scope="col">Status</th>
                      {/* <th scope="col">Country</th> */}

                      <th scope="col">Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => {
                      const {
                        id,
                        name,
                        email,
                        phone,
                        company,
                        gender,
                        position,
                        role,
                        status,
                        country,
                      } = user;
                      return (
                        <tr>
                          <td data-label="#">1</td>
                          <td data-label="Name">{name}</td>
                          <td data-label="Email">{email}</td>
                          <td data-label="Username">{role}</td>
                          <td data-label="Phone">{phone}</td>
                          <td data-label="Gender">{gender}</td>
                          <td data-label="Position">{position}</td>
                          {/* <td data-label="Company">{data.company}</td> */}
                          <td data-label="Status">{status}</td>
                          {/* <td data-label="Country">{data.country}</td> */}

                          <td data-label="Action">
                            <TbTrash className="adminMainUsersTrash" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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

export default AViewUsers;
