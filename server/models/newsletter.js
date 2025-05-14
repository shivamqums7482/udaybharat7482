const mongoose = require('mongoose');

// Define the schema for contact form
const newsletterSchema = new mongoose.Schema({
   email: { type: String, required: true },
});

// Create a model from the schema
const newsletter = mongoose.model('newsletter', newsletterSchema);

module.exports = newsletter;
