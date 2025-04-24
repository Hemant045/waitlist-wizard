import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWaitlistEmail = async (email: string) => {
  try {
    await resend.emails.send({
      from: 'Courseova <onboarding@resend.dev>',
      to: email,
      subject: '🚀 Welcome to Courseova!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h1 style="color: #6B46C1;">🎉 Thanks for Joining the Waitlist!</h1>
          <p>You’re now part of our Courseova tech fam. Here’s what you’ll get:</p>
          <ul>
            <li>✅ Full MERN Stack Course</li>
            <li>✅ Lifetime Access + Certificate</li>
            <li>✅ Notes, Projects & Real Interview Prep</li>
          </ul>
          <p><strong>Get everything at just ₹98/-</strong></p>
          <a href="https://yourwebsite.com/courses/web-development"
            style="display:inline-block; background:#6B46C1; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px; margin-top:20px;">
            👉 Enroll Now
          </a>
        </div>
      `
    });
    console.log(`📧 Welcome email sent to: ${email}`);
  } catch (err) {
    console.error("❌ Failed to send waitlist email:", err);
  }
};
