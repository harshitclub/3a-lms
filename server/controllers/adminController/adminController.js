const asyncHandler = require("express-async-handler");
const Admin = require("../../models/adminSchema");
const User = require("../../models/userSchema");
const Token = require("../../models/tokenModel");
const { generateToken, hashToken } = require("../../utils/index");
const { sendEmail } = require("../../utils/sendEmail");
const parser = require("ua-parser-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Cryptr = require("cryptr");

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

//register admin-----------------------------
const registerAdmin = asyncHandler(async (req, res) => {
  const { company, email, phone, password } = req.body;

  // check all the required entries are filled or not
  if (!company || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please Fill All The Required Details!");
  }
  if (password.length < 6) {
    throw new Error("Password must be atleast of 6 characters long");
  }

  //   check if the user exists or not
  const adminExist = await Admin.findOne({ email });
  if (adminExist) {
    throw new Error("Email Already in Use.");
  }

  // get user agent
  const ua = parser(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  //   create the new user
  const admin = await Admin.create({
    company,
    email,
    phone,
    userAgent,
    password,
  });

  // generate token using jwt
  const token = generateToken(admin._id);

  // send httpOnly cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (admin) {
    const {
      _id,
      company,
      email,
      phone,
      business,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
      role,
      isVerified,
      token,
      userAgent,
      date,
    } = admin;
    res.status(201).json({
      _id,
      company,
      email,
      phone,
      business,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
      role,
      isVerified,
      token,
      userAgent,
      date,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin Data");
  }
});

//send verification mail-----------------------
const sendVerificationEmail = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin Not Found");
  }

  if (admin.isVerified) {
    res.status(400);
    throw new Error("User Verified");
  }

  //delete token if it exist in db
  let token = await Token.findOne({ adminId: admin._id });

  if (token) {
    await token.deleteOne();
  }

  //create verification token & save in db
  const verificationToken = crypto.randomBytes(32).toString("hex") + admin._id;
  console.log(verificationToken);

  // hash token and save
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: admin._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60min
  }).save();

  //contruct verification url
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  //send verification email
  const subject = "Verify Your Account - LMS";
  const send_to = admin.email;
  const send_from = process.env.EMAIL_USER;
  const reply_to = "noreply@lms.com";
  const template = "verifyEmail";
  const name = admin.name;
  const link = verificationUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Verification Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

//verify admin-------------------------------------
const verifyAdmin = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  const hashedToken = hashToken(verificationToken);

  const adminToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!adminToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  //find user
  const admin = await Admin.findOne({ _id: adminToken.userId });

  if (admin.isVerified) {
    res.status(400);
    throw new Error("Admin is already verified");
  }

  // now verify the user
  admin.isVerified = true;
  await admin.save();

  res.status(200).json({
    message: "Account Verification Successfull",
  });
});

//login admin function----------------------
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Provide Email & Password");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(400);
    throw new Error("User Not Exist!");
  }

  const passwordIsCorrect = await bcrypt.compare(password, admin.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid Credentials!");
  }
  // trigger 2 factor authentication for unknown user agent
  // const ua = parser(req.headers["user-agent"]);
  // const thisUserAgent = ua.ua;

  // const allowedAgent = admin.userAgent.includes(thisUserAgent);

  // if (!allowedAgent) {
  //   // generate 6 digit code
  //   const loginCode = Math.floor(100000 + Math.random() * 900000);
  //   console.log(loginCode);

  //   //encrypt login code before saving to db
  //   const encryptedLoginCode = cryptr.encrypt(loginCode.toString());

  //   //delete token if it exists in db
  //   let adminToken = await Token.findOne({ userId: admin._id });
  //   if (adminToken) {
  //     await adminToken.deleteOne();
  //   }

  //save token to db
  //   await new Token({
  //     userId: admin._id,
  //     lToken: encryptedLoginCode,
  //     createdAt: Date.now(),
  //     expiresAt: Date.now() + 60 * (60 * 1000),
  //   }).save();

  //   res.status(400);
  //   throw new Error("New Browser or device detected");
  // }

  //generate token
  const loginToken = generateToken(admin._id);
  if (admin && passwordIsCorrect) {
    res.cookie("token", loginToken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
    const {
      _id,
      company,
      email,
      phone,
      business,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
      role,
      isVerified,
      token,
      userAgent,
      date,
    } = admin;

    res.status(200).json({
      _id,
      company,
      email,
      phone,
      business,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
      role,
      isVerified,
      token,
      userAgent,
      date,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong please try again");
  }
});

//send login code---------------------------------------
const sendLoginCode = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(404);
    throw new Error("Admin Not Found");
  }

  // Find Login Code In DB
  let adminToken = await Token.findOne({
    userId: admin._id,
    expiresAt: { $gt: Date.now() },
  });

  if (!adminToken) {
    res.status(404);
    throw new Error("Invalid or Expired token, please login again");
  }

  const loginCode = adminToken.lToken;
  const decryptedLoginCode = cryptr.decrypt(loginCode);
  console.log(decryptedLoginCode);

  //send login code

  const subject = "Login Access Code - AUTH:Z";
  const send_to = email;
  const send_from = process.env.EMAIL_USER;
  const reply_to = "noreply@lms.com";
  const template = "loginCode";
  const name = admin.company;
  const link = decryptedLoginCode;

  try {
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: `Access code sent to ${email}` });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// login with code ----------------------------------------
const loginWithCode = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const { loginCode } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(404);
    throw new Error("User Not Found");
  }

  //find user login token
  const adminToken = await Token.findOne({
    userId: admin.id,
    expiresAt: { $gt: Date.now() },
  });

  if (!adminToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token, Please Login Again");
  }

  const decryptedLoginCode = cryptr.decrypt(adminToken.lToken);

  if (loginCode !== decryptedLoginCode) {
    res.status(400);
    throw new Error("Incorrect login code, please try again");
  } else {
    // register userAgent
    const ua = parser(req.headers["user-agent"]);
    const thisUserAgent = ua.ua;
    admin.userAgent.push(thisUserAgent);
    await admin.save();

    // generate token
    const token = generateToken(admin._id);

    // send http-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const {
      _id,
      company,
      email,
      phone,
      business,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
      role,
      isVerified,
      userAgent,
      date,
    } = admin;

    res.status(200).json({
      _id,
      company,
      email,
      phone,
      business,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
      role,
      isVerified,
      userAgent,
      date,
    });
  }
});

