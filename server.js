const express = require('express');
const exphbs = require('express-handlebars');
const seatSelectionRoutes = require('./routes/seats'); // Example routes file
const helpers = require('./utils/helpers');
const confirmationRoutes = require('./routes/confirmation'); // Import the confirmation route
const app = express();

// Configure Handlebars as the template engine
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define middleware
app.use(express.static('public'));
app.use(express.json());

// Mount the routes under a specific path
app.use('/api', seatSelectionRoutes);
app.use('/confirmation', confirmationRoutes);
// Define a route for seat selection
app.get('/seatSelection', (req, res) => {
  // Define 'rows' or import it from another module
  const rows = [
    { label: 'A', seats: [] },
    { label: 'B', seats: [] },
    { label: 'C', seats: [] },
    // Add more rows as needed
  ];

  // Populate the seats array for each row
  rows.forEach(row => {
    for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
      // You can set reserved to true for seats that are already reserved
      const reserved = true;
      
      row.seats.push({ number: seatNumber, reserved });
    }
  });

  res.render('seatSelection', { rows: rows });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
