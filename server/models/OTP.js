import mongoose from "mongoose"
import mailSender from "../utils/mailSender.js";
import emailTemplate from "../mail/templates/emailVerificationTemplate.js"

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
    },
    otp:{
        type:String,
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 5*60,
    }
});

async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification Email From InSora",emailTemplate(otp));
        console.log("Email sent Successfully",mailResponse);
    } catch (error) {
        console.log(error);
        console.log("Error while sending verification email")
    }
}

OTPSchema.pre("save",async function(){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
});

const OTP = mongoose.model("OTP",OTPSchema);
export default OTP;