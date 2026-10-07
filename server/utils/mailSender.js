import nodemailer from "nodemailer";

const mailSender = async (email,title,body)=>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from:`"InSora" <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject: `${title}`,
            html:`${body}`,
        })
        console.log("Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.error("mailSender Error:", error.message);
        throw error;
    }
}

export default mailSender;