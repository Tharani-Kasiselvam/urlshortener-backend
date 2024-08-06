const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async (user_name, email, subject, link) => {
    try{
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: "pwdresetverify@gmail.com",
            to: email,
            subject: subject,
            html: `<h2>Hi ${user_name},</h2> 
            <br> Kindly click on below link to Reset your Password. 
            <br> ${link}
            <br>
            <br>Thanks,
            <br>NodeMailer App`
        })
        console.log("email sent sucessfully")

    }catch(error){
        console.log(error, "email not sent")
    }
}

module.exports = sendEmail