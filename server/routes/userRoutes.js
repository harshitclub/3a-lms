const express = require("express");
const {
  registerUser,
  userLogin,
  userLogout,
  getUser,
  loginStatus,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  changePassword,
} = require("../controllers/userController/userController");
const { userProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/getUser", userProtect, getUser);
router.get("/logout", userLogout);
router.get("/loginStatus", loginStatus);

router.post("/sendVerificationEmail", userProtect, sendVerificationEmail);
router.post("/forgotPassword", forgetPassword);
router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/changePassword", userProtect, changePassword);

module.exports = router;
