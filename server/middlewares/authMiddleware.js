const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");

const userProtect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not Authorize, Please Login");
    }
    // verify token
    const verified = jwt.verify(token, process.env.USERJWTSECRET);
    // get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.role === "suspended") {
      res.status(400);
      throw new Error("User is suspended, contact support");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorize, Please Login");
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not Authorize, Please Login");
    }
    // verify token
    const verified = jwt.verify(token, process.env.USERJWTSECRET);
    // get user id from token
    const admin = await Admin.findById(verified.id).select("-password");

    if (!admin) {
      res.status(404);
      throw new Error("Admin not found");
    }
    if (admin.role !== "admin") {
      res.status(400);
      throw new Error("You Do Not Have Permissions");
    }
    if (admin.role === "suspended") {
      res.status(400);
      throw new Error("Admin is suspended, contact support");
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorize, Please Login");
  }
});

const verifiedAdminOnly = asyncHandler(async (req, res, next) => {
  if (req.admin && req.admin.isVerified) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized, Account Not Verified");
  }
});

const verifiedUserOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized, Account Not Verified");
  }
});

module.exports = {
  userProtect,
  adminProtect,
  verifiedAdminOnly,
  verifiedUserOnly,
};
