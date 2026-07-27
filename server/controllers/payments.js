import {instance} from "../config/razorpay.js"
import Course from "../models/course.js"
import User from "../models/user.js"
import mailSender from "../utils/mailSender.js"
import {courseEnrollmentEmail} from "../mail/templates/courseEnrollmentEmail.js"
import mongoose from "mongoose"

export const capturePayment = async (req,res)=>{
    const {course_id} = req.body;
    const userId = req.user.id;

    //validate
    if(!course_id)
    {
        return res.json({
            success:false,
            message:"Please provide valid course Id",
        });
    }
    //valid course
    let course;
    try {
        course = await Course.findById(course_id);
        if(!course)
        {
            return res.json({
            success:false,
            message:"Could not find the course",
        });
        }
        // check user already paid for this course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid))
        {
            return res.status(200).json({
            success:false,
            message:"Student is already enrolled",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
    // create order
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId,
        }
    };

    try {
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail: course.thumbnail,
            orderId : paymentResponse.id,
            currency: paymentResponse.currency,
            amount:paymentResponse.amount
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"could not initiate order"
        });
    }
};


//verify signature of razorpay and server

export const verifySignature = async (req,res)=>{
    const webhookSecret = "12345678";

    const signature = req.headers("x-razorpay-signature");

    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(digest === signature)
    {
        console.log("payment is Authorized");

        const {courseId,userId} = req.body.payload.payment.entity.notes;

        try {
            //fulfill the action
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});
            if(!enrolledCourse)
            {
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                });
            }
            console.log(enrolledCourse);

            //find student and updated courses array
            const enrolledStudent = await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});
            console.log(enrolledStudent);

            //send mail to student
            const emailResponse = await mailSender(enrolledStudent.email,"Congratulation from InSora","you are onboarded into new InSora course");
            console.log(emailResponse);
            return res.status(200).json({
                    success:true,
                    message:"Signature verified and course added",
                });

            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                    success:false,
                    message:error.message,
                });
        }
    }
    else
    {
        return res.status(400).json({
                    success:false,
                    message:"Invalid request",
                });
    }

};

