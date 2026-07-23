import User from "../models/user.js"
import otpGenerator from "otp-generator"
import OTP from "../models/OTP.js"
import Profile from "../models/profile.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//sending OTP
export const sendOTP = async(req,res)=>{
    try {
        const {email} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already registered",
            })
        }
        //generate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        let findOTP = await OTP.findOne({otp:otp});
            while(findOTP){
                otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            findOTP = await OTP.findOne({otp:otp});
        }
        const otpPayload = {email,otp};
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
};

// SIGN UP
export const signUp = async (req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
        {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword value does not match, please try again",
            });
        }
        const userExist = await User.findOne({email});
        if(userExist)
        {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            }); 
        }

        // find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        if(recentOtp.length ==0)
        {
            return res.status(400).json({
                success: false,
                message: "OTP not found ",
            });
        }
        else if(otp !== recentOtp.otp)
        {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const userProfile = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber:null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails: userProfile._id,
            image:`https://api.dicebar.com/5.x/initials/svg?seed=${firstName} ${lastName}` ,
        })

        return res.status(200).json({
                success: true,
                message: "User is registered successfully",
                user,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success: false,
                message: "User cannot be registered, please try again",
            });
        
    }
}

// login
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        //validate data
        if(!email || !password)
        {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user)
        {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first",
            });
        }
        //generate jwt
        if(await bcrypt.compare(password,user.password))
        {
            const payload = {
                id:user._id,
                email:user.email,
                accountType:user.accountType,
            }
            const token = await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"logged in successfully",
            })
        }
        else
        {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success: false,
                message: "Login failure, please try again",
            });
    }
}

export const changePassword = async (req,res)=>{
    // try {
        
    // } catch (error) {
        
    // }
    //get oldPassword,newPassword,confirmPassword
    //validation
    //update password in DB
    //send email - password updated
    // return response
}

