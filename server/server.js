// 1. Require dependencies FIRST
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// 2. Create express app
const app = express();

// 3. Configure middleware (IN THIS ORDER)
app.use(cors({
  origin: 'http://127.0.0.1:5500/',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Database connection
mongoose.connect(`mongodb+srv://shivamprakash:shivam%409955@udaybharat.dcf5n4y.mongodb.net/Uday`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// 5. Routes
const contactRoutes = require('./routes/contact');
const submissionRoutes = require('./routes/submission');

app.use('/api/contact', contactRoutes);
app.use('/api/submissions', submissionRoutes);

// 6. Static files (AFTER routes)
app.use(express.static(path.join(__dirname, '../public')));

// 7. Error handling middleware (LAST)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 8. Start server (LAST)
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});