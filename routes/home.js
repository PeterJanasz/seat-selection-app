const router = require('express').Router();
// Define a GET route to render the seat selection page
app.get('/seatSelection', (req, res) => {
    // Here, you can pass any data needed for rendering the seat selection page
    // For example, you can fetch available seats from your database and pass them as an object
    const availableSeats = [
      // Your seat data here...
    ];
  
    // Render the seat selection page and pass the data
    res.render('seatSelection', { seats: availableSeats });
  });

  module.exports = router;