import nodemailer from 'nodemailer'

const senderEmail = process.env.EMAIL
const password = process.env.EMAIL_PASSWORD
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:senderEmail,
        pass:password
    }
})


export const sendEmail = async(email,subject,template) => {
    try {
        const info = await transporter.sendMail({
            from:`Real Estate <${senderEmail}>`,
            to:email,
            subject:subject,
            html:template(token)

        })
    } catch (error) {
        console.error('Error sending email', error.EMAIL, error)
    }

}