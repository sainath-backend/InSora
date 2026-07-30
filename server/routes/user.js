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

import { isAuth } from "../middlewares/isAuth.js"

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", isAuth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
export default router;