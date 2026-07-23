import jwt from "jsonwebtoken"
import User from "../models/user"

export const isAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.token || req.header("Authorisation").replace("Bearer ", "");
        if(!token)
        {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }
        try {
            const decoded = await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
                success: false,
                message: "Something went wrong while validating token",
            });
    }
}

// isStudent 
export const isStudent = async (req,res,next)=>{
    try {
        if(req.user.accountType !== "Student")
        {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Students only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
                success: false,
                message: "User role cannot be verified,please try again",
            });
    }
}

// isInstructor
export const isInstructor = async (req,res,next)=>{
    try {
        if(req.user.accountType !== "Instructor")
        {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructors only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
                success: false,
                message: "User role cannot be verified,please try again",
            });
    }
}

//isAdmin
export const isAdmin = async (req,res,next)=>{
    try {
        if(req.user.accountType !== "Admin")
        {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
                success: false,
                message: "User role cannot be verified,please try again",
            });
    }
}