import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { sendWaitlistEmail } from "./api/send-waitlist-email"; // correct path

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/waitlist", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await sendWaitlistEmail(email);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(5000, () => {
  console.log("✅ Express server running on port 5000");
});
