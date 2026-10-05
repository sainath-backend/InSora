// Import the required modules
import express from "express"
const router = express.Router()

import { capturePayment, verifyPayment} from "../controllers/payments.js"
import { isAuth, isInstructor, isStudent, isAdmin } from "../middlewares/isAuth.js";
router.post("/capturePayment", isAuth, isStudent, capturePayment)
router.post("/verifyPayment",isAuth, isStudent, verifyPayment)

export default router;