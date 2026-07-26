import Section from "../models/section.js"
import Course from "../models/course.js"

export const createSection = async (req,res)=>{
    try {
        const {sectionName,courseId} = req.body;

        //validation
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            });
        }

        //create section
        const section = await Section.create({sectionName});

        //update course with section id
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
                                                                          $push: {
                                                                            courseContent:section._id
                                                                          }  
                                                                        }, {new:true})
                                                                        .populate({
                                                                            path:"courseContent",
                                                                            populate: {
                                                                                path:"subSection"
                                                                            }});
        //HW: use populate to replace section/subsection both in updated course
        return res.status(201).json({
            success:true,
            message:"Section created successfully",
            updatedCourse,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create Section,please try again",
            error:error.message,
        });
    }
}


export const updateSection = async (req,res)=>{
    try {
        const {sectionName,sectionId} = req.body;

        //validate
        if(!sectionName || !sectionId)
        {
            return res.status(400).json({
            success:false,
            message:"Missing Properties",
        });
        }

        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        return res.status(200).json({
            success:true,
            message:"Section updated succesfully",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section,please try again",
            error:error.message,
        });
    }
}

export const deleteSection = async(req,res)=>{
     try {
        
        const {sectionId, courseId} = req.body;

        if (!sectionId) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        const sectionDetails = await Section.findById(sectionId);
        
        // //Section ke ander ke subsections delete kiye hai 
        sectionDetails.subSection.forEach( async (ssid)=>{
            await SubSection.findByIdAndDelete(ssid);
        })
        console.log('Subsections within the section deleted')
        //NOTE: Due to cascading deletion, Mongoose automatically triggers the built-in middleware to perform a cascading delete for all the referenced 
        //SubSection documents. DOUBTFUL!

        //From course, courseContent the section gets automatically deleted due to cascading delete feature
        await Section.findByIdAndDelete(sectionId);
        console.log('Section deleted')

        const updatedCourse = await Course.findById(courseId)
          .populate({
              path:"courseContent",
              populate: {
                  path:"subSection"
              }});
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
            updatedCourse
        })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to delete Section',
            error: error.message,
        })
    }
}