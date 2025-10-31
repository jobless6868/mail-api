import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Cho phép mọi domain gọi đến

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Liên hệ từ ${name}`,
      text: message,
    });

    res.status(200).json({ success: true, message: "✅ Gửi email thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "❌ Gửi email thất bại!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Mail API đang chạy tại cổng ${PORT}`));
