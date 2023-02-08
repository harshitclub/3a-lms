const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// creating user schema
const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "Please Enter Your Name"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Please Enter Your Email Address"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Enter A Valid Email",
    ],
  },
  phone: {
    type: Number,
    require: [true, "Please Enter Your Phone Number"],
    unique: true,
    maxLength: 10,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  company: {
    type: String,
    trim: true,
    default: "",
  },
  position: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
    default: "user",
    //admi or user
  },
  userAgent: {
    type: Array,
    required: true,
    default: [],
  },
  country: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// encrypt password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  }
});

module.exports = mongoose.model("user", userSchema);
