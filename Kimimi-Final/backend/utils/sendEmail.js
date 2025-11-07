import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM, // verified sender
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Email send error:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
