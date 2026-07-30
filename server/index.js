import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
import fileUpload from "express-fileupload";
import cloudinaryConnect from "./config/cloudinary.js"

import userRoutes from "./routes/user.js"
import profileRoutes from "./routes/profile.js"
import paymentRoutes from "./routes/payment.js"
import courseRoutes from "./routes/course.js"


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true,
}));
dotenv.config();
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//routes 
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running.."
    });
})

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    connectDB();
    cloudinaryConnect();
    console.log(`server is running on port:${PORT}`);
});