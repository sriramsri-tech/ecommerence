const express = require("express");
const multer = require('multer')
const path = require('path')

const upload = multer({storage:multer.diskStorage({
  destination: function(req,file ,cb){
    cb(null, path.join(__dirname,'..', 'uploads/user'))
  },
  filename: function(req , file, cb){
    cb(null, file.originalname)
  }
})})
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser, // Changed from logOutUser to logoutUser
} = require("../controllers/authController");
const { isAuthenticationUser , authorizeRoles} = require("../middlewares/authenticate");

const router = express.Router();




router.route("/register").post(upload.single('avatar'),registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser); // Changed from logOutUser to logoutUser
router.route("/password/forgot").post(forgotPassword);
//router.route("/password/reset/:token").post(resetPassword);
router.route("/myprofile").get(isAuthenticationUser, getUserProfile);
router.route("/password/change").put(isAuthenticationUser, changePassword);
router
  .route("/update")
  .put(isAuthenticationUser, upload.single("avatar"), updateProfile);


//Admin roles
router
  .route("/admin/users")
  .get(isAuthenticationUser, authorizeRoles("admin"), getAllUsers);

  router
    .route("/admin/users/:id")
    .get(isAuthenticationUser, authorizeRoles("admin"), getUser)
   
      .put(isAuthenticationUser, authorizeRoles("admin"), updateUser)
      
        .delete(isAuthenticationUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
