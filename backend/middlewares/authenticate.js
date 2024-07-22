const ErrorHandler = require("../utils/errorHandler"); // Import ErrorHandler once

const User = require("../models/userModel");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticationUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to handler"));
  }
 
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

// Remove this line, as ErrorHandler is already imported above
// const { ErrorHandler } = require("../utils/errorHandler");

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => { 
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role ${req.user.role} is not allowed`, 401) 
      ); 
    }
    next();
  };
};
