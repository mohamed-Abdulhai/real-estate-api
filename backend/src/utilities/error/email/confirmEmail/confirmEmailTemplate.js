export const ConfirmEmailTemplate = async (token) => {
    const baseUrl = process.env.HOST
    const confirmationUrl = `${baseUrl}/api/v1/auth/verify-email/${token}`;
    return `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                    <h2 style="color: #333;">Email Confirmation</h2>
                    <p>Hi there!</p>
                    <p>Thank you for signing up. Please confirm your email address by clicking the button below:</p>
                    <a href="${confirmationUrl}" style="display: inline-block; padding: 10px 15px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
                    <p>If you did not sign up, please ignore this email.</p>
                    <p>Best regards,<br>mohamed abdulhai</p>
                </div>
            </body>
        </html>
    `;
};
