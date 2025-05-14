const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Submission = require('../models/Submission');
const nodemailer = require('nodemailer');
const {cloudinary,storage} = require('../config/cloudinaryConfig');

// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /doc|docx|pdf/;
// const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// const mimetype = filetypes.test(file.mimetype);
    
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb('Error: Only .doc, .docx, and .pdf files are allowed!');
//     }
//   }
// });


// cloudinary based storage
const upload = multer({ storage });

// Submit article
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { name, email, phone, contentType, title, summary, bio, comments } = req.body;
    const filePath = req.file ? req.file.path : null;

    

    if (!filePath || !filePath.path) {
      return res.status(400).json({ message: "File upload failed" });
    }
    
    const newSubmission = new Submission({
      name,
      email,
      phone,
      contentType,
      title,
      summary,
      fileUrl: filePath.path, // Cloudinary secure_url
      publicId: filePath.filename, // If needed for delete later
      bio,
      comments
    });
    
    await newSubmission.save();
    
    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'editor@udaybharatmag.in',
      subject: `New Article Submission: ${title}`,
      text: `Title: ${title}\nAuthor: ${name}\nEmail: ${email}\nType: ${contentType}\nSummary: ${summary}`
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(201).json({ message: 'Thank you for your submission! We will review it and get back to you soon.' });
  } catch (error) {
    console.error('Error submitting article:', error);
    res.status(500).json({ error: 'Failed to submit article' });
  }
});

module.exports = router;