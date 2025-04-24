import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWaitlistEmail = async (email: string) => {
  try {
    await resend.emails.send({
      from: 'Courseova <onboarding@resend.dev>',
      to: email,
      subject: '🚀 Welcome to Courseova!',
      html: `
        <div>
          <h1>🎉 Thanks for Joining the Waitlist!</h1>
          <p>You’re now part of our Courseova fam. Here’s what you’ll get:</p>
          <ul>
            <li>✅ Full MERN Stack Course</li>
            <li>✅ Lifetime Access + Certificate</li>
            <li>✅ Notes, Projects & Real Interview Prep</li>
          </ul>
          <p><strong>Get everything at just ₹98/-</strong></p>
          <a href="https://yourwebsite.com/courses/web-development">👉 Enroll Now</a>
        </div>
      `
    });
    console.log(`📧 Email sent to: ${email}`);
  } catch (error) {
    console.error("❌ Email failed:", error);
    throw error;
  }
};
