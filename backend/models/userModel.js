const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: isEmail } = require("validator/lib/isEmail");
const crypto = require("crypto");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    maxlength: [6, "password cannot exceed 6 character"],
    select: false,
  },
   avatar:{
   type:String,
   } ,


  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

  role: {
    type: String,
    default: "user",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  console.log("onSave", this.password);
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
userSchema.methods.isValidPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  this.resetPasswordToken = hashedToken;
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token; // Return the original token, not the hashed one
};

let model = mongoose.model("User", userSchema);

module.exports = model;
