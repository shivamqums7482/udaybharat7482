const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  contentType: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  filePath: { type: String },
  bio: { type: String, required: true },
  comments: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);