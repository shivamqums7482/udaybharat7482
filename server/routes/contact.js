const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import the Contact model

// POST route to save contact form data
router.post('/', async (req, res) => {
    // const name = req.body.name;
    // res.send(name);
    try {
        // Destructure the incoming request body
        const { name, email, phone, subject, message } = req.body;

        // Create a new contact document
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message
        });

        // Save the document in the database
        await newContact.save();
        // res.send("data saved");

        // Send a success response
        res.status(201).json({ message: 'Message saved successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error, could not save message.' });
    }
});

module.exports = router;
