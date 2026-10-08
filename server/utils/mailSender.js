// import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();
import {Resend} from "resend"
const resend = new Resend(process.env.RESEND_API_KEY);
// Reuse the transporter instance across API calls
// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: 587,                 // 👈 Switch from 465 to 587
//     secure: false,
//     family: 4,
//     pool: true,             // Keeps the socket connection alive
//     maxConnections: 5,      // Limits concurrent connections
//     maxMessages: 100,       // Sends up to 100 messages per connection
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//     },
//     // Prevent indefinite hanging if Render network drops
//     connectionTimeout: 10000, 
//     greetingTimeout: 10000,
//     socketTimeout: 10000,
// });

const mailSender = async (email,title,body)=>{
   try {
        const { data, error } = await resend.emails.send({
            from: "InSora <onboarding@resend.dev>",
            to: [email],
            subject: title,
            html: body,
        });

        if (error) {
            console.error("Resend Error:", error);
            throw new Error(error.message || "Failed to send email");
        }

        console.log("Email sent successfully:", data);

        return data;
    } catch (error) {
        console.error("mailSender Error:", error.message);
        throw error;
    }
}

export default mailSender;