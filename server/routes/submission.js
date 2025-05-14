const express = require('express');
const router = express.Router();
const multer = require('multer');
const Submission = require('../models/Submission');
const nodemailer = require('nodemailer');
const { cloudinary, storage } = require('../config/cloudinary');

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { name, email, phone, contentType, title, summary, bio, comments } = req.body;

    const fileUrl = req.file?.path;
    const publicId = req.file?.filename;

//   console.log('📦 Uploaded file:', req.file);
// console.log('📄 Form body:', req.body);


    if (!fileUrl) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const newSubmission = new Submission({
      name,
      email,
      phone,
      contentType,
      title,
      summary,
      fileUrl,
      publicId,
      bio,
      comments
    });

    await newSubmission.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `New Article Submission: ${title}`,
      text: `Title: ${title}\nAuthor: ${name}\nEmail: ${email}\nType: ${contentType}\nSummary: ${summary}`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Thank you for your submission! We will review it and get back to you soon.' });
  } catch (error) {
    console.error('❌ Error submitting article:', error);
    res.status(500).json({ error: 'Failed to submit article' });
  }
});

module.exports = router;
