const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// creating admin schema
const adminSchema = new Schema({
  company: {
    type: String,
    required: [true, "Please Enter Company Name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Company Email Address"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Enter A Valid Email",
    ],
  },
  business: {
    type: String,
    default: "",
  },

  phone: {
    type: Number,
    required: [true, "Please Enter Company Phone Number"],
    unique: true,
    maxLength: 10,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  gstin: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
    default: "admin",
  },
  userAgent: {
    type: Array,
    required: true,
    default: [],
  },
  isVerified: {
    type: Boolean,
    default: false,
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
adminSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("admin", adminSchema);
