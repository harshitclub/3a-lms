const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  adminLogin,
  adminLogout,
  getAdmin,
  loginStatus,
  forgetPassword,
  resetPassword,
  changePassword,
  getAdminUsers,
  deleteAdminUser,
  updateAdminUser,
  sendVerificationEmail,
  verifyAdmin,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
} = require("../controllers/adminController/adminController");
const { adminProtect } = require("../middlewares/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", adminLogin);
router.get("/logout", adminLogout);
router.get("/getAdmin", adminProtect, getAdmin);
router.get("/loginStatus", loginStatus);

router.get("/getUsers", adminProtect, getAdminUsers);
router.patch("/updateAdmin", adminProtect, updateAdminUser);
router.delete("/:id", adminProtect, deleteAdminUser);
router.post("/upgradeUser", adminProtect, upgradeUser);

router.post("/forgotPassword", forgetPassword);
router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/changePassword", adminProtect, changePassword);

router.post("/verificationEmail", adminProtect, sendVerificationEmail);
router.patch("/verifyAdmin/:verificationToken", verifyAdmin);

router.post("/sendLoginCode/:email", sendLoginCode);
router.post("/loginWithCode/:email", loginWithCode);

module.exports = router;
