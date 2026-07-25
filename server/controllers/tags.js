import Tag from "../models/tags.js"

export const createTag = async (req,res)=>{
    try {
        const {name,description} = req.body;
        if(!name || !description) 
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        // create tag
        const tag = await Tag.create({
            name,
            description
        });
        console.log(tag);

        return res.status(201).json({
                success:true,
                message:"Tag created successfully",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
                success:false,
                message:error.message,
            });
    }
}

//get all tags

export const showAllTags = async (req,res)=>{
    try {
        const allTags = await Tag.find({},{name:true,description:true});
        return res.status(200).json({
                success:true,
                allTags,
                message:"All tags returned successfully",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
                success:false,
                message:error.message,
            });
    }
}