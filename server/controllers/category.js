import Category from "../models/category.js"
import Course from "../models/course.js"
import mongoose from "mongoose"

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
export const createCategory = async (req,res) =>{
    try {
        const {name, description} =  req.body;

        if(!name){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const newCategory = await Category.create({
            name,
            description
        })

        if (!newCategory) {
            return res.status(401).json({
                success:false,
                message:"Error in pushing new tag to db"
            }) 
        }

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const showAllCategories = async (req,res) => {

    try {
        const allCategories =  await Category.find({},{name:true,
                                        description:true});
        
            return res.status(200).json({
                success:true,
                data:allCategories
            })  
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const categoryPageDetails = async (req,res) => {
    try {
        const { categoryId } = req.body
      // Get courses for the specified category
      const selectedCourses = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCourses)
      // Handle the case when the category is not found
      if (!selectedCourses) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCourses.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
        course: { $not: { $size: 0 } }
      })
      let differentCourses = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
        //console.log("Different COURSE", differentCourses)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
       .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)

        res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses,
		})
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}