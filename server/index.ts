import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Send Email Endpoint
app.post("/api/send-email", async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    experience,
    accountSize,
    requirements,
  } = req.body;

  const fullName = `${firstName} ${lastName}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Gmail address
      pass: process.env.EMAIL_PASS, // Gmail app password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Request Activation" <${process.env.EMAIL_USER}>`,
      to: "admin@pipblaster.xyz",
      subject: "New Bot Activation Request",
      text: `
New Bot Activation Request:

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Experience: ${experience}
Account Size: ${accountSize}

Requirements:
${requirements}
      `,
    });

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

(async () => {
  const port = 5000;

  if (app.get("env") === "development") {
    await setupVite(app);
  } else {
    serveStatic(app);
  }

  app.listen(port, "0.0.0.0", () => {
    log(`✅ Server is running on http://localhost:${port}`);
  });
})();
