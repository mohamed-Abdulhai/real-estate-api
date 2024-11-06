import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    service :'gmail',
    auth: {
      user: process.env.EMAIL,
      pass:process.env.EMAIL_PASSWORD,
    },
  });

  export const sendEmail = async (email, subject, template, token) => {
    const htmlContent = await template(token);  
    const info = await transporter.sendMail({
      from: `"real estate" <${process.env.EMAIL}>`,
      to: email,
      subject,
      html: htmlContent,  
    }).catch(console.error);
  
    if (info) {
      console.log("Message sent: %s", info.messageId);
    }
  };