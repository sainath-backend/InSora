// Import the required modules
import express from "express"
const router = express.Router()

// Import the required controllers and middleware functions
import {
  login,
  signUp,
  sendOTP,
  changePassword,
} from "../controllers/auth.js"
import {
  resetPasswordToken,
  resetPassword,
} from "../controllers/resetPassword.js"

import { isAuth,isAdmin} from "../middlewares/isAuth.js"
import {getAllStudents, getAllInstructors} from "../controllers/profile.js"


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user signup
router.post('/signup', signUp);

// Route for user login
router.post('/login', login);

// Route for sending OTP to the user's email
router.post('/sendotp', sendOTP);

// Route for Changing the password
router.post('/changepassword', isAuth, changePassword);



// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post('/reset-password-token', resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


// ********************************************************************************************************
//                                     Only for Admin - getAllStudents & getAllInstructors
// ********************************************************************************************************

router.get("/all-students", isAuth, isAdmin, getAllStudents)
router.get("/all-instructors", isAuth, isAdmin, getAllInstructors)
export default router;