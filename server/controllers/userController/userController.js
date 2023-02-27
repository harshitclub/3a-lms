const asyncHandler = require("express-async-handler");
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

//-------------register user function ------------------/;
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    gender,
    status,
    company,
    position,
    role,
    country,
    admin,
    password,
  } = req.body;

  // check all the required entries are filled or not
  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please Fill All The Required Details!");
  }
  if (password.length < 6) {
    throw new Error("Password must be atleast of 6 characters long");
  }

  //   check if the user exists or not
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("Email Already in Use.");
  }

  // get user agent
  const ua = parser(req.headers["user-agent"]);
  const userAgent = [ua.ua];

  //   create the new user
  const user = await User.create({
    name,
    email,
    phone,
    gender,
    status,
    company,
    position,
    role,
    country,
    admin,
    userAgent,
    password,
  });

  // generate token using jwt
  const token = generateToken(user._id);

  // send httpOnly cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const {
      _id,
      name,
      email,
      phone,
      gender,
      company,
      position,
      role,
      admin,
      isVerified,
      token,
      userAgent,
      date,
    } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      gender,
      company,
      position,
      role,
      admin,
      isVerified,
      token,
      userAgent,
      date,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//-------------send verification mail ------------------/
const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User Verified");
  }

  //delete token if it exist in db
  let token = await Token.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }

  //create verification token & save in db
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(verificationToken);

  // hash token and save
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: user._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60min
  }).save();

  //contruct verification url
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  //send verification email
  const subject = "Verify Your Account - LMS";
  const send_to = user.email;
  const send_from = process.env.EMAIL_USER;
  const reply_to = "noreply@lms.com";
  const template = "verifyEmail";
  const name = user.name;
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

//-------------login user function ------------------/
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Provide Email & Password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User Not Exist!");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    throw new Error("Invalid Credentials!");
  }
  // trigger 2 factor authentication for unknown user agent

  //generate token
  const loginToken = generateToken(user._id);
  if (user && passwordIsCorrect) {
    res.cookie("token", loginToken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
    const {
      _id,
      name,
      email,
      phone,
      gender,
      company,
      position,
      role,
      admin,
      isVerified,
      token,
      userAgent,
      date,
    } = user;

    res.status(200).json({
      _id,
      name,
      email,
      phone,
      gender,
      company,
      position,
      role,
      admin,
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

//-------------logout user function ------------------/
const userLogout = asyncHandler(async (req, res) => {
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

//------------get user details -------------/
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const {
      _id,
      name,
      email,
      phone,
      gender,
      company,
      position,
      role,
      admin,
      isVerified,
      token,
      userAgent,
      date,
    } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      gender,
      company,
      position,
      role,
      admin,
      isVerified,
      token,
      userAgent,
      date,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//-------------update user function ------------------/
//-------------login user status------------------/
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

//-------------forget password------------------/
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("No user with this email");
  }
  // Delete token if it exists in db
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // create verification token and save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  console.log(resetToken);

  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), //60minutes
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  // Send Email
  const subject = "Password Reset Request - LMS";
  const send_to = user.email;
  const send_from = process.env.EMAIL_USER;
  const reply_to = "noreply@zino.com";
  const template = "forgotPassword";
  const name = user.name;
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

//--------------reset password--------------/
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  console.log(resetToken);

  const hashedToken = hashToken(resetToken);

  const userToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // find user
  const user = await User.findOne({ _id: userToken.userId });

  // now reset password
  user.password = password;

  await user.save();

  res.status(200).json({
    message: "Password Reset Successfully, Please Login!",
  });
});

//-------------change password---------------/
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  if (!oldPassword || !password) {
    throw new Error("Please Enter Old and New Password");
  }

  //check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();

    res.status(200).json({
      message: "Password Change Successfully, Please Re-login",
    });
  } else {
    res.status(400);
    throw new Error("Old password is Incorrect");
  }
});

module.exports = {
  registerUser,
  userLogin,
  userLogout,
  getUser,
  loginStatus,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  changePassword,
};
