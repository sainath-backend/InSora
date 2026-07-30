import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected successfully");
    } catch (error) {
        console.error(error);
        console.log("Database Connection Error");
    }
}

export default connectDB;