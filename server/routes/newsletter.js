const express = require('express');
const router = express.Router();
const newsletter = require('../models/newsletter'); // Import the Contact model

// POST route to save contact form data
router.post('/', async (req, res) => {
    try {
        // Destructure the incoming request body
        const { email } = req.body;

        // Create a new contact document
        const newnewsletter = new newsletter({
            email,
        });

        // Save the document in the database
        await newnewsletter.save();
        // res.send("data saved");

        // Send a success response
        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error, could not save message.' });
    }
});

module.exports = router;
