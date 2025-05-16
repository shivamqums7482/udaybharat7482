// 1. Require dependencies FIRST
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


// 2. Create express app
const app = express();
<<<<<<< HEAD
=======

// To keep the server alive



>>>>>>> ff93fac8bdea36166ea0456beb959263ecb74b3b
// 3. Configure middleware (IN THIS ORDER)
const allowedOrigins = [
  "https://udaybharatmag.in",
  "http://localhost:5500",
  undefined // allow curl/postman or no-origin requests
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Database connection
mongoose.connect('mongodb+srv://shivamprakash:shivam%409955@udaybharat.dcf5n4y.mongodb.net/Uday', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// 5. Routes

app.use((req, res, next) => {
  console.log("🔍 Request Origin:", req.headers.origin);
  console.log("🔍 IP:", req.ip);
  next();
});


const contactRoutes = require('./routes/contact');
const submissionRoutes = require('./routes/submission');
const newsletterRoutes = require('./routes/newsletter');

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api/contact', contactRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

//Test
app.get("/hello",(req, res)=>{
<<<<<<< HEAD
  res.send("Hello from server");
=======
  res.status(200).send('Hello from server');
>>>>>>> ff93fac8bdea36166ea0456beb959263ecb74b3b
})

// 6. Static files (AFTER routes)
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Use correct relative path

// 7. Error handling middleware (LAST)
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ message: 'Something broke on the server!' });
});

// 8. Start server (LAST)
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
