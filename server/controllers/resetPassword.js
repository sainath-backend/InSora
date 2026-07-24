
import User from "../models/user.js"
import mailSender from "../utils/mailSender.js"
import bcrypt from "bcrypt"

export const resetPasswordToken = async(req,res)=>{
    try {
        const email = req.body.email;
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                success: false,
                message: "Your Email is not registered with us",
            });
        }
        //generate token
        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email},{token:token,resetPasswordExpires: Date.now()+ 5*60*1000},{new:true});
        
        //create url
        const url = `http://localhost:3000/reset-password/${token}`

        //send Email containing url
        await mailSender(email,"Password Reset Link",`Password Reset Link: ${url}`);

        return res.status(200).json({
                success: true,
                message: "Email sent successfully, please check email and change password",
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success: false,
                message: "Something went wrong while sending reset password mail",
            });
    }
}

//resetPassword

export const resetPassword = async (req,res)=>{
    try {
        const {password,confirmPassword,token} = req.body;
        
        //validation
        if(password !== confirmPassword)
        {
            return res.json({
                success:false,
                message:"Passwords are not matching"
            });
        }

        const user = await User.findOne({token});
        if(!user)
        {
            return res.json({
                success:false,
                message:"Token is invalid"
            });
        }
        //check token expired
        if(user.resetPasswordExpires < Date.now())
        {
            return res.json({
                success:false,
                message:"Token expired, please regenerate your token",
            });
        }
        
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        const updatedUser = await User.findOneAndUpdate({email:user.email},{password:hashedPassword},{new:true});

        return res.status(200).json({
                success:true,
                message:"Password reset successfully"
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                success:false,
                message:"Something went wrong while resetting password "
            });
    }
}