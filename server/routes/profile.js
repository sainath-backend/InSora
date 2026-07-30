import express from "express"
const router = express.Router()
import { isAuth, isInstructor } from "../middlewares/isAuth.js"
import {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} from "../controllers/profile.js"

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", isAuth, deleteAccount)
router.put("/updateProfile", isAuth, updateProfile)
router.get("/getUserDetails", isAuth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", isAuth, getEnrolledCourses)
router.put("/updateDisplayPicture", isAuth, updateDisplayPicture)
router.get("/instructorDashboard", isAuth, isInstructor, instructorDashboard)

export default router;