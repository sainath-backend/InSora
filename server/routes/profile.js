import express from "express"
const router = express.Router()
import { isAuth, isInstructor } from "../middlewares/isAuth.js"
//controllers
import {
    updateProfile,
    updateUserProfileImage,
    getUserDetails,
    getEnrolledCourses,
    deleteAccount,
    instructorDashboard
} from "../controllers/profile.js"

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile", isAuth, deleteAccount)
router.put("/updateProfile", isAuth, updateProfile)
router.get("/getUserDetails", isAuth, getUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", isAuth, getEnrolledCourses)
router.put("/updateUserProfileImage", isAuth, updateUserProfileImage)
router.get("/instructorDashboard", isAuth, isInstructor, instructorDashboard)

export default router;