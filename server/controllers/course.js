import User from "../models/user.js"
import Tag from "../models/tags.js"
import Course from "../models/course.js"
import { uploadImageToCloudinary } from "../utils/imageUploader.js"

export const createCourse = async (req,res)=>{
    try {
        const {courseName,courseDescription,whatYourWillLearn,price,tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYourWillLearn || !price || !tag || !thumbnail)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        //check instructor
        const userId = req.user.id;
        const instructor = await User.findById(userId);

        if(!instructor)
        {
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            });
        }

        //check given tag is valid 
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails)
        {
            return res.status(404).json({
                success:false,
                message:"Tag details not found"
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructor._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        });

        // add new course to instructor schema
        await User.findByIdAndUpdate(
            {_id:instructor._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true}
        );
        
        //update tag ka schema
        //todo

        return res.status(201).json({
                success:true,
                message:"Course Created Successfully"
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success:true,
                message:"Failed to create course",
                error:error.message,
            });
    }
}

// getAllCourses 
export const showAllCourses = async (req,res)=>{
    try {
        const allCourses = await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true
        }).populate("instructor").exec();
        return res.status(200).json({
                success:true,
                message:"All courses fetched successfully",
                data:allCourses,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success:true,
                message:"Failed to create course",
                error:error.message,
            });
    }
}