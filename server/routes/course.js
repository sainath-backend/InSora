// Import the required modules
import express from "express"
const router = express.Router();

// Import the Controllers

// Course Controllers Import
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
} from "../controllers/course.js"


// Categories Controllers Import
import {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} from "../controllers/category.js"

// Sections Controllers Import
import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/section.js"

// Sub-Sections Controllers Import
import {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} from "../controllers/subSection.js"

// Rating Controllers Import
import {
  createRating,
  getAverageRating,
  getAllRatingReview
} from "../controllers/ratingAndReview.js"

// import {
//   updateCourseProgress
// } from "../controllers/courseProgress.js"

// Importing Middlewares
import { isAuth, isInstructor, isStudent, isAdmin } from "../middlewares/isAuth.js"

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", isAuth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", isAuth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", isAuth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", isAuth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", isAuth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", isAuth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", isAuth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
// router.post("/getFullCourseDetails", isAuth, getFullCourseDetails)
// Edit Course routes
// router.post("/editCourse", isAuth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
// router.get("/getInstructorCourses", isAuth, isInstructor, getInstructorCourses)
// Delete a Course
// router.delete("/deleteCourse", deleteCourse)

// router.post("/updateCourseProgress", isAuth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", isAuth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", isAuth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingReview)

export default router;