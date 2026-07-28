import RatingAndReview from "../models/ratingAndReview.js"
import Course from "../models/course.js"


//create rating
export const createRating = async(req,res)=>{
    try {
        const userId = req.user.id;

        const {rating,review,courseId} = req.body;

        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
                studentsEnrolled: {$elemMatch:{$eq: userId}},
            });
        
        if(!courseDetails)
        {
            return res.status(404).json({
                success:true,
                message:"Student is not enrolled in the course",
            });
        }

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });

        if(alreadyReviewed)
        {
            return res.status(400).json({
                success:false,
                message:"Course is already reviewed by the user",
            });
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId,
        });

        //update course with this rating
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews: ratingReview._id,
                }
            },
            {new:true});
        
        console.log(updatedCourseDetails);

        return res.status(200).json({
                success:true,
                message:"Rating and Review created Successfully",
                ratingReview
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success:true,
                message:error.message,
            });
    }
}

//getAverage rating
