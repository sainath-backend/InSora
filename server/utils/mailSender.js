import nodemailer from "nodemailer";

// Reuse the transporter instance across API calls
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    pool: true,             // Keeps the socket connection alive
    maxConnections: 5,      // Limits concurrent connections
    maxMessages: 100,       // Sends up to 100 messages per connection
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    // Prevent indefinite hanging if Render network drops
    connectionTimeout: 5000, 
    greetingTimeout: 5000,
    socketTimeout: 5000,
});

const mailSender = async (email,title,body)=>{
   try {
        const info = await transporter.sendMail({
            from: `"InSora" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.error("mailSender Error:", error.message);
        throw error;
    }
}

export default mailSender;