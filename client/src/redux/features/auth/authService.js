import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ADMIN_API_URL = `${BACKEND_URL}/api/admin/`;

//validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//-----------admin services----------//
const adminLogin = async (adminData) => {
  const response = await axios.post(ADMIN_API_URL + "login", adminData);

  return response.data;
};

const adminLogout = async (userData) => {
  const response = await axios.get(ADMIN_API_URL + "logout", userData);

  return response.data.message;
};

//testing the git

const adminLoginStatus = async (adminData) => {
  const response = await axios.get(ADMIN_API_URL + "loginStatus", adminData);

  return response.data;
};

const getAdmin = async (adminData) => {
  const response = await axios.get(ADMIN_API_URL + "getAdmin", adminData);

  return response.data;
};

const authService = { adminLogin, adminLogout, adminLoginStatus, getAdmin };

export default authService;
