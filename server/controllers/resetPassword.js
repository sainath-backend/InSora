
import User from "../models/user.js"
import mailSender from "../utils/mailSender.js"
import bcrypt from "bcrypt"
import crypto from "crypto"


export const resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not registered with us enter a valid Email`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, 
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );

    console.log("DETAILS", updatedDetails)

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
       email,
       "Reset your Password => ", 
       `Password Reset Link: ${url}`);
    return res.json({
      success: true,
      message: "Email Sent Sucessfully, Please check Your Email to continue Further",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      sucess: false,
      message: `Some Error in sending the Reset Message`,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and confirm Password Didn't match",
      });
    }

    const userDetails = await User.findOne({ token: token });

    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (!userDetails.resetPasswordExpires > Date.now()) {
      return res.status(403).json({
        success: false,
        message: "Token is expired, Please regenerate your token ",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: "SomeThing Went wrong While Sending reset Password Mail",
    })
  }
};