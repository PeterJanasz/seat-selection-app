const express = require('express');
const router = express.Router();

// Define a route for the "/confirmation" path
router.get('/', (req, res) => {
 // Parse the selected seats data from query parameters
 const selectedSeats = JSON.parse(req.query.selectedSeats || '[]'); // Default to an empty array if no data is provided

 // Render the confirmation page with the selected seats data
 res.render('confirmation', { selectedSeats });
});

module.exports = router;