//logout admin function------------------------
const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "Logout Success!",
  });
});

//get admin details----------------------------
const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    const {
      _id,
      company,
      email,
      phone,
      business,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
      role,
      isVerified,
      token,
      userAgent,
      date,
    } = admin;
    res.status(200).json({
      _id,
      company,
      email,
      phone,
      business,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
      role,
      isVerified,
      token,
      userAgent,
      date,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

//login admin status--------------------------------
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  // verify token
  const verified = jwt.verify(token, process.env.USERJWTSECRET);

  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//get admin users-----------------------------------
const getAdminUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt").select("-password");
  if (!users) {
    res.status(404);
    throw new Error("Something Went Wrong!");
  }
  res.status(200).json({
    users,
  });
});

//update admin user---------------------------------
const updateAdminUser = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    const {
      company,
      email,
      business,
      phone,
      address,
      city,
      state,
      country,
      zip,
      gstin,
      website,
    } = admin;

    admin.email = email;
    admin.company = req.body.company || company;
    admin.business = req.body.business || business;
    admin.phone = req.body.phone || phone;
    admin.address = req.body.address || address;
    admin.city = req.body.city || city;
    admin.state = req.body.state || state;
    admin.country = req.body.country || country;
    admin.zip = req.body.zip || zip;
    admin.gstin = req.body.gstin || gstin;
    admin.website = req.body.website || website;

    const updatedAdmin = await admin.save();

    res.status(200).json({
      _id: updatedAdmin._id,
      email: updatedAdmin.email,
      company: updatedAdmin.company,
      business: updatedAdmin.business,
      phone: updatedAdmin.phone,
      address: updatedAdmin.address,
      city: updatedAdmin.city,
      state: updatedAdmin.state,
      country: updatedAdmin.country,
      zip: updatedAdmin.zip,
      gstin: updatedAdmin.gstin,
      website: updatedAdmin.website,
      isVerified: updatedAdmin.isVerified,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

//delete admin user-------------------------------------
const deleteAdminUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({
    message: "User removed successfully",
  });
});

//forget password--------------------------------
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(404);
    throw new Error("No user with this email");
  }
  // Delete token if it exists in db
  let token = await Token.findOne({ adminId: admin._id });
  if (token) {
    await token.deleteOne();
  }

  // create verification token and save
  const resetToken = crypto.randomBytes(32).toString("hex") + admin._id;

  console.log(resetToken);

  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: admin._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), //60minutes
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  // Send Email
  const subject = "Password Reset Request - LMS";
  const send_to = admin.email;
  const send_from = process.env.EMAIL_USER;
  const reply_to = "noreply@zino.com";
  const template = "forgotPassword";
  const name = admin.company;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

//reset password-----------------------------
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  console.log(resetToken);

  const hashedToken = hashToken(resetToken);

  const adminToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!adminToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // find user
  const admin = await Admin.findOne({ _id: adminToken.userId });

  // now reset password
  admin.password = password;

  await admin.save();

  res.status(200).json({
    message: "Password Reset Successfully, Please Login!",
  });
});

//change password----------------------------
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;
  const admin = await Admin.findById(req.admin._id);
  if (!admin) {
    res.status(404);
    throw new Error("User Not Found");
  }

  if (!oldPassword || !password) {
    throw new Error("Please Enter Old and New Password");
  }

  //check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, admin.password);

  // save new password
  if (admin && passwordIsCorrect) {
    admin.password = password;
    await admin.save();

    res.status(200).json({
      message: "Password Change Successfully, Please Re-login",
    });
  } else {
    res.status(400);
    throw new Error("Old password is Incorrect");
  }
});

//upgrade the admin user--------------------------
const upgradeUser = asyncHandler(async (req, res) => {
  const { role, id } = req.body;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    message: `User Role Updated To ${role}`,
  });
});

module.exports = {
  registerAdmin,
  sendVerificationEmail,
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
  verifyAdmin,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
};
